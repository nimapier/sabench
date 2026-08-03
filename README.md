# sabench

软考（系统分析师）备考训练台。Nuxt 4 + Nuxt UI + Drizzle ORM（libsql）+ nuxt-auth-utils，单人使用，含周计划、项目背景库、限时论文写作器、案例训练场、选择题刷题与 SM-2 复习、学习统计。

题库规模：**382 道选择题（247 道历年真题 + 135 道仿写题）+ 25 道案例分析题 + 8 张解题框架卡**。

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

## 模块：案例训练场（/case）

下午案例分析题的专项训练，三个页面：

| 页面 | 说明 |
|---|---|
| `/case` | 题目列表（25 道：20 道历年真题 + 5 道 2026 模拟题），按五类题型（需求分析/系统设计/架构评估/数据库设计/项目管理计算）筛选 |
| `/case/cards` | 解题框架卡（8 张），按题型分组的方法论速查（如 ATAM 评估四步、E-R 转关系模式、挣值计算） |
| `/case/[id]` | 做题页：读材料作答 → 提交后才下发采分点（作答前 API 与页面源码均不含采分点）→ 逐点自评勾选 → 得分率与答案对照、历史记录 |

### 数据种子（框架卡 + 题目）

两个脚本均用 `@libsql/client` 直连，读 `NUXT_TURSO_DATABASE_URL`（未设置则写本地 `.data/local.db`），按标题查重、可重复执行：

```bash
# 8 张框架卡（data/framework-cards.json）
node_modules/.bin/tsx scripts/seed-framework-cards.ts

# 25 道题（data/cases/*.json：2026 模拟 5 道 + 历年真题 20 道）
# 不带参数全量导入；带子串参数只导入匹配文件，如 scripts/import-cases.ts mock
node_modules/.bin/tsx scripts/import-cases.ts
```

对 Turso 执行：先 `set -a; . ./.env; set +a` 再跑同一命令即可（表结构有变更时先 `pnpm db:push`）。

真题题面与参考答案采集自公开网页（希赛 educity 题面、CSDN 网友解析答案，串行间隔 ≥2s、无登录/付费墙），逐题来源见 `~/.sisyphus/evidence/batch2-task-B8-crawl.txt`；2024 下及 2025 年公开渠道无完整题面，按"宁缺毋滥"未收录。

## 模块：选择题刷题与复习（/quiz）

上午选择题的专项训练 + 基于简化 SM-2 算法的错题复习，两个页面：

| 页面 | 说明 |
|---|---|
| `/quiz` | 刷题页：按模块/年份筛选、随机抽题、整卷模考（如 2022 卷 75 题）；作答判分后才下发答案与解析（判分前 API 响应不含 answer/analysis），答错自动入复习队列 |
| `/quiz/review` | 错题复习页：SM-2 间隔推进（1/3/7/15 天，连对 3 次毕业），按到期日出题 |

### 题库数据与导入

选择题源数据在 `data/questions/` 目录，按文件分卷：

- `ruankao-*.json`：历年真题（2021/2022/2023.5/2024.11/2025.5/2026.5，共 247 道）
- `mock-*.json`：仿写补题（共 135 道），题条目带 `derived: true` 标记，导入后写入 `question` 表的 `derived` 列（SQLite boolean，真题=0、仿写=1），用于统计与筛选时区分来源；年份字段为 `mock`，前端套卷 Tab 已过滤不展示
- `*.json.superseded`：被新版卷面取代的旧采集文件，仅存档备查，导入脚本只认 `.json` 后缀、不会读它们

```bash
# 全量导入；可选子串参数按文件名过滤，如 scripts/import-questions.ts 2022 / mock
# 幂等：按 (year, stem, options.A, answer) 四元组查重（2023 卷存在共用题干的题组，键必须含答案）
node_modules/.bin/tsx scripts/import-questions.ts
```

仿写题质量框架：真题考点变式出题 + 机器复算校验答案 + 盲解交叉验证解析。

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
2. 到 https://vercel.com 用 GitHub 登录，**Add New → Project**，import 该仓库。**关键：Framework Preset 选 `Other`（不要选 Nuxt.js——那是 Nuxt 2 的静态预设，会报 `No Output Directory named "dist"`）**，构建命令与输出目录保持默认即可。仓库已显式配置 `nitro.preset: 'vercel'`，构建产出 `.vercel/output` 标准 serverless 格式，Vercel 自动接管。
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
| `tsx scripts/seed-framework-cards.ts` | 导入 8 张案例框架卡（幂等，按标题查重） |
| `tsx scripts/import-cases.ts [过滤子串]` | 导入案例题（mock 5 + 真题 20，幂等；可选按文件名过滤） |
| `tsx scripts/import-questions.ts [过滤子串]` | 导入选择题（真题 247 + 仿写 135，幂等按四元组查重；可选按文件名过滤） |
