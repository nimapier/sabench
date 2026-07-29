import { mkdirSync } from 'node:fs'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '../database/schema'

let db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function useDb() {
  if (db) return db

  const config = useRuntimeConfig()
  let url = config.tursoDatabaseUrl as string | undefined

  if (!url) {
    mkdirSync('.data', { recursive: true })
    url = 'file:.data/local.db'
  }

  const client = createClient({
    url,
    authToken: (config.tursoAuthToken as string | undefined) || undefined,
  })

  db = drizzle(client, { schema })
  return db
}
