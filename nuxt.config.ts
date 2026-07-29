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
    modules: [
      {
        // libsql 运行时按平台动态 require(`@libsql/${target}`) 加载原生绑定，nitro 静态追踪不到。
        // 必须以 nitro module 注册 compiled 钩子：nuxt.config 的 nitro.hooks 会覆盖 preset 的
        // 同名钩子，导致 vercel preset 不写 .vercel/output/config.json（Vercel 部署失败）。
        // 拷贝目标是 serverDir（函数包内），不是 output.dir/server。
        // 平台包列在 devDependencies 并与 libsql 版本对齐，未安装的平台跳过。
        setup(nitro: { hooks: { hook: (name: string, fn: (n: { options: { output: { serverDir: string } } }) => void) => void } }) {
          nitro.hooks.hook('compiled', (n) => {
            for (const pkg of ['@libsql/darwin-x64', '@libsql/linux-x64-gnu']) {
              try {
                const src = dirname(require.resolve(`${pkg}/package.json`))
                cpSync(src, join(n.options.output.serverDir, 'node_modules', pkg), { recursive: true })
              }
              catch { /* 该平台包未安装，跳过 */ }
            }
          })
        },
      },
    ],
  },
  runtimeConfig: {
    tursoDatabaseUrl: '',
    tursoAuthToken: '',
    githubAllowedUser: '',
  },
  compatibilityDate: '2025-07-15',
})
