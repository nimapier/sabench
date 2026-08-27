import { and, eq } from 'drizzle-orm'
import { question, questionAttempt } from '../../database/schema'

// 章节练习断点续刷的 DB 兜底：返回指定分类下已作答过的 questionId 列表
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

  const db = useDb()
  const cond = tchapter ? eq(question.textbookChapter, tchapter) : eq(question.chapter, module!)
  const rows = await db
    .selectDistinct({ questionId: questionAttempt.questionId })
    .from(questionAttempt)
    .innerJoin(question, and(eq(questionAttempt.questionId, question.id), cond))

  return { data: rows.map(r => r.questionId).filter((id): id is number => id !== null) }
})
