import { projectBg } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name || typeof body.name !== 'string' || !body.name.trim()) {
    throw createError({ statusCode: 400, message: 'name is required' })
  }

  const directions = Array.isArray(body.directions)
    ? body.directions.join(',')
    : (typeof body.directions === 'string' ? body.directions : null)

  const db = useDb()
  const [row] = await db.insert(projectBg).values({
    name: body.name.trim(),
    scale: body.scale ?? null,
    role: body.role ?? null,
    techStack: body.techStack ?? null,
    results: body.results ?? null,
    directions,
    description: body.description ?? null,
  }).returning()

  return { data: row }
})
