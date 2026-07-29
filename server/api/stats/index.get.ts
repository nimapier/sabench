import { and, eq, gte, lte, sql } from 'drizzle-orm'
import { essay, essayVersion, projectBg, studyLog, weekTask } from '../../database/schema'

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function mondayStr(today: string): string {
  const d = new Date(`${today}T00:00:00Z`)
  const dow = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - dow)
  return d.toISOString().slice(0, 10)
}

export default defineEventHandler(async () => {
  const db = useDb()
  const today = todayStr()
  const monday = mondayStr(today)

  const [projects] = await db.select({ count: sql<number>`count(*)` }).from(projectBg)
  const [essaysTotal] = await db.select({ count: sql<number>`count(*)` }).from(essay)
  const [essaysDone] = await db.select({ count: sql<number>`count(*)` }).from(essay).where(eq(essay.status, 'done'))
  const [versions] = await db.select({ count: sql<number>`count(*)` }).from(essayVersion)
  const [minutesRow] = await db.select({ sum: sql<number>`coalesce(sum(${studyLog.minutes}), 0)` })
    .from(studyLog)
    .where(and(gte(studyLog.date, monday), lte(studyLog.date, today)))
  const [tasksTotal] = await db.select({ count: sql<number>`count(*)` }).from(weekTask)
  const [tasksDone] = await db.select({ count: sql<number>`count(*)` }).from(weekTask).where(eq(weekTask.done, true))

  return {
    data: {
      projects: projects.count,
      essaysTotal: essaysTotal.count,
      essaysDone: essaysDone.count,
      versions: versions.count,
      minutesWeek: minutesRow.sum,
      tasksDone: tasksDone.count,
      tasksTotal: tasksTotal.count,
      currentWeek: calcCurrentWeek(today),
    },
  }
})
