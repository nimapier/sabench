import { eq } from 'drizzle-orm'
import { question, questionAttempt, reviewQueue } from '../../../database/schema'
import { isGraduated, scheduleOnCorrect, scheduleOnWrong } from '../../../utils/sm2'

export default defineEventHandler(async (event) => {
  const questionId = Number(getRouterParam(event, 'questionId'))
  if (!Number.isInteger(questionId)) {
    throw createError({ statusCode: 400, message: 'invalid questionId' })
  }

  const body = await readBody(event)
  if (typeof body?.correct !== 'boolean') {
    throw createError({ statusCode: 400, message: 'correct is required' })
  }
  const correct = body.correct as boolean
  const errorReason = !correct && typeof body.errorReason === 'string' && body.errorReason.trim()
    ? body.errorReason.trim()
    : null

  const db = useDb()
  const [entry] = await db.select().from(reviewQueue).where(eq(reviewQueue.questionId, questionId))
  if (!entry) {
    throw createError({ statusCode: 404, message: 'question not in review queue' })
  }
  const [q] = await db.select().from(question).where(eq(question.id, questionId))
  if (!q) {
    throw createError({ statusCode: 404, message: 'question not found' })
  }

  const next = correct
    ? scheduleOnCorrect({ level: entry.level ?? 0, streak: entry.streak ?? 0 })
    : scheduleOnWrong()

  // 毕业（streak>=3）也保留在表中，仅由 today 端点按 streak 过滤
  await db
    .update(reviewQueue)
    .set({ level: next.level, streak: next.streak, dueDate: next.dueDate })
    .where(eq(reviewQueue.id, entry.id))

  await db.insert(questionAttempt).values({ questionId, correct, errorReason })

  // 判分完成，此刻才下发答案与解析
  return {
    data: {
      correct,
      answer: q.answer,
      analysis: q.analysis,
      level: next.level,
      streak: next.streak,
      dueDate: next.dueDate,
      graduated: isGraduated(next.streak),
    },
  }
})
