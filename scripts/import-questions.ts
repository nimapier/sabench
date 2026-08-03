import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createClient } from '@libsql/client'

interface QuestionItem {
  year: number | string
  batch?: string
  no?: number
  chapter: string
  stem: string
  options: Record<string, string>
  answer: string
  analysis?: string
  source?: string
  derived?: boolean
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const

const __dirname = dirname(fileURLToPath(import.meta.url))
const questionsDir = resolve(__dirname, '../data/questions')

const filter = process.argv[2]
const files = readdirSync(questionsDir).filter((f) => f.endsWith('.json') && (!filter || f.includes(filter)))

interface Row {
  file: string
  item: QuestionItem
}

const rows: Row[] = []
for (const file of files) {
  const data = JSON.parse(readFileSync(resolve(questionsDir, file), 'utf-8')) as QuestionItem[]
  for (const item of data) rows.push({ file, item })
  console.log(`[load] ${file}: ${data.length} items`)
}

function validate(item: QuestionItem): string | null {
  if (item.year === undefined || item.year === null || String(item.year).trim() === '') return 'year missing'
  if (typeof item.stem !== 'string' || !item.stem.trim()) return 'stem missing'
  if (typeof item.chapter !== 'string' || !item.chapter.trim()) return 'chapter missing'
  if (!item.options || typeof item.options !== 'object') return 'options missing'
  for (const key of OPTION_KEYS) {
    if (typeof item.options[key] !== 'string' || !item.options[key].trim()) return `options.${key} missing`
  }
  if (typeof item.answer !== 'string' || !OPTION_KEYS.includes(item.answer.trim() as (typeof OPTION_KEYS)[number])) {
    return `answer "${item.answer}" not in A/B/C/D`
  }
  return null
}

const url = process.env.NUXT_TURSO_DATABASE_URL || 'file:.data/local.db'
const client = createClient({
  url,
  authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
})

async function main() {
  console.log(`[import] db: ${url}`)
  console.log(`[import] loaded ${rows.length} items from ${files.length} files`)

  let inserted = 0
  let skipped = 0
  let invalid = 0

  for (const { file, item } of rows) {
    const year = String(item.year).trim()
    const stem = item.stem?.trim() ?? ''

    const err = validate(item)
    if (err) {
      invalid++
      console.log(`[invalid] ${file} no=${item.no ?? '?'} year=${year}: ${err} | ${stem.slice(0, 40)}`)
      continue
    }

    // 2023 卷有共用题干甚至共用选项A的题组（答案不同），去重键须含 answer，故用 (year, stem, options.A, answer)
    const existing = await client.execute({
      sql: 'SELECT id FROM question WHERE year = ? AND stem = ? AND json_extract(options, \'$.A\') = ? AND answer = ?',
      args: [year, stem, item.options.A.trim(), item.answer.trim()],
    })

    if (existing.rows.length > 0) {
      skipped++
      continue
    }

    const options: Record<string, string> = {}
    for (const key of OPTION_KEYS) options[key] = item.options[key].trim()

    await client.execute({
      sql: 'INSERT INTO question (year, chapter, stem, options, answer, analysis, derived) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [
        year,
        item.chapter.trim(),
        stem,
        JSON.stringify(options),
        item.answer.trim(),
        (item.analysis ?? '').trim(),
        item.derived ? 1 : 0,
      ],
    })
    inserted++
  }

  const total = await client.execute('SELECT COUNT(*) AS n FROM question')
  console.log(`[done] inserted=${inserted} skipped=${skipped} invalid=${invalid} total=${total.rows[0].n}`)
}

main()
  .catch((err) => {
    console.error('[import] failed:', err)
    process.exit(1)
  })
  .finally(() => client.close())
