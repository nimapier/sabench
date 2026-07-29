import { eq } from 'drizzle-orm'
import { essay } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'invalid id' })
  }

  const body = await readBody(event)

  const db = useDb()
  const [existing] = await db.select().from(essay).where(eq(essay.id, id))
  if (!existing) {
    throw createError({ statusCode: 404, message: 'essay not found' })
  }

  const patch: Partial<{ title: string, direction: string | null, projectBgId: number | null }> = {}
  if (body?.title !== undefined) {
    if (typeof body.title !== 'string' || !body.title.trim()) {
      throw createError({ statusCode: 400, message: 'title must be a non-empty string' })
    }
    patch.title = body.title.trim()
  }
  if (body?.direction !== undefined) patch.direction = body.direction ?? null
  if (body?.projectBgId !== undefined) patch.projectBgId = body.projectBgId ?? null

  const [row] = await db.update(essay).set(patch).where(eq(essay.id, id)).returning()
  return { data: row }
})
