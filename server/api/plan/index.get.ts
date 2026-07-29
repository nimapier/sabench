import { asc, sql } from 'drizzle-orm'
import { weekTask } from '../../database/schema'
import { WEEK_PLAN } from '#shared/plan'

export default defineEventHandler(async () => {
  const db = useDb()

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(weekTask)
  if (count === 0) {
    await db.insert(weekTask).values(
      WEEK_PLAN.map(t => ({
        week: t.week,
        category: t.category,
        content: t.content,
        sortOrder: t.sortOrder,
      })),
    )
  }

  const rows = await db.select().from(weekTask).orderBy(asc(weekTask.week), asc(weekTask.sortOrder))

  const groups = new Map<number, typeof rows>()
  for (const row of rows) {
    const list = groups.get(row.week!) ?? []
    list.push(row)
    groups.set(row.week!, list)
  }

  return { data: [...groups.entries()].map(([week, tasks]) => ({ week, tasks })) }
})
