import { eq, inArray } from 'drizzle-orm'
import { question, questionAttempt, reviewQueue, studyLog } from '../../../database/schema'

function localDate(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ year?: unknown, answers?: unknown, durationSec?: unknown }>(event)
  const year = typeof body?.year === 'string' ? body.year.trim() : String(body?.year ?? '')
  const answers = (body?.answers && typeof body.answers === 'object' ? body.answers : {}) as Record<string, unknown>
  const durationSec = Number(body?.durationSec)
  if (!year || !Number.isFinite(durationSec) || durationSec < 0) {
    throw createError({ statusCode: 400, message: 'year, answers and durationSec are required' })
  }

  const db = useDb()
  const paper = await db
    .select()
    .from(question)
    .where(eq(question.year, year))
    .orderBy(question.id)

  if (!paper.length) {
    throw createError({ statusCode: 404, message: 'no questions for this year' })
  }

  const detail = paper.map((q) => {
    const raw = answers[String(q.id)]
    const choice = typeof raw === 'string' ? raw.trim().toUpperCase() : ''
    return {
      questionId: q.id,
      correct: choice !== '' && q.answer?.trim().toUpperCase() === choice,
      answer: q.answer,
      analysis: q.analysis,
    }
  })
  const score = detail.filter(d => d.correct).length

  await db.insert(questionAttempt).values(
    detail.map(d => ({ questionId: d.questionId, correct: d.correct })),
  )

  const wrongIds = detail.filter(d => !d.correct).map(d => d.questionId)
  if (wrongIds.length) {
    const dueDate = localDate(1)
    const existing = await db
      .select({ id: reviewQueue.id, questionId: reviewQueue.questionId })
      .from(reviewQueue)
      .where(inArray(reviewQueue.questionId, wrongIds))
    const existingMap = new Map(existing.map(e => [e.questionId, e.id]))
    for (const qid of wrongIds) {
      const rid = existingMap.get(qid)
      if (rid) {
        await db.update(reviewQueue).set({ level: 0, streak: 0, dueDate }).where(eq(reviewQueue.id, rid))
      }
      else {
        await db.insert(reviewQueue).values({ questionId: qid, level: 0, streak: 0, dueDate })
      }
    }
  }

  await db.insert(studyLog).values({
    module: 'quiz',
    minutes: Math.round(durationSec / 60),
    date: localDate(),
  })

  return { data: { score, total: paper.length, detail } }
})
