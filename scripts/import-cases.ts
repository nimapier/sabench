import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createClient } from '@libsql/client'

interface CaseItem {
  year: string
  caseType: string
  title: string
  material: string
  question: string
  points: string[]
  derived?: boolean
}

const CASE_TYPES = ['需求分析', '系统设计', '架构评估', '数据库设计', '项目管理计算']

const __dirname = dirname(fileURLToPath(import.meta.url))
const casesDir = resolve(__dirname, '../data/cases')

const filter = process.argv[2]
const files = readdirSync(casesDir).filter((f) => f.endsWith('.json') && (!filter || f.includes(filter)))
const items: CaseItem[] = []
for (const file of files) {
  const data = JSON.parse(readFileSync(resolve(casesDir, file), 'utf-8')) as CaseItem[]
  for (const item of data) items.push(item)
  console.log(`[load] ${file}: ${data.length} items`)
}

for (const [i, item] of items.entries()) {
  for (const field of ['year', 'caseType', 'title', 'material', 'question'] as const) {
    if (typeof item[field] !== 'string' || !item[field].trim()) {
      throw new Error(`item[${i}].${field} is required`)
    }
  }
  if (!Array.isArray(item.points) || item.points.length === 0 || !item.points.every((p) => typeof p === 'string')) {
    throw new Error(`item[${i}].points must be a non-empty string array`)
  }
  if (!CASE_TYPES.includes(item.caseType)) {
    throw new Error(`item[${i}].caseType "${item.caseType}" not in ${CASE_TYPES.join('/')}`)
  }
}

const url = process.env.NUXT_TURSO_DATABASE_URL || 'file:.data/local.db'
const client = createClient({
  url,
  authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
})

async function main() {
  console.log(`[import] db: ${url}`)
  console.log(`[import] loaded ${items.length} items from ${files.length} files`)

  let inserted = 0
  let skipped = 0

  for (const item of items) {
    const existing = await client.execute({
      sql: 'SELECT id FROM case_question WHERE year = ? AND title = ?',
      args: [item.year.trim(), item.title.trim()],
    })

    if (existing.rows.length > 0) {
      skipped++
      console.log(`[skip] ${item.year} | ${item.title}`)
      continue
    }

    await client.execute({
      sql: 'INSERT INTO case_question (year, case_type, title, material, question, points, derived) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [
        item.year.trim(),
        item.caseType.trim(),
        item.title.trim(),
        item.material,
        item.question,
        JSON.stringify(item.points),
        item.derived ? 1 : 0,
      ],
    })
    inserted++
    console.log(`[insert] ${item.year} | ${item.title}`)
  }

  const total = await client.execute('SELECT COUNT(*) AS n FROM case_question')
  console.log(`[done] inserted=${inserted} skipped=${skipped} total=${total.rows[0].n}`)
}

main()
  .catch((err) => {
    console.error('[import] failed:', err)
    process.exit(1)
  })
  .finally(() => client.close())
