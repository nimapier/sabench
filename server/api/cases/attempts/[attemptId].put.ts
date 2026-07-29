import { and, eq } from 'drizzle-orm'
import { caseAttempt, caseQuestion, studyLog } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const attemptId = Number(getRouterParam(event, 'attemptId'))
  if (!Number.isInteger(attemptId)) {
    throw createError({ statusCode: 400, message: 'invalid attemptId' })
  }

  const body = await readBody(event)
  if (!Array.isArray(body?.hitPoints) || !body.hitPoints.every((n: unknown) => Number.isInteger(n))) {
    throw createError({ statusCode: 400, message: 'hitPoints must be an integer array' })
  }
  const hitPoints: number[] = body.hitPoints

  const db = useDb()
  const [attempt] = await db.select().from(caseAttempt).where(eq(caseAttempt.id, attemptId))
  if (!attempt) {
    throw createError({ statusCode: 404, message: 'attempt not found' })
  }

  const [question] = await db
    .select({ points: caseQuestion.points })
    .from(caseQuestion)
    .where(eq(caseQuestion.id, attempt.caseQuestionId!))

  let total = 0
  try {
    const parsed = JSON.parse(question?.points ?? '[]')
    if (Array.isArray(parsed)) total = parsed.length
  }
  catch {
    total = 0
  }

  const score = total > 0 ? Math.round((hitPoints.length / total) * 100) / 100 : 0

  const [updated] = await db
    .update(caseAttempt)
    .set({ score, hitPoints: JSON.stringify(hitPoints) })
    .where(eq(caseAttempt.id, attemptId))
    .returning()

  // 重复自评只更新 score，study_log 按 attemptId 幂等（有则更新，无则新增）
  const minutes = Math.round((attempt.durationSec ?? 0) / 60)
  const date = new Date().toISOString().slice(0, 10)
  const [existingLog] = await db
    .select()
    .from(studyLog)
    .where(and(eq(studyLog.module, 'case'), eq(studyLog.refId, attemptId)))

  if (existingLog) {
    await db.update(studyLog).set({ minutes, date }).where(eq(studyLog.id, existingLog.id))
  }
  else {
    await db.insert(studyLog).values({ module: 'case', refId: attemptId, minutes, date })
  }

  return { data: updated }
})
