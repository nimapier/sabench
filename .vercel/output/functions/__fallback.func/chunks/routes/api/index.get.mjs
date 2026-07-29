import { d as defineEventHandler, u as useDb, p as projectBg, e as essay, a as essayVersion } from '../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async () => {
  const db = useDb();
  const rows = await db.select({
    id: essay.id,
    title: essay.title,
    direction: essay.direction,
    projectBgId: essay.projectBgId,
    status: essay.status,
    createdAt: essay.createdAt,
    projectBgName: projectBg.name
  }).from(essay).leftJoin(projectBg, eq(essay.projectBgId, projectBg.id)).orderBy(desc(essay.createdAt));
  const versions = await db.select({
    essayId: essayVersion.essayId,
    wordCount: essayVersion.wordCount,
    createdAt: essayVersion.createdAt
  }).from(essayVersion).orderBy(desc(essayVersion.createdAt));
  const latest = /* @__PURE__ */ new Map();
  for (const v of versions) {
    if (!latest.has(v.essayId)) {
      latest.set(v.essayId, { wordCount: v.wordCount, createdAt: v.createdAt });
    }
  }
  return {
    data: rows.map((r) => {
      var _a, _b;
      const l = latest.get(r.id);
      return {
        ...r,
        latestWordCount: (_a = l == null ? void 0 : l.wordCount) != null ? _a : null,
        latestAt: (_b = l == null ? void 0 : l.createdAt) != null ? _b : null
      };
    })
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
