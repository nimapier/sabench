import { cpSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)

export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false,
  },
  nitro: {
    preset: 'vercel',
    hooks: {
      // libsql 运行时按平台动态 require(`@libsql/${target}`) 加载原生绑定，
      // nitro 静态追踪不到（traceInclude 在 pnpm 隔离 + 插件自拦截下也失效），
      // 构建完成后把平台包实体拷入产物；未安装的平台包跳过。
      // 包列在 devDependencies 并与 libsql 版本对齐，Vercel 装依赖时会带上。
      compiled(nitro) {
        for (const pkg of ['@libsql/darwin-x64', '@libsql/linux-x64-gnu']) {
          try {
            const src = dirname(require.resolve(`${pkg}/package.json`))
            cpSync(src, join(nitro.options.output.dir, 'server/node_modules', pkg), { recursive: true })
          }
          catch { /* 该平台包未安装，跳过 */ }
        }
      },
    },
  },
  runtimeConfig: {
    tursoDatabaseUrl: '',
    tursoAuthToken: '',
    githubAllowedUser: '',
  },
  compatibilityDate: '2025-07-15',
})
