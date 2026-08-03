import { count, desc } from 'drizzle-orm'
import { question } from '../../database/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db
    .select({ year: question.year, count: count() })
    .from(question)
    .groupBy(question.year)
    .orderBy(desc(question.year))

  return { data: rows }
})
