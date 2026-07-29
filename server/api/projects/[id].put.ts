import { eq } from 'drizzle-orm'
import { projectBg } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'invalid id' })
  }

  const body = await readBody(event)
  const db = useDb()

  const [existing] = await db.select().from(projectBg).where(eq(projectBg.id, id))
  if (!existing) {
    throw createError({ statusCode: 404, message: 'project not found' })
  }

  const updates: Record<string, unknown> = {}
  for (const key of ['name', 'scale', 'role', 'techStack', 'results', 'description'] as const) {
    if (body?.[key] !== undefined) updates[key] = body[key]
  }
  if (body?.directions !== undefined) {
    updates.directions = Array.isArray(body.directions)
      ? body.directions.join(',')
      : body.directions
  }

  const [row] = await db.update(projectBg).set(updates).where(eq(projectBg.id, id)).returning()
  return { data: row }
})
