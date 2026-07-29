import { desc, eq } from 'drizzle-orm'
import { essay, essayVersion, projectBg } from '../../database/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db
    .select({
      id: essay.id,
      title: essay.title,
      direction: essay.direction,
      projectBgId: essay.projectBgId,
      status: essay.status,
      createdAt: essay.createdAt,
      projectBgName: projectBg.name,
    })
    .from(essay)
    .leftJoin(projectBg, eq(essay.projectBgId, projectBg.id))
    .orderBy(desc(essay.createdAt))

  const versions = await db
    .select({
      essayId: essayVersion.essayId,
      wordCount: essayVersion.wordCount,
      createdAt: essayVersion.createdAt,
    })
    .from(essayVersion)
    .orderBy(desc(essayVersion.createdAt))

  const latest = new Map<number, { wordCount: number | null, createdAt: Date | null }>()
  for (const v of versions) {
    if (!latest.has(v.essayId)) {
      latest.set(v.essayId, { wordCount: v.wordCount, createdAt: v.createdAt })
    }
  }

  return {
    data: rows.map((r) => {
      const l = latest.get(r.id)
      return {
        ...r,
        latestWordCount: l?.wordCount ?? null,
        latestAt: l?.createdAt ?? null,
      }
    }),
  }
})
