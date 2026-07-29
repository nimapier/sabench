import { d as defineEventHandler, g as getRouterParam, c as createError, u as useDb, p as projectBg, e as essay } from '../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "invalid id" });
  }
  const db = useDb();
  const [existing] = await db.select().from(projectBg).where(eq(projectBg.id, id));
  if (!existing) {
    throw createError({ statusCode: 404, message: "project not found" });
  }
  await db.update(essay).set({ projectBgId: null }).where(eq(essay.projectBgId, id));
  await db.delete(projectBg).where(eq(projectBg.id, id));
  return { data: { id } };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
