import { sql } from 'drizzle-orm'

// 章节练习断点续刷的 DB 兜底：返回指定分类下每道题最近一次作答的对错（不涉答案）
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const module = typeof query.module === 'string' && query.module.trim()
    ? query.module.trim()
    : null
  const tchapter = typeof query.tchapter === 'string' && query.tchapter.trim()
    ? query.tchapter.trim()
    : null
  if (!module && !tchapter) {
    throw createError({ statusCode: 400, statusMessage: 'module 或 tchapter 必传其一' })
  }

  const cond = tchapter
    ? sql`q.textbook_chapter = ${tchapter}`
    : sql`q.chapter = ${module}`

  const db = useDb()
  const rows = await db.all<{ qid: number, correct: number }>(sql`
    SELECT qa.question_id AS qid, qa.correct AS correct
    FROM question_attempt qa
    JOIN question q ON q.id = qa.question_id
    WHERE qa.id IN (SELECT MAX(id) FROM question_attempt GROUP BY question_id)
      AND ${cond}
  `)

  return { data: rows.map(r => ({ id: r.qid, correct: !!r.correct })) }
})
