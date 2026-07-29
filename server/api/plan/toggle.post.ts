import { eq } from 'drizzle-orm'
import { weekTask } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = Number(body?.id)
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'id is required' })
  }
  if (typeof body?.done !== 'boolean') {
    throw createError({ statusCode: 400, message: 'done is required' })
  }

  const db = useDb()
  const [row] = await db.update(weekTask)
    .set({ done: body.done })
    .where(eq(weekTask.id, id))
    .returning()

  if (!row) {
    throw createError({ statusCode: 404, message: 'task not found' })
  }

  return { data: row }
})
