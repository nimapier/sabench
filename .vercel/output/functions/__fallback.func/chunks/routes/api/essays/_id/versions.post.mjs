import { d as defineEventHandler, g as getRouterParam, c as createError, r as readBody, u as useDb, e as essay, a as essayVersion, s as studyLog } from '../../../../nitro/nitro.mjs';
import { eq, and, desc } from 'drizzle-orm';
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

const versions_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const id = Number(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "invalid id" });
  }
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.content) || typeof body.content !== "string") {
    throw createError({ statusCode: 400, message: "content is required" });
  }
  const db = useDb();
  const [existing] = await db.select().from(essay).where(eq(essay.id, id));
  if (!existing) {
    throw createError({ statusCode: 404, message: "essay not found" });
  }
  const isDraft = body.isDraft === true;
  const selfReview = body.selfReview !== void 0 ? JSON.stringify(body.selfReview) : null;
  if (isDraft) {
    const [draft] = await db.select().from(essayVersion).where(and(eq(essayVersion.essayId, id), eq(essayVersion.isDraft, true))).orderBy(desc(essayVersion.createdAt)).limit(1);
    if (draft) {
      const [row3] = await db.update(essayVersion).set({
        content: body.content,
        wordCount: (_a = body.wordCount) != null ? _a : null,
        durationSec: (_b = body.durationSec) != null ? _b : null,
        selfReview,
        createdAt: /* @__PURE__ */ new Date()
      }).where(eq(essayVersion.id, draft.id)).returning();
      return { data: row3 };
    }
    const [row2] = await db.insert(essayVersion).values({
      essayId: id,
      content: body.content,
      wordCount: (_c = body.wordCount) != null ? _c : null,
      durationSec: (_d = body.durationSec) != null ? _d : null,
      selfReview,
      isDraft: true
    }).returning();
    return { data: row2 };
  }
  const durationSec = typeof body.durationSec === "number" ? body.durationSec : 0;
  const minutes = Math.round(durationSec / 60);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const [row] = await db.insert(essayVersion).values({
    essayId: id,
    content: body.content,
    wordCount: (_e = body.wordCount) != null ? _e : null,
    durationSec: (_f = body.durationSec) != null ? _f : null,
    selfReview,
    isDraft: false
  }).returning();
  await db.update(essay).set({ status: "done" }).where(eq(essay.id, id));
  await db.insert(studyLog).values({
    module: "essay",
    refId: id,
    minutes,
    date: today
  });
  return { data: row };
});

export { versions_post as default };
//# sourceMappingURL=versions.post.mjs.map
