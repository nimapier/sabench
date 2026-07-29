import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createClient } from '@libsql/client'

interface FrameworkCard {
  caseType: string
  title: string
  content: string
  sortOrder: number
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = resolve(__dirname, '../data/framework-cards.json')
const cards = JSON.parse(readFileSync(dataPath, 'utf-8')) as FrameworkCard[]

const url = process.env.NUXT_TURSO_DATABASE_URL || 'file:.data/local.db'
const client = createClient({
  url,
  authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
})

async function main() {
  console.log(`[seed] db: ${url}`)
  console.log(`[seed] loaded ${cards.length} cards from ${dataPath}`)

  let inserted = 0
  let skipped = 0

  for (const card of cards) {
    const existing = await client.execute({
      sql: 'SELECT id FROM framework_card WHERE title = ?',
      args: [card.title],
    })

    if (existing.rows.length > 0) {
      skipped++
      console.log(`[skip] ${card.title}`)
      continue
    }

    await client.execute({
      sql: 'INSERT INTO framework_card (case_type, title, content, sort_order) VALUES (?, ?, ?, ?)',
      args: [card.caseType, card.title, card.content, card.sortOrder],
    })
    inserted++
    console.log(`[insert] ${card.title}`)
  }

  const total = await client.execute('SELECT COUNT(*) AS n FROM framework_card')
  console.log(`[done] inserted=${inserted} skipped=${skipped} total=${total.rows[0].n}`)
}

main()
  .catch((err) => {
    console.error('[seed] failed:', err)
    process.exit(1)
  })
  .finally(() => client.close())
