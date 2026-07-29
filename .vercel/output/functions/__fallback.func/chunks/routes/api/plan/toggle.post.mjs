import { d as defineEventHandler, r as readBody, c as createError, u as useDb, w as weekTask } from '../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const toggle_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = Number(body == null ? void 0 : body.id);
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "id is required" });
  }
  if (typeof (body == null ? void 0 : body.done) !== "boolean") {
    throw createError({ statusCode: 400, message: "done is required" });
  }
  const db = useDb();
  const [row] = await db.update(weekTask).set({ done: body.done }).where(eq(weekTask.id, id)).returning();
  if (!row) {
    throw createError({ statusCode: 404, message: "task not found" });
  }
  return { data: row };
});

export { toggle_post as default };
//# sourceMappingURL=toggle.post.mjs.map
