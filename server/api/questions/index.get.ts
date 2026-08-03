import { and, count, eq } from 'drizzle-orm'
import { question } from '../../database/schema'

// 安全红线：本端点绝不 select answer/analysis
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const chapter = typeof query.module === 'string' && query.module.trim()
    ? query.module.trim()
    : null
  const year = typeof query.year === 'string' && query.year.trim()
    ? query.year.trim()
    : null
  const page = Math.max(1, Number(query.page) || 1)
  const size = Math.min(100, Math.max(1, Number(query.size) || 20))

  const db = useDb()
  const conds = []
  if (chapter) conds.push(eq(question.chapter, chapter))
  if (year) conds.push(eq(question.year, year))
  const where = conds.length ? and(...conds) : undefined

  const rows = await db
    .select({
      id: question.id,
      year: question.year,
      chapter: question.chapter,
      stem: question.stem,
      options: question.options,
    })
    .from(question)
    .where(where)
    .orderBy(question.id)
    .limit(size)
    .offset((page - 1) * size)

  const [totalRow] = await db.select({ total: count() }).from(question).where(where)

  return {
    data: {
      list: rows.map(r => ({ ...r, options: JSON.parse(r.options ?? '{}') })),
      total: totalRow?.total ?? 0,
    },
  }
})
