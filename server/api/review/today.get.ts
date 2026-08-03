import { and, asc, eq, lt, lte } from 'drizzle-orm'
import { question, reviewQueue } from '../../database/schema'

// 安全红线：复习队列绝不 select answer/analysis（判分后才下发）
export default defineEventHandler(async () => {
  const db = useDb()
  const today = todayString()

  const rows = await db
    .select({
      questionId: reviewQueue.questionId,
      stem: question.stem,
      options: question.options,
      chapter: question.chapter,
      level: reviewQueue.level,
      streak: reviewQueue.streak,
      dueDate: reviewQueue.dueDate,
    })
    .from(reviewQueue)
    .innerJoin(question, eq(reviewQueue.questionId, question.id))
    .where(and(lte(reviewQueue.dueDate, today), lt(reviewQueue.streak, 3)))
    .orderBy(asc(reviewQueue.dueDate), asc(reviewQueue.id))

  return {
    data: rows.map(r => ({ ...r, options: JSON.parse(r.options ?? '{}') })),
  }
})
