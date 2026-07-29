import { asc } from 'drizzle-orm'
import { frameworkCard } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const caseType = typeof query.caseType === 'string' && query.caseType.trim()
    ? query.caseType.trim()
    : null

  const db = useDb()
  const rows = await db
    .select()
    .from(frameworkCard)
    .orderBy(asc(frameworkCard.caseType), asc(frameworkCard.sortOrder))

  return {
    data: caseType == null ? rows : rows.filter((r) => r.caseType === caseType),
  }
})
