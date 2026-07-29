import { studyLog } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.module || typeof body.module !== 'string' || !body.module.trim()) {
    throw createError({ statusCode: 400, message: 'module is required' })
  }
  const minutes = Number(body?.minutes)
  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw createError({ statusCode: 400, message: 'minutes is required' })
  }

  const date = new Date().toISOString().slice(0, 10)

  const db = useDb()
  const [row] = await db.insert(studyLog).values({
    module: body.module.trim(),
    minutes,
    refId: body.refId ?? null,
    date,
  }).returning()

  return { data: row }
})
