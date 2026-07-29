<script setup lang="ts">
import { marked } from 'marked'
import { CASE_TYPES } from '#shared/constants'

interface FrameworkCard {
  id: number
  caseType: string | null
  title: string
  content: string | null
  sortOrder: number | null
}

const route = useRoute()
const router = useRouter()

const activeTab = computed(() =>
  typeof route.query.caseType === 'string' ? route.query.caseType : '',
)

const tabs = computed(() => [
  { label: '全部', value: '' },
  ...CASE_TYPES.map(t => ({ label: t, value: t })),
])

const { data, status } = await useFetch<{ data: FrameworkCard[] }>('/api/framework-cards', {
  query: computed(() => activeTab.value ? { caseType: activeTab.value } : {}),
  watch: [activeTab],
})

const cards = computed(() => data.value?.data ?? [])

const groups = computed(() => {
  const map = new Map<string, FrameworkCard[]>()
  for (const card of cards.value) {
    const key = card.caseType ?? '其他'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(card)
  }
  // 按 CASE_TYPES 顺序排列分组
  const order = [...CASE_TYPES, '其他']
  return [...map.entries()].sort(
    (a, b) => order.indexOf(a[0]) - order.indexOf(b[0]),
  )
})

function switchTab(value: string) {
  router.replace({ query: value ? { caseType: value } : {} })
}

// ---- 折叠/展开（默认全折叠，记忆在 localStorage）----
const STORAGE_KEY = 'sabench:cards:expanded'
const expanded = ref<Set<number>>(new Set())

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) expanded.value = new Set(JSON.parse(raw) as number[])
  }
  catch { /* 忽略损坏的缓存 */ }
})

function toggleCard(id: number) {
  const next = new Set(expanded.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expanded.value = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
  }
  catch { /* 隐私模式等场景静默失败 */ }
}

// ---- 内容特征 ----
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

function scrollToGroup(caseType: string) {
  document.getElementById(`group-${caseType}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// 内容来自本地种子数据（data/framework-cards.json），非用户输入，无 XSS 面
function render(content: string | null): string {
  return content ? (marked.parse(content, { async: false }) as string) : ''
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-highlighted">
        案例框架卡
      </h1>
      <p class="mt-1 text-sm text-muted">
        按题型整理的答题框架速查 · 点击卡片展开详情
      </p>
    </div>

    <div class="mb-4 flex flex-wrap gap-2">
      <UButton
        v-for="tab in tabs"
        :key="tab.value"
        :color="activeTab === tab.value ? 'primary' : 'neutral'"
        :variant="activeTab === tab.value ? 'solid' : 'outline'"
        size="sm"
        @click="switchTab(tab.value)"
      >
        {{ tab.label }}
      </UButton>
    </div>

    <!-- 章节锚点导航 -->
    <nav v-if="groups.length > 1" class="mb-8 flex flex-wrap items-center gap-1.5 text-sm">
      <span class="mr-1 text-muted">跳转到</span>
      <a
        v-for="[caseType] in groups"
        :key="caseType"
        :href="`#group-${caseType}`"
        class="rounded-full border border-default px-3 py-1 text-muted transition-colors hover:border-primary hover:text-primary"
        @click.prevent="scrollToGroup(caseType)"
      >
        {{ caseType }}
      </a>
    </nav>

    <div v-if="status === 'pending'" class="py-12 text-center text-muted">
      加载中…
    </div>

    <div v-else-if="groups.length === 0" class="py-12 text-center text-muted">
      暂无框架卡
    </div>

    <div v-else class="space-y-10">
      <section
        v-for="[caseType, list] in groups"
        :id="`group-${caseType}`"
        :key="caseType"
        class="scroll-mt-32"
      >
        <h2 class="sticky top-14 z-10 mb-4 flex items-baseline gap-2 border-b border-default bg-default/90 py-3 backdrop-blur">
          <span class="text-lg font-semibold text-highlighted">{{ caseType }}</span>
          <span class="text-xs font-normal text-muted">{{ list.length }} 张</span>
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <UCard
            v-for="card in list"
            :key="card.id"
            :class="hasTable(card.content) ? 'md:col-span-2' : ''"
            :ui="{ header: 'p-0 sm:p-0', body: 'p-0 sm:p-0' }"
          >
            <template #header>
              <button
                type="button"
                class="flex w-full items-start gap-3 p-5 text-left transition-colors hover:bg-elevated/50 sm:px-6"
                :aria-expanded="expanded.has(card.id)"
                @click="toggleCard(card.id)"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-semibold text-highlighted">
                      {{ card.title }}
                    </h3>
                    <span
                      v-if="hasTable(card.content)"
                      class="rounded border border-default px-1.5 py-0.5 text-xs text-muted"
                    >含表格</span>
                  </div>
                  <p v-if="!expanded.has(card.id)" class="mt-1.5 truncate text-sm text-muted">
                    {{ summaryOf(card.content) }}
                  </p>
                </div>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="mt-1 size-4 shrink-0 text-muted transition-transform duration-200"
                  :class="{ 'rotate-180': expanded.has(card.id) }"
                />
              </button>
            </template>
            <div v-if="expanded.has(card.id)" class="border-t border-default px-5 pb-6 pt-5 sm:px-6">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="card-content text-base leading-relaxed" v-html="render(card.content)" />
            </div>
          </UCard>
        </div>
      </section>
    </div>
  </UContainer>
</template>

<style scoped>
/* 大节标题（一、二、三…）：左侧色条 + 字号阶梯，节间分隔线 */
.card-content :deep(h2) {
  margin: 0 0 0.75em;
  padding-left: 0.6em;
  border-left: 3px solid var(--ui-primary);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--ui-text-highlighted);
}

.card-content :deep(h2:not(:first-child)) {
  margin-top: 1.75em;
  padding-top: 1.25em;
  border-top: 1px solid var(--ui-border);
}

.card-content :deep(h3) {
  margin: 1.25em 0 0.5em;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.card-content :deep(h4) {
  margin: 1em 0 0.4em;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.card-content :deep(p) {
  margin: 0.75em 0;
}

.card-content :deep(ul),
.card-content :deep(ol) {
  margin: 0.75em 0;
  padding-left: 1.5em;
  list-style: disc;
}

.card-content :deep(ol) {
  list-style: decimal;
}

.card-content :deep(li) {
  margin: 0.35em 0;
}

.card-content :deep(li > ul),
.card-content :deep(li > ol) {
  margin: 0.25em 0;
}

/* 表格：宽松单元格 + 斑马纹，保证全宽下不挤压 */
.card-content :deep(table) {
  width: 100%;
  margin: 1em 0;
  border-collapse: collapse;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.card-content :deep(th),
.card-content :deep(td) {
  border: 1px solid var(--ui-border);
  padding: 0.6em 0.9em;
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
  margin: 0.75em 0;
}

/* 降噪：加粗仅加粗并提为前景色，不再叠加额外颜色 */
.card-content :deep(strong) {
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.card-content :deep(em) {
  font-style: normal;
  color: var(--ui-text-muted);
}
</style>
