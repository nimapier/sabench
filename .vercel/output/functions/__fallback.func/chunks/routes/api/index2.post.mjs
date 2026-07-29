import { d as defineEventHandler, r as readBody, c as createError, u as useDb, p as projectBg } from '../../nitro/nitro.mjs';
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
  var _a, _b, _c, _d, _e;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.name) || typeof body.name !== "string" || !body.name.trim()) {
    throw createError({ statusCode: 400, message: "name is required" });
  }
  const directions = Array.isArray(body.directions) ? body.directions.join(",") : typeof body.directions === "string" ? body.directions : null;
  const db = useDb();
  const [row] = await db.insert(projectBg).values({
    name: body.name.trim(),
    scale: (_a = body.scale) != null ? _a : null,
    role: (_b = body.role) != null ? _b : null,
    techStack: (_c = body.techStack) != null ? _c : null,
    results: (_d = body.results) != null ? _d : null,
    directions,
    description: (_e = body.description) != null ? _e : null
  }).returning();
  return { data: row };
});

export { index_post as default };
//# sourceMappingURL=index2.post.mjs.map
