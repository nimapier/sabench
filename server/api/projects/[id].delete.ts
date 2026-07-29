import { eq } from 'drizzle-orm'
import { essay, projectBg } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'invalid id' })
  }

  const db = useDb()
  const [existing] = await db.select().from(projectBg).where(eq(projectBg.id, id))
  if (!existing) {
    throw createError({ statusCode: 404, message: 'project not found' })
  }

  await db.update(essay).set({ projectBgId: null }).where(eq(essay.projectBgId, id))

  await db.delete(projectBg).where(eq(projectBg.id, id))
  return { data: { id } }
})
