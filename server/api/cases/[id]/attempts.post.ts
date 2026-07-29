import { eq } from 'drizzle-orm'
import { caseAttempt, caseQuestion } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'invalid id' })
  }

  const body = await readBody(event)
  if (!body?.answer || typeof body.answer !== 'string' || !body.answer.trim()) {
    throw createError({ statusCode: 400, message: 'answer is required' })
  }
  let durationSec: number | null = null
  if (body.durationSec != null) {
    durationSec = Number(body.durationSec)
    if (!Number.isFinite(durationSec) || durationSec < 0) {
      throw createError({ statusCode: 400, message: 'invalid durationSec' })
    }
  }

  const db = useDb()
  const [question] = await db.select().from(caseQuestion).where(eq(caseQuestion.id, id))
  if (!question) {
    throw createError({ statusCode: 404, message: 'case not found' })
  }

  const [attempt] = await db
    .insert(caseAttempt)
    .values({ caseQuestionId: id, answer: body.answer, durationSec })
    .returning()

  let points: string[] = []
  try {
    const parsed = JSON.parse(question.points ?? '[]')
    if (Array.isArray(parsed)) points = parsed
  }
  catch {
    points = []
  }

  // 用户已提交作答，此刻才下发采分点
  return { data: { attemptId: attempt.id, points } }
})
