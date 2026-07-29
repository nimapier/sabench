<script setup lang="ts">
import { marked } from 'marked'

interface RecentAttempt {
  id: number
  score: number | null
  durationSec: number | null
  createdAt: string
}

interface CaseDetail {
  id: number
  year: string | null
  caseType: string | null
  title: string | null
  material: string | null
  question: string | null
  recentAttempts: RecentAttempt[]
}

interface FrameworkCard {
  id: number
  caseType: string | null
  title: string
  content: string | null
  sortOrder: number | null
}

const route = useRoute()
const toast = useToast()
const id = route.params.id as string

const { data, error, refresh } = await useFetch<{ data: CaseDetail }>(`/api/cases/${id}`)
if (error.value || !data.value?.data) {
  throw createError({ statusCode: 404, statusMessage: '案例题不存在', fatal: true })
}
const caseDetail = computed(() => data.value?.data)
const recentAttempts = computed(() => caseDetail.value?.recentAttempts ?? [])

// 框架卡（按题型）
const { data: cardsData } = await useFetch<{ data: FrameworkCard[] }>(
  `/api/framework-cards?caseType=${encodeURIComponent(caseDetail.value?.caseType ?? '')}`,
)
const frameworkCards = computed(() => cardsData.value?.data ?? [])
const expandedCards = ref<Set<number>>(new Set())
function toggleCard(cardId: number) {
  const next = new Set(expandedCards.value)
  if (next.has(cardId)) next.delete(cardId)
  else next.add(cardId)
  expandedCards.value = next
}
// 内容特征（与 /case/cards 页同一套视觉语言）
function hasTable(content: string | null): boolean {
  return !!content && /^\s*\|.*\|\s*$/m.test(content)
}

// 取首个非标题、非表格、非引用行，截断 ~60 字作为摘要
function summaryOf(content: string | null): string {
  if (!content) return ''
  for (const raw of content.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('#') || line.startsWith('|') || line.startsWith('>') || /^-{3,}$/.test(line)) continue
    const text = line
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/^[-*+]\s+/, '')
      .replace(/^\d+[.、)]\s*/, '')
      .trim()
    if (text) return text.length > 60 ? `${text.slice(0, 60)}…` : text
  }
  return ''
}

// 内容来自本地种子数据（data/framework-cards.json），非用户输入，无 XSS 面
// 表格包一层 .table-wrap，窄栏内横向滚动不挤压
function renderMd(content: string | null): string {
  if (!content) return ''
  const html = marked.parse(content, { async: false }) as string
  return html.replace(/<table>[\s\S]*?<\/table>/g, '<div class="table-wrap">$&</div>')
}

// ---------- 流程状态机 ----------
type Phase = 'answering' | 'scoring' | 'done'
const phase = ref<Phase>('answering')
const answer = ref('')
const attemptId = ref<number | null>(null)
// 采分点仅在提交作答后由 attempts.post 下发，此前页面无任何 points 数据
const points = ref<string[]>([])
const hitChecks = ref<boolean[]>([])
const finalScore = ref<number | null>(null)
const finalDurationSec = ref<number | null>(null)

// ---------- 正计时器（只提醒不强制） ----------
const elapsed = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => {
    if (phase.value === 'answering') elapsed.value += 1
  }, 1000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const timeText = computed(() => {
  const m = String(Math.floor(elapsed.value / 60)).padStart(2, '0')
  const s = String(elapsed.value % 60).padStart(2, '0')
  return `${m}:${s}`
})
const timerClass = computed(() => {
  if (elapsed.value >= 30 * 60) return 'text-red-500'
  if (elapsed.value >= 25 * 60) return 'text-amber-500'
  return 'text-highlighted'
})

// ---------- 提交作答 ----------
const submitting = ref(false)
async function submitAnswer() {
  if (!answer.value.trim() || submitting.value) return
  submitting.value = true
  try {
    const res = await $fetch<{ data: { attemptId: number, points: string[] } }>(
      `/api/cases/${id}/attempts`,
      {
        method: 'POST',
        body: { answer: answer.value, durationSec: elapsed.value },
      },
    )
    attemptId.value = res.data.attemptId
    points.value = res.data.points
    hitChecks.value = res.data.points.map(() => false)
    phase.value = 'scoring'
  }
  catch {
    toast.add({ title: '提交失败，请重试', color: 'error' })
  }
  finally {
    submitting.value = false
  }
}

