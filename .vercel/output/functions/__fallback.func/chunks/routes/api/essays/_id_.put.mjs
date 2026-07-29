import { d as defineEventHandler, g as getRouterParam, c as createError, r as readBody, u as useDb, e as essay } from '../../../nitro/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  var _a, _b;
  const id = Number(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "invalid id" });
  }
  const body = await readBody(event);
  const db = useDb();
  const [existing] = await db.select().from(essay).where(eq(essay.id, id));
  if (!existing) {
    throw createError({ statusCode: 404, message: "essay not found" });
  }
  const patch = {};
  if ((body == null ? void 0 : body.title) !== void 0) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      throw createError({ statusCode: 400, message: "title must be a non-empty string" });
    }
    patch.title = body.title.trim();
  }
  if ((body == null ? void 0 : body.direction) !== void 0) patch.direction = (_a = body.direction) != null ? _a : null;
  if ((body == null ? void 0 : body.projectBgId) !== void 0) patch.projectBgId = (_b = body.projectBgId) != null ? _b : null;
  const [row] = await db.update(essay).set(patch).where(eq(essay.id, id)).returning();
  return { data: row };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
