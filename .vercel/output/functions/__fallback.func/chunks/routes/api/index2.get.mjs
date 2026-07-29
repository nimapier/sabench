import { d as defineEventHandler, u as useDb, w as weekTask, W as WEEK_PLAN } from '../../nitro/nitro.mjs';
import { sql, asc } from 'drizzle-orm';
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

const index_get = defineEventHandler(async () => {
  var _a;
  const db = useDb();
  const [{ count }] = await db.select({ count: sql`count(*)` }).from(weekTask);
  if (count === 0) {
    await db.insert(weekTask).values(
      WEEK_PLAN.map((t) => ({
        week: t.week,
        category: t.category,
        content: t.content,
        sortOrder: t.sortOrder
      }))
    );
  }
  const rows = await db.select().from(weekTask).orderBy(asc(weekTask.week), asc(weekTask.sortOrder));
  const groups = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const list = (_a = groups.get(row.week)) != null ? _a : [];
    list.push(row);
    groups.set(row.week, list);
  }
  return { data: [...groups.entries()].map(([week, tasks]) => ({ week, tasks })) };
});

export { index_get as default };
//# sourceMappingURL=index2.get.mjs.map
