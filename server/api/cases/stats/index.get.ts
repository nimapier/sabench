import { eq } from 'drizzle-orm'
import { CASE_TYPES } from '#shared/constants'
import { caseAttempt, caseQuestion } from '../../../database/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db
    .select({
      caseType: caseQuestion.caseType,
      score: caseAttempt.score,
    })
    .from(caseAttempt)
    .innerJoin(caseQuestion, eq(caseAttempt.caseQuestionId, caseQuestion.id))

  return {
    data: CASE_TYPES.map((caseType) => {
      const scores = rows
        .filter((r) => r.caseType === caseType && r.score != null)
        .map((r) => r.score as number)
      const sum = scores.reduce((s, v) => s + v, 0)
      return {
        caseType,
        attempts: scores.length,
        avgScore: scores.length > 0 ? Math.round((sum / scores.length) * 100) / 100 : null,
        bestScore: scores.length > 0 ? Math.max(...scores) : null,
      }
    }),
  }
})
