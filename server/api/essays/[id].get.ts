import { desc, eq } from 'drizzle-orm'
import { essay, essayVersion } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'invalid id' })
  }

  const db = useDb()
  const [row] = await db.select().from(essay).where(eq(essay.id, id))
  if (!row) {
    throw createError({ statusCode: 404, message: 'essay not found' })
  }

  const versions = await db
    .select()
    .from(essayVersion)
    .where(eq(essayVersion.essayId, id))
    .orderBy(desc(essayVersion.createdAt))

  const latestDraft = versions.find((v) => v.isDraft) ?? null

  return { data: { ...row, versions, latestDraft } }
})
