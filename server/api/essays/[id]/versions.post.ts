import { and, desc, eq } from 'drizzle-orm'
import { essay, essayVersion, studyLog } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'invalid id' })
  }

  const body = await readBody(event)
  if (!body?.content || typeof body.content !== 'string') {
    throw createError({ statusCode: 400, message: 'content is required' })
  }

  const db = useDb()
  const [existing] = await db.select().from(essay).where(eq(essay.id, id))
  if (!existing) {
    throw createError({ statusCode: 404, message: 'essay not found' })
  }

  const isDraft = body.isDraft === true
  const selfReview = body.selfReview !== undefined ? JSON.stringify(body.selfReview) : null

  if (isDraft) {
    const [draft] = await db
      .select()
      .from(essayVersion)
      .where(and(eq(essayVersion.essayId, id), eq(essayVersion.isDraft, true)))
      .orderBy(desc(essayVersion.createdAt))
      .limit(1)

    if (draft) {
      const [row] = await db
        .update(essayVersion)
        .set({
          content: body.content,
          wordCount: body.wordCount ?? null,
          durationSec: body.durationSec ?? null,
          selfReview,
          createdAt: new Date(),
        })
        .where(eq(essayVersion.id, draft.id))
        .returning()
      return { data: row }
    }

    const [row] = await db.insert(essayVersion).values({
      essayId: id,
      content: body.content,
      wordCount: body.wordCount ?? null,
      durationSec: body.durationSec ?? null,
      selfReview,
      isDraft: true,
    }).returning()
    return { data: row }
  }

  const durationSec = typeof body.durationSec === 'number' ? body.durationSec : 0
  const minutes = Math.round(durationSec / 60)
  const today = new Date().toISOString().slice(0, 10)

  const [row] = await db.insert(essayVersion).values({
    essayId: id,
    content: body.content,
    wordCount: body.wordCount ?? null,
    durationSec: body.durationSec ?? null,
    selfReview,
    isDraft: false,
  }).returning()

  await db.update(essay).set({ status: 'done' }).where(eq(essay.id, id))

  await db.insert(studyLog).values({
    module: 'essay',
    refId: id,
    minutes,
    date: today,
  })

  return { data: row }
})
