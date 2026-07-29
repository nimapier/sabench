import { desc, eq } from 'drizzle-orm'
import { caseAttempt, caseQuestion } from '../../database/schema'

// 安全红线：采分点 points 只能在提交作答后（attempts.post）下发，此处不 select
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'invalid id' })
  }

  const db = useDb()
  const [row] = await db
    .select({
      id: caseQuestion.id,
      year: caseQuestion.year,
      caseType: caseQuestion.caseType,
      title: caseQuestion.title,
      material: caseQuestion.material,
      question: caseQuestion.question,
    })
    .from(caseQuestion)
    .where(eq(caseQuestion.id, id))

  if (!row) {
    throw createError({ statusCode: 404, message: 'case not found' })
  }

  const recentAttempts = await db
    .select({
      id: caseAttempt.id,
      score: caseAttempt.score,
      durationSec: caseAttempt.durationSec,
      createdAt: caseAttempt.createdAt,
    })
    .from(caseAttempt)
    .where(eq(caseAttempt.caseQuestionId, id))
    .orderBy(desc(caseAttempt.id))
    .limit(3)

  return { data: { ...row, recentAttempts } }
})