// ---------- 完成自评 ----------
const hitCount = computed(() => hitChecks.value.filter(Boolean).length)
const finishing = ref(false)
async function finishScoring() {
  if (attemptId.value == null || finishing.value) return
  finishing.value = true
  try {
    const hitPoints = hitChecks.value
      .map((checked, i) => (checked ? i : -1))
      .filter(i => i >= 0)
    const res = await $fetch<{ data: { score: number | null, durationSec: number | null } }>(
      `/api/cases/attempts/${attemptId.value}`,
      { method: 'PUT', body: { hitPoints } },
    )
    finalScore.value = res.data.score
    finalDurationSec.value = res.data.durationSec ?? elapsed.value
    phase.value = 'done'
    await refresh()
  }
  catch {
    toast.add({ title: '自评提交失败，请重试', color: 'error' })
  }
  finally {
    finishing.value = false
  }
}

// ---------- 再做一次 ----------
function retry() {
  phase.value = 'answering'
  answer.value = ''
  elapsed.value = 0
  attemptId.value = null
  points.value = []
  hitChecks.value = []
  finalScore.value = null
  finalDurationSec.value = null
}

// ---------- 得分展示 ----------
const scorePercent = computed(() =>
  finalScore.value == null ? null : Math.round(finalScore.value * 100),
)
function scoreColorClass(score: number | null): string {
  if (score == null) return 'text-muted'
  if (score < 0.45) return 'text-red-500'
  if (score <= 0.75) return 'text-amber-500'
  return 'text-green-500'
}
function scoreBadgeColor(score: number | null): 'error' | 'warning' | 'success' | 'neutral' {
  if (score == null) return 'neutral'
  if (score < 0.45) return 'error'
  if (score <= 0.75) return 'warning'
  return 'success'
}

function formatDuration(sec: number | null): string {
  if (sec == null) return '—'
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m > 0 ? `${m} 分 ${s} 秒` : `${s} 秒`
}
function formatTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const sidebarOpen = ref(true)
</script>

