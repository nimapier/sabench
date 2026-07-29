import { defineConfig } from 'drizzle-kit'

const url = process.env.NUXT_TURSO_DATABASE_URL || 'file:.data/local.db'
const authToken = process.env.NUXT_TURSO_AUTH_TOKEN

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/database/schema.ts',
  dbCredentials: process.env.NUXT_TURSO_DATABASE_URL
    ? { url, authToken }
    : { url },
})
