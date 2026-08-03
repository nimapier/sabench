import { sql } from 'drizzle-orm'
import { question } from '../../database/schema'

// 安全红线：本端点绝不 select answer/analysis
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const countParam = Math.min(200, Math.max(1, Number(query.count) || 50))

  const db = useDb()
  const rows = await db
    .select({
      id: question.id,
      year: question.year,
      chapter: question.chapter,
      stem: question.stem,
      options: question.options,
    })
    .from(question)
    .orderBy(sql`RANDOM()`)
    .limit(countParam)

  return { data: rows.map(r => ({ ...r, options: JSON.parse(r.options ?? '{}') })) }
})
