import { d as defineEventHandler, u as useDb, p as projectBg } from '../../nitro/nitro.mjs';
import { desc } from 'drizzle-orm';
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
  const db = useDb();
  const rows = await db.select().from(projectBg).orderBy(desc(projectBg.createdAt));
  return { data: rows };
});

export { index_get as default };
//# sourceMappingURL=index3.get.mjs.map
