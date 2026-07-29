import { d as defineEventHandler, r as readBody, c as createError, u as useDb, e as essay } from '../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.title) || typeof body.title !== "string" || !body.title.trim()) {
    throw createError({ statusCode: 400, message: "title is required" });
  }
  const db = useDb();
  const [row] = await db.insert(essay).values({
    title: body.title.trim(),
    direction: (_a = body.direction) != null ? _a : null,
    projectBgId: (_b = body.projectBgId) != null ? _b : null
  }).returning();
  return { data: row };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
