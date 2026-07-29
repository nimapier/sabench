import { d as defineEventHandler, g as getRouterParam, c as createError, r as readBody, u as useDb, p as projectBg } from '../../../nitro/nitro.mjs';
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
  const id = Number(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "invalid id" });
  }
  const body = await readBody(event);
  const db = useDb();
  const [existing] = await db.select().from(projectBg).where(eq(projectBg.id, id));
  if (!existing) {
    throw createError({ statusCode: 404, message: "project not found" });
  }
  const updates = {};
  for (const key of ["name", "scale", "role", "techStack", "results", "description"]) {
    if ((body == null ? void 0 : body[key]) !== void 0) updates[key] = body[key];
  }
  if ((body == null ? void 0 : body.directions) !== void 0) {
    updates.directions = Array.isArray(body.directions) ? body.directions.join(",") : body.directions;
  }
  const [row] = await db.update(projectBg).set(updates).where(eq(projectBg.id, id)).returning();
  return { data: row };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
