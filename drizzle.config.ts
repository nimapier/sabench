import { defineConfig } from 'drizzle-kit'

const url = process.env.NUXT_TURSO_DATABASE_URL || 'file:.data/local.db'
const authToken = process.env.NUXT_TURSO_AUTH_TOKEN
const isRemote = Boolean(process.env.NUXT_TURSO_DATABASE_URL)

// 远程 Turso 必须用 dialect 'turso'（dialect 'sqlite' 仅支持本地 file，远程拉取 schema 会静默失败）
export default defineConfig({
  dialect: isRemote ? 'turso' : 'sqlite',
  schema: './server/database/schema.ts',
  dbCredentials: isRemote ? { url, authToken: authToken! } : { url },
})