<template>
  <div class="mx-auto max-w-7xl p-4 py-6">
    <!-- 顶部题目信息 + 计时器 -->
    <div class="flex items-center gap-3 flex-wrap mb-4">
      <UBadge v-if="caseDetail?.year" color="neutral" variant="subtle">
        {{ caseDetail.year }}
      </UBadge>
      <UBadge v-if="caseDetail?.caseType" color="primary" variant="subtle">
        {{ caseDetail.caseType }}
      </UBadge>
      <h1 class="text-xl font-bold text-highlighted">
        {{ caseDetail?.title }}
      </h1>
      <div class="ml-auto flex items-center gap-2">
        <UIcon name="i-lucide-timer" class="size-5 text-muted" />
        <span
          class="text-2xl font-mono font-bold tabular-nums"
          :class="timerClass"
          data-timer
        >{{ timeText }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
      <!-- 左栏主区 -->
      <div class="space-y-4 min-w-0">
        <!-- 材料 -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-highlighted">
              案例材料
            </h2>
          </template>
          <div class="whitespace-pre-wrap text-sm leading-7" data-material>
            {{ caseDetail?.material ?? '' }}
          </div>
        </UCard>

        <!-- 问题 -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-highlighted">
              问题
            </h2>
          </template>
          <div class="whitespace-pre-wrap text-sm leading-7" data-question>
            {{ caseDetail?.question ?? '' }}
          </div>
        </UCard>

        <!-- answering：作答区 -->
        <template v-if="phase === 'answering'">
          <UTextarea
            v-model="answer"
            :rows="14"
            class="w-full"
            :ui="{ base: 'min-h-[30vh]' }"
            placeholder="结合右侧框架卡与材料，逐条作答…"
            data-editor
          />
          <div class="flex justify-end">
            <UButton
              color="primary"
              icon="i-lucide-send"
              :disabled="!answer.trim()"
              :loading="submitting"
              data-submit-answer
              @click="submitAnswer"
            >
              提交作答
            </UButton>
          </div>
        </template>

        <!-- scoring：采分点自评 -->
        <template v-else-if="phase === 'scoring'">
          <UCard data-scoring-panel>
            <template #header>
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <h2 class="font-semibold text-highlighted">
                  采分点自评（已勾 {{ hitCount }} / {{ points.length }}）
                </h2>
                <UButton
                  color="primary"
                  icon="i-lucide-check"
                  :loading="finishing"
                  data-finish-scoring
                  @click="finishScoring"
                >
                  完成自评
                </UButton>
              </div>
            </template>
            <ul class="space-y-3">
              <li
                v-for="(point, i) in points"
                :key="i"
                class="grid grid-cols-1 gap-2 rounded-lg border border-default p-3 md:grid-cols-2"
                data-point-item
              >
                <UCheckbox
                  v-model="hitChecks[i]"
                  :label="point"
                  :data-point-checkbox="i"
                />
                <div class="whitespace-pre-wrap rounded bg-elevated p-2 text-xs leading-6 text-muted max-h-32 overflow-y-auto">
                  {{ answer }}
                </div>
              </li>
            </ul>
          </UCard>
        </template>

        <!-- done：得分与对照 -->
        <template v-else>
          <UCard data-done-panel>
            <div class="flex items-center gap-8 flex-wrap">
              <div>
                <p class="text-sm text-muted mb-1">
                  得分率
                </p>
                <p
                  class="text-5xl font-mono font-bold tabular-nums"
                  :class="scoreColorClass(finalScore)"
                  data-score-percent
                >
                  {{ scorePercent == null ? '—' : `${scorePercent}%` }}
                </p>
              </div>
              <div class="text-sm space-y-1">
                <p>命中采分点：<b>{{ hitCount }} / {{ points.length }}</b></p>
                <p>用时：<b data-done-duration>{{ formatDuration(finalDurationSec) }}</b></p>
              </div>
              <UButton
                class="ml-auto"
                color="primary"
                variant="outline"
                icon="i-lucide-rotate-ccw"
                data-retry
                @click="retry"
              >
                再做一次
              </UButton>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="font-semibold text-highlighted">
                答案对照
              </h2>
            </template>
            <ul class="space-y-2 mb-4">
              <li
                v-for="(point, i) in points"
                :key="i"
                class="flex items-start gap-2 text-sm"
              >
                <UIcon
                  :name="hitChecks[i] ? 'i-lucide-check-circle-2' : 'i-lucide-x-circle'"
                  class="mt-0.5 shrink-0"
                  :class="hitChecks[i] ? 'text-success' : 'text-error'"
                />
                <span>{{ point }}</span>
              </li>
            </ul>
            <p class="text-xs text-muted mb-1">
              我的作答
            </p>
            <div class="whitespace-pre-wrap rounded bg-elevated p-3 text-sm leading-7" data-my-answer>
              {{ answer }}
            </div>
          </UCard>
        </template>

        <!-- 历史记录 -->
        <UCard v-if="recentAttempts.length" data-history>
          <template #header>
            <h2 class="font-semibold text-highlighted">
              最近练习记录
            </h2>
          </template>
          <ul class="space-y-2">
            <li
              v-for="attempt in recentAttempts"
              :key="attempt.id"
              class="flex items-center gap-4 text-sm flex-wrap"
              data-history-item
            >
              <span class="text-muted">{{ formatTime(attempt.createdAt) }}</span>
              <UBadge :color="scoreBadgeColor(attempt.score)" variant="subtle" data-history-score>
                {{ attempt.score == null ? '未自评' : `${Math.round(attempt.score * 100)}%` }}
              </UBadge>
              <span class="text-muted">用时 {{ formatDuration(attempt.durationSec) }}</span>
            </li>
          </ul>
        </UCard>
      </div>

      <!-- 右栏：框架卡 -->
      <div class="min-w-0">
        <UCollapsible v-model:open="sidebarOpen" class="lg:sticky lg:top-20 self-start w-full">
          <UButton
            block
            color="neutral"
            variant="outline"
            icon="i-lucide-layers"
            trailing-icon="i-lucide-chevron-down"
            class="group [&>span:last-child]:group-data-[state=open]:rotate-180"
            data-cards-toggle
          >
            框架卡（{{ frameworkCards.length }}）
          </UButton>
          <template #content>
            <div class="mt-2 space-y-2" data-framework-cards>
              <p v-if="!frameworkCards.length" class="text-sm text-muted px-1">
                该题型暂无框架卡
              </p>
              <UCard
                v-for="card in frameworkCards"
                :key="card.id"
                :ui="{ header: 'p-0 sm:p-0', body: 'p-0 sm:p-0' }"
                data-framework-card
              >
                <template #header>
                  <button
                    type="button"
                    class="flex w-full items-start gap-2 p-4 text-left transition-colors hover:bg-elevated/50"
                    :aria-expanded="expandedCards.has(card.id)"
                    @click="toggleCard(card.id)"
                  >
                    <div class="min-w-0 flex-1">
                      <div class="flex flex-wrap items-center gap-1.5">
                        <h3 class="text-sm font-semibold text-highlighted">
                          {{ card.title }}
                        </h3>
                        <span
                          v-if="hasTable(card.content)"
                          class="rounded border border-default px-1 py-0.5 text-xs text-muted"
                        >含表格</span>
                      </div>
                      <p v-if="!expandedCards.has(card.id)" class="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                        {{ summaryOf(card.content) }}
                      </p>
                    </div>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="mt-0.5 size-4 shrink-0 text-muted transition-transform duration-200"
                      :class="{ 'rotate-180': expandedCards.has(card.id) }"
                    />
                  </button>
                </template>
                <div
                  v-if="expandedCards.has(card.id)"
                  class="border-t border-default px-4 pb-5 pt-4"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div class="card-content text-sm leading-relaxed" v-html="renderMd(card.content)" />
                </div>
              </UCard>
            </div>
          </template>
        </UCollapsible>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 窄栏适配版卡片排版：与 /case/cards 同一视觉语言，尺寸按 380px 侧栏收缩 */
.card-content :deep(h2) {
  margin: 0 0 0.65em;
  padding-left: 0.6em;
  border-left: 3px solid var(--ui-primary);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--ui-text-highlighted);
}

