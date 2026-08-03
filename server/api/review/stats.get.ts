import { and, asc, count, eq, gte, lt, lte, sql } from 'drizzle-orm'
import { question, questionAttempt, reviewQueue } from '../../database/schema'

const CHAPTERS = [
  '系统规划与需求工程',
  '系统分析与设计',
  '软件工程与项目管理',
  '计算机基础与新技术',
  '数学与经济管理',
  '法规与英语',
]

function rate2(correct: number, total: number): number | null {
  return total > 0 ? Math.round((correct / total) * 100) / 100 : null
}

export default defineEventHandler(async () => {
  const db = useDb()
  const today = todayString()

  const [dueRow] = await db
    .select({ n: count() })
    .from(reviewQueue)
    .where(and(lte(reviewQueue.dueDate, today), lt(reviewQueue.streak, 3)))
  const [inQueueRow] = await db
    .select({ n: count() })
    .from(reviewQueue)
    .where(lt(reviewQueue.streak, 3))
  const [graduatedRow] = await db
    .select({ n: count() })
    .from(reviewQueue)
    .where(gte(reviewQueue.streak, 3))

  const attemptRows = await db
    .select({
      chapter: question.chapter,
      total: count(),
      correct: sql<number>`sum(case when ${questionAttempt.correct} then 1 else 0 end)`,
    })
    .from(questionAttempt)
    .innerJoin(question, eq(questionAttempt.questionId, question.id))
    .groupBy(question.chapter)
    .orderBy(asc(question.chapter))

  const byChapter = new Map(attemptRows.map(r => [r.chapter, r]))
  for (const r of attemptRows) {
    if (r.chapter && !CHAPTERS.includes(r.chapter)) CHAPTERS.push(r.chapter)
  }
  const byModule = CHAPTERS.map((chapter) => {
    const r = byChapter.get(chapter)
    const total = r?.total ?? 0
    const correct = Number(r?.correct ?? 0)
    return { chapter, total, correct, rate: rate2(correct, total) }
  })

  const totalAll = byModule.reduce((s, m) => s + m.total, 0)
  const correctAll = byModule.reduce((s, m) => s + m.correct, 0)

  return {
    data: {
      dueToday: dueRow?.n ?? 0,
      inQueue: inQueueRow?.n ?? 0,
      graduated: graduatedRow?.n ?? 0,
      byModule,
      overallRate: rate2(correctAll, totalAll),
    },
  }
})
