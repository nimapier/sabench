import { d as defineEventHandler, g as getRouterParam, c as createError, u as useDb, e as essay, a as essayVersion } from '../../../../nitro/nitro.mjs';
import { eq, desc } from 'drizzle-orm';
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

const versions_get = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "invalid id" });
  }
  const db = useDb();
  const [existing] = await db.select().from(essay).where(eq(essay.id, id));
  if (!existing) {
    throw createError({ statusCode: 404, message: "essay not found" });
  }
  const versions = await db.select().from(essayVersion).where(eq(essayVersion.essayId, id)).orderBy(desc(essayVersion.createdAt));
  return { data: versions };
});

export { versions_get as default };
//# sourceMappingURL=versions.get.mjs.map
