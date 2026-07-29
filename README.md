# sabench

软考（系统分析师）备考训练台。Nuxt 4 + Nuxt UI + Drizzle ORM（libsql）+ nuxt-auth-utils，单人使用，含周计划、项目背景库、限时论文写作器、学习统计。

## 技术栈

- Nuxt 4（SSR）+ @nuxt/ui 4
- Drizzle ORM + @libsql/client：本地 SQLite 文件（`.data/local.db`）或远程 Turso，二选一
- nuxt-auth-utils：GitHub OAuth + 加密会话 cookie

## 本地运行（无需任何外部服务）

无需配置环境变量，数据库自动使用本地文件模式，登录走 dev 旁路：

```bash
pnpm install        # 安装依赖（首次约 2-3 分钟）
mkdir -p .data      # drizzle-kit 不会自动建目录，首次必须手动建
pnpm db:push        # 建表（写入 .data/local.db）
pnpm dev            # 启动开发服务器，默认 http://localhost:3000
```

浏览器打开 `http://localhost:3000/auth/dev` 即可一键登录进入首页（该路由仅 dev 模式存在，生产构建中为 404）。

## 环境变量

共 6 个，全部可选——不配时本地文件库 + dev 旁路即可开发。模板见 `.env.example`，复制为 `.env` 后填写：

| 变量 | 用途 | 何时必填 |
|---|---|---|
| `NUXT_TURSO_DATABASE_URL` | Turso 库 URL（`libsql://xxx.turso.io`），留空用本地文件 | 生产 |
| `NUXT_TURSO_AUTH_TOKEN` | Turso 访问令牌 | 生产 |
| `NUXT_OAUTH_GITHUB_CLIENT_ID` | GitHub OAuth App Client ID | 生产 |
| `NUXT_OAUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret | 生产 |
| `NUXT_SESSION_PASSWORD` | 会话加密密码（≥32 位随机串） | **生产必须显式设置** |
| `NUXT_GITHUB_ALLOWED_USER` | 允许登录的 GitHub 用户名（白名单） | 生产 |

## 前置工作 A：Turso（生产数据库）

1. 到 https://turso.tech 注册账号（GitHub 登录即可）。
2. 安装 CLI 或用 Web 控制台建库，例如：
   ```bash
   turso db create sabench
   turso db show sabench --url        # 得到 libsql://sabench-xxx.turso.io
   turso db tokens create sabench     # 得到访问令牌
   ```
3. 把 URL 和令牌分别记入 `NUXT_TURSO_DATABASE_URL`、`NUXT_TURSO_AUTH_TOKEN`。

## 前置工作 B：GitHub OAuth App（生产登录）

1. 打开 https://github.com → 右上头像 → **Settings** → 左侧底部 **Developer settings** → **OAuth Apps** → **New OAuth App**。
2. 填写：
   - **Application name**：任意（如 `sabench`）
   - **Homepage URL**：部署后的站点地址，如 `https://你的域名.vercel.app`
   - **Authorization callback URL**：格式为 `{origin}/auth/github`，即 `https://你的域名.vercel.app/auth/github`
3. 创建后得到 **Client ID**；点 **Generate a new client secret** 得到 **Client Secret**，分别记入 `NUXT_OAUTH_GITHUB_CLIENT_ID`、`NUXT_OAUTH_GITHUB_CLIENT_SECRET`。
4. 本地调试 OAuth 回调地址是 `http://localhost:3000/auth/github`，与线上域名不同——可以另建一个本地专用 OAuth App，或上线前把回调地址改成线上域名。

## 前置工作 C：部署到 Vercel

> **git init / commit / push 由你本人执行**，本项目不代为提交。

1. 你自己把代码推到 GitHub：`git init` → `git add -A && git commit` → 建远程仓库 → `git push`。
2. 到 https://vercel.com 用 GitHub 登录，**Add New → Project**，import 该仓库。Vercel 会自动识别 Nuxt，构建命令 `pnpm build`、输出目录 `.output` 均无需改动。
3. 在项目 **Settings → Environment Variables** 配置上面表格中的 6 个变量（Production 环境）。
4. **首次部署后需要建一次表**：在你本地终端执行（把 env 指向 Turso）：
   ```bash
   NUXT_TURSO_DATABASE_URL=libsql://xxx.turso.io \
   NUXT_TURSO_AUTH_TOKEN=你的令牌 \
   pnpm db:push
   ```
   表结构推送成功后，线上实例即可正常读写。
5. 首次访问 `/plan` 时会自动写入 52 条周计划种子数据，无需手工导入。

## 生产注意事项

- **`NUXT_SESSION_PASSWORD` 必须显式设置**（≥32 位随机串，`openssl rand -hex 32` 生成）。缺失时 session 解密会抛 500，把鉴权中间件本该返回的 401 全部掩盖，表现为"所有接口莫名 500"，极难排查。nuxt-auth-utils 只在本地 dev 自动生成并写入 `.env`，生产环境不会兜底。
- **`NUXT_GITHUB_ALLOWED_USER` 为空时**，GitHub 登录全部 403 拒绝，仅本地 dev 旁路（`/auth/dev`）可用——单人使用场景这正是预期行为。
- `/auth/dev` 仅存在于 dev 模式，生产构建返回 404，无需担心线上绕过登录。
- **libsql 原生绑定已内建进产物**：libsql 运行时按平台动态加载原生包（本机 `@libsql/darwin-x64`、Vercel `@libsql/linux-x64-gnu`），构建工具静态分析追踪不到，已在 `nuxt.config.ts` 的 nitro `compiled` 钩子中自动拷入 `.output`，两个平台包以 devDependencies 形式锁定（版本需与 `libsql` 保持一致，当前 0.5.29）。`pnpm build` 产物开箱即用，**无需任何手动补文件**；若日后升级 `@libsql/client`，请同步升级这两个平台包的版本号。

## 数据备份

- **Turso**：免费计划自带每日备份；也可随时 `turso db shell sabench ".dump"` 导出全量 SQL。
- **本地文件模式**：直接拷贝 `.data/local.db` 文件即完成备份（建议停机后拷贝，避免写入中拷贝出脏页）。
- 本项目为单人使用，备份 + 单实例部署足以满足容灾，无需多副本。

## 常用命令

| 命令 | 说明 |
|---|---|
| `pnpm dev` | 启动开发服务器（默认 3000 端口） |
| `pnpm build` | 生产构建（输出 `.output/`） |
| `pnpm db:push` | 按 `server/database/schema.ts` 推送表结构（读 `NUXT_TURSO_DATABASE_URL`，无则写本地文件） |
