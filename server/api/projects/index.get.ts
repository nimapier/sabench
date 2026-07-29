import { desc } from 'drizzle-orm'
import { projectBg } from '../../database/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db.select().from(projectBg).orderBy(desc(projectBg.createdAt))
  return { data: rows }
})
