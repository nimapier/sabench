import { eq } from 'drizzle-orm'
import { question, questionAttempt, reviewQueue } from '../../database/schema'

function nextDay(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ questionId?: unknown, choice?: unknown, record?: unknown }>(event)
  const questionId = Number(body?.questionId)
  const choice = typeof body?.choice === 'string' ? body.choice.trim().toUpperCase() : ''
  // record 缺省 true 保持原行为；复习流程传 false 跳过此处 insert，避免与 /result 双写
  const record = body?.record !== false
  if (!Number.isInteger(questionId) || !choice) {
    throw createError({ statusCode: 400, message: 'questionId and choice are required' })
  }

  const db = useDb()
  const [row] = await db.select().from(question).where(eq(question.id, questionId))
  if (!row) {
    throw createError({ statusCode: 404, message: 'question not found' })
  }

  const correct = row.answer?.trim().toUpperCase() === choice

  if (record) {
    await db.insert(questionAttempt).values({ questionId, correct })
  }

  if (!correct) {
    const dueDate = nextDay()
    const [existing] = await db.select({ id: reviewQueue.id }).from(reviewQueue).where(eq(reviewQueue.questionId, questionId))
    if (existing) {
      await db.update(reviewQueue).set({ level: 0, streak: 0, dueDate }).where(eq(reviewQueue.id, existing.id))
    }
    else {
      await db.insert(reviewQueue).values({ questionId, level: 0, streak: 0, dueDate })
    }
  }

  return { data: { correct, answer: row.answer, analysis: row.analysis } }
})
