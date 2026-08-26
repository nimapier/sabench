import { count, countDistinct, sql } from 'drizzle-orm'
import { question, questionAttempt } from '../../database/schema'
import { textbookChapterOrder } from '#shared/textbook-chapter'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const byTextbook = query.by === 'textbook'
  const groupCol = byTextbook ? question.textbookChapter : question.chapter

  const db = useDb()
  const rows = await db
    .select({ chapter: groupCol, count: count() })
    .from(question)
    .groupBy(groupCol)

  const attemptRows = await db
    .select({
      chapter: groupCol,
      attempted: countDistinct(questionAttempt.questionId),
      correct: countDistinct(sql`CASE WHEN ${questionAttempt.correct} = 1 THEN ${questionAttempt.questionId} END`),
    })
    .from(questionAttempt)
    .innerJoin(question, sql`${questionAttempt.questionId} = ${question.id}`)
    .groupBy(groupCol)

  const attemptMap = new Map(attemptRows.map(r => [r.chapter, r]))

  const data = rows
    .filter(r => r.chapter)
    .map((r) => {
      const a = attemptMap.get(r.chapter)
      return {
        chapter: r.chapter!,
        count: r.count,
        attempted: a?.attempted ?? 0,
        correct: a?.correct ?? 0,
      }
    })

  if (byTextbook) {
    data.sort((a, b) => textbookChapterOrder(a.chapter) - textbookChapterOrder(b.chapter))
  }
  else {
    data.sort((a, b) => a.chapter.localeCompare(b.chapter))
  }

  return { data }
})
