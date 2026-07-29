import { d as defineEventHandler, r as readBody, c as createError, u as useDb, s as studyLog } from '../../nitro/nitro.mjs';
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
  var _a;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.module) || typeof body.module !== "string" || !body.module.trim()) {
    throw createError({ statusCode: 400, message: "module is required" });
  }
  const minutes = Number(body == null ? void 0 : body.minutes);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw createError({ statusCode: 400, message: "minutes is required" });
  }
  const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const db = useDb();
  const [row] = await db.insert(studyLog).values({
    module: body.module.trim(),
    minutes,
    refId: (_a = body.refId) != null ? _a : null,
    date
  }).returning();
  return { data: row };
});

export { index_post as default };
//# sourceMappingURL=index3.post.mjs.map
