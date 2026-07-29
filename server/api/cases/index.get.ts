import { desc } from 'drizzle-orm'
import { caseAttempt, caseQuestion } from '../../database/schema'

// 安全红线：本端点绝不 select material/question/points
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const caseType = typeof query.caseType === 'string' && query.caseType.trim()
    ? query.caseType.trim()
    : null

  const db = useDb()
  const rows = await db
    .select({
      id: caseQuestion.id,
      year: caseQuestion.year,
      caseType: caseQuestion.caseType,
      title: caseQuestion.title,
    })
    .from(caseQuestion)
    .orderBy(desc(caseQuestion.id))

  const attempts = await db
    .select({
      caseQuestionId: caseAttempt.caseQuestionId,
      score: caseAttempt.score,
    })
    .from(caseAttempt)

  const agg = new Map<number, { count: number, best: number | null }>()
  for (const a of attempts) {
    if (a.caseQuestionId == null) continue
    const cur = agg.get(a.caseQuestionId) ?? { count: 0, best: null }
    cur.count += 1
    if (a.score != null && (cur.best == null || a.score > cur.best)) {
      cur.best = a.score
    }
    agg.set(a.caseQuestionId, cur)
  }

  return {
    data: rows
      .filter((r) => caseType == null || r.caseType === caseType)
      .map((r) => {
        const a = agg.get(r.id)
        return {
          ...r,
          attemptCount: a?.count ?? 0,
          bestScore: a?.best ?? null,
        }
      }),
  }
})
