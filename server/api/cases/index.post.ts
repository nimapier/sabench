import { and, eq } from 'drizzle-orm'
import { caseQuestion } from '../../database/schema'

interface CaseItem {
  year?: unknown
  caseType?: unknown
  title?: unknown
  material?: unknown
  question?: unknown
  points?: unknown
  derived?: unknown
}

function validateItem(item: CaseItem, index: number): string | null {
  if (!item || typeof item !== 'object') return `item[${index}] must be an object`
  for (const field of ['year', 'caseType', 'title', 'material', 'question'] as const) {
    if (typeof item[field] !== 'string' || !(item[field] as string).trim()) {
      return `item[${index}].${field} is required`
    }
  }
  if (!Array.isArray(item.points) || item.points.length === 0
    || !item.points.every((p) => typeof p === 'string')) {
    return `item[${index}].points must be a non-empty string array`
  }
  return null
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const items: CaseItem[] = Array.isArray(body) ? body : [body]
  if (items.length === 0 || items[0] == null) {
    throw createError({ statusCode: 400, message: 'body is required' })
  }
  for (let i = 0; i < items.length; i++) {
    const err = validateItem(items[i], i)
    if (err) throw createError({ statusCode: 400, message: err })
  }

  const db = useDb()
  const results: Array<{ id: number, year: string | null, caseType: string | null, title: string | null, action: 'inserted' | 'updated' }> = []

  for (const item of items) {
    const values = {
      year: (item.year as string).trim(),
      caseType: (item.caseType as string).trim(),
      title: (item.title as string).trim(),
      material: item.material as string,
      question: item.question as string,
      points: JSON.stringify(item.points),
      derived: Boolean(item.derived),
    }
    const [existing] = await db
      .select({ id: caseQuestion.id })
      .from(caseQuestion)
      .where(and(eq(caseQuestion.year, values.year), eq(caseQuestion.title, values.title)))

    const row = existing
      ? (await db.update(caseQuestion).set(values).where(eq(caseQuestion.id, existing.id)).returning())[0]
      : (await db.insert(caseQuestion).values(values).returning())[0]

    // 响应不回传 points/material/question，导入结果仅作确认
    results.push({ id: row.id, year: row.year, caseType: row.caseType, title: row.title, action: existing ? 'updated' : 'inserted' })
  }

  return { data: results }
})
