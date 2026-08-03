import { count } from 'drizzle-orm'
import { question } from '../../database/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db
    .select({ chapter: question.chapter, count: count() })
    .from(question)
    .groupBy(question.chapter)
    .orderBy(question.chapter)

  return { data: rows }
})