.card-content :deep(h2:not(:first-child)) {
  margin-top: 1.5em;
  padding-top: 1em;
  border-top: 1px solid var(--ui-border);
}

.card-content :deep(h3) {
  margin: 1.1em 0 0.45em;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.card-content :deep(h4) {
  margin: 0.9em 0 0.35em;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.card-content :deep(p) {
  margin: 0.65em 0;
}

.card-content :deep(ul),
.card-content :deep(ol) {
  margin: 0.65em 0;
  padding-left: 1.35em;
  list-style: disc;
}

.card-content :deep(ol) {
  list-style: decimal;
}

.card-content :deep(li) {
  margin: 0.3em 0;
}

.card-content :deep(li > ul),
.card-content :deep(li > ol) {
  margin: 0.2em 0;
}

/* 表格：窄栏内横向滚动，字号略降但保持可读 */
.card-content :deep(.table-wrap) {
  margin: 0.85em 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.card-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  line-height: 1.55;
}

.card-content :deep(th),
.card-content :deep(td) {
  border: 1px solid var(--ui-border);
  padding: 0.45em 0.7em;
  /* 单元格最小宽度：多列表格自然撑宽由 .table-wrap 横向滚动，避免挤压成文字墙 */
  min-width: 7em;
  text-align: left;
  vertical-align: top;
}

.card-content :deep(th) {
  background: var(--ui-bg-elevated);
  font-weight: 600;
  color: var(--ui-text-highlighted);
  white-space: nowrap;
}

.card-content :deep(tbody tr:nth-child(even)) {
  background: var(--ui-bg-muted);
}

.card-content :deep(code) {
  background: var(--ui-bg-elevated);
  border-radius: 4px;
  padding: 0.1em 0.35em;
  font-size: 0.875em;
}

.card-content :deep(blockquote) {
  border-left: 3px solid var(--ui-border-accented);
  padding: 0.25em 0 0.25em 1em;
  color: var(--ui-text-muted);
  margin: 0.65em 0;
}

.card-content :deep(strong) {
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.card-content :deep(em) {
  font-style: normal;
  color: var(--ui-text-muted);
}
</style>
