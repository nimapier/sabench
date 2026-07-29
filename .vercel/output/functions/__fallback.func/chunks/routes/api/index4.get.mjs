import { d as defineEventHandler, u as useDb, p as projectBg, e as essay, a as essayVersion, s as studyLog, w as weekTask, b as calcCurrentWeek } from '../../nitro/nitro.mjs';
import { sql, eq, and, gte, lte } from 'drizzle-orm';
import 'node:fs';
import '@libsql/client';
import 'drizzle-orm/libsql';
import 'drizzle-orm/sqlite-core';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import '@iconify/utils';
import 'consola';

function todayStr() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function mondayStr(today) {
  const d = /* @__PURE__ */ new Date(`${today}T00:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}
const index_get = defineEventHandler(async () => {
  const db = useDb();
  const today = todayStr();
  const monday = mondayStr(today);
  const [projects] = await db.select({ count: sql`count(*)` }).from(projectBg);
  const [essaysTotal] = await db.select({ count: sql`count(*)` }).from(essay);
  const [essaysDone] = await db.select({ count: sql`count(*)` }).from(essay).where(eq(essay.status, "done"));
  const [versions] = await db.select({ count: sql`count(*)` }).from(essayVersion);
  const [minutesRow] = await db.select({ sum: sql`coalesce(sum(${studyLog.minutes}), 0)` }).from(studyLog).where(and(gte(studyLog.date, monday), lte(studyLog.date, today)));
  const [tasksTotal] = await db.select({ count: sql`count(*)` }).from(weekTask);
  const [tasksDone] = await db.select({ count: sql`count(*)` }).from(weekTask).where(eq(weekTask.done, true));
  return {
    data: {
      projects: projects.count,
      essaysTotal: essaysTotal.count,
      essaysDone: essaysDone.count,
      versions: versions.count,
      minutesWeek: minutesRow.sum,
      tasksDone: tasksDone.count,
      tasksTotal: tasksTotal.count,
      currentWeek: calcCurrentWeek(today)
    }
  };
});

export { index_get as default };
//# sourceMappingURL=index4.get.mjs.map
