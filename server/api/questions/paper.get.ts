import { eq } from 'drizzle-orm'
import { question } from '../../database/schema'

// 安全红线：本端点绝不 select answer/analysis
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const year = typeof query.year === 'string' && query.year.trim()
    ? query.year.trim()
    : null
  if (!year) {
    throw createError({ statusCode: 400, message: 'year is required' })
  }

  const db = useDb()
  const rows = await db
    .select({
      id: question.id,
      year: question.year,
      chapter: question.chapter,
      stem: question.stem,
      images: question.images,
      options: question.options,
    })
    .from(question)
    .where(eq(question.year, year))
    .orderBy(question.id)

  return { data: rows.map(r => ({ ...r, images: r.images ? JSON.parse(r.images) : [], options: JSON.parse(r.options ?? '{}') })) }
})
