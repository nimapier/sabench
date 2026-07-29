import { essay } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.title || typeof body.title !== 'string' || !body.title.trim()) {
    throw createError({ statusCode: 400, message: 'title is required' })
  }

  const db = useDb()
  const [row] = await db.insert(essay).values({
    title: body.title.trim(),
    direction: body.direction ?? null,
    projectBgId: body.projectBgId ?? null,
  }).returning()

  return { data: row }
})
