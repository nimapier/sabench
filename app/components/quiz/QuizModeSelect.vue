<script setup lang="ts">
import type { QuizQuestion } from '#shared/quiz'
import { TEXTBOOK_CHAPTERS, textbookChapterLabel } from '#shared/textbook-chapter'

const emit = defineEmits<{
  startPractice: [payload: { title: string, questions: QuizQuestion[] }]
  startPaper: [payload: { year: string }]
}>()

const toast = useToast()

interface ModuleRow { chapter: string, count: number, attempted: number, correct: number }
interface YearRow { year: string, count: number }

const { data: modulesData, status: modulesStatus } = await useFetch<{ data: ModuleRow[] }>('/api/questions/modules')
const { data: textbookData, status: textbookStatus } = await useFetch<{ data: ModuleRow[] }>('/api/questions/modules', {
  query: { by: 'textbook' },
})
const { data: yearsData, status: yearsStatus } = await useFetch<{ data: YearRow[] }>('/api/questions/years')

const groupBy = ref<'module' | 'textbook'>('textbook')

const groupByOptions = [
  { key: 'textbook' as const, label: '按教材章节' },
  { key: 'module' as const, label: '按考纲模块' },
]

const chapters = computed(() => {
  const rows = (groupBy.value === 'textbook' ? textbookData.value?.data : modulesData.value?.data) ?? []
  if (groupBy.value === 'module') {
    return rows.map(r => ({ key: r.chapter, label: r.chapter, count: r.count, attempted: r.attempted, correct: r.correct }))
  }
  const known = new Set(TEXTBOOK_CHAPTERS.map(c => c.key))
  return rows.map(r => ({
    key: r.chapter,
    label: known.has(r.chapter) ? textbookChapterLabel(r.chapter) : r.chapter,
    count: r.count,
    attempted: r.attempted,
    correct: r.correct,
  }))
})
const chaptersStatus = computed(() => groupBy.value === 'textbook' ? textbookStatus.value : modulesStatus.value)

const years = computed(() => (yearsData.value?.data ?? []).filter(y => y.year !== 'mock'))

const tabs = [
  { key: 'chapter', label: '章节练习', icon: 'i-lucide-book-open' },
  { key: 'paper', label: '年度套卷', icon: 'i-lucide-file-clock' },
  { key: 'random', label: '随机 50', icon: 'i-lucide-shuffle' },
]
const activeTab = ref('chapter')

const starting = ref<string | null>(null)

async function startChapter(key: string, label: string) {
  if (starting.value) return
  starting.value = key
  try {
    const query = groupBy.value === 'textbook'
      ? { tchapter: key, size: 100 }
      : { module: key, size: 100 }
    const res = await $fetch<{ data: { list: QuizQuestion[], total: number } }>('/api/questions', {
      query,
    })
    if (!res.data.list.length) {
      toast.add({ title: '该分类暂无题目', color: 'warning' })
      return
    }
    emit('startPractice', { title: label, questions: res.data.list })
  }
  catch {
    toast.add({ title: '题目加载失败，请重试', color: 'error' })
  }
  finally {
    starting.value = null
  }
}

async function startRandom() {
  if (starting.value) return
  starting.value = 'random'
  try {
    const res = await $fetch<{ data: QuizQuestion[] }>('/api/questions/random', {
      query: { count: 50 },
    })
    if (!res.data.length) {
      toast.add({ title: '题库暂无题目', color: 'warning' })
      return
    }
    emit('startPractice', { title: '随机 50', questions: res.data })
  }
  catch {
    toast.add({ title: '题目加载失败，请重试', color: 'error' })
  }
  finally {
    starting.value = null
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2" data-mode-tabs>
      <UButton
        v-for="tab in tabs"
        :key="tab.key"
        :icon="tab.icon"
        :color="activeTab === tab.key ? 'primary' : 'neutral'"
        :variant="activeTab === tab.key ? 'solid' : 'outline'"
        :data-tab="tab.key"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </UButton>
    </div>

    <!-- 章节练习：分类卡 -->
    <div v-if="activeTab === 'chapter'" data-panel="chapter">
      <div class="mb-4 flex items-center gap-2" data-groupby-toggle>
        <UButton
          v-for="opt in groupByOptions"
          :key="opt.key"
          size="sm"
          :color="groupBy === opt.key ? 'primary' : 'neutral'"
          :variant="groupBy === opt.key ? 'soft' : 'ghost'"
          :data-groupby="opt.key"
          @click="groupBy = opt.key"
        >
          {{ opt.label }}
        </UButton>
      </div>
      <div v-if="chaptersStatus === 'pending'" class="py-10 text-center text-sm text-muted">
        分类加载中…
      </div>
      <div v-else-if="!chapters.length" class="py-10 text-center text-sm text-muted">
        题库暂无章节数据
      </div>
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="m in chapters"
          :key="m.key"
          class="cursor-pointer transition-shadow hover:shadow-md"
          :data-module="m.key"
          @click="startChapter(m.key, m.label)"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate font-semibold text-highlighted">
                {{ m.label }}
              </p>
              <p class="mt-1 text-sm text-muted">
                共 {{ m.count }} 题 · 即时判分
              </p>
              <p v-if="m.attempted" class="mt-1 text-xs" data-chapter-progress>
                <span class="text-primary">已做 {{ m.attempted }}/{{ m.count }}</span>
                <span class="text-muted"> · 答对 {{ m.correct }}（{{ Math.round(m.correct / m.attempted * 100) }}%）</span>
              </p>
            </div>
            <UButton
              icon="i-lucide-arrow-right"
              color="primary"
              variant="soft"
              :loading="starting === m.key"
            />
          </div>
        </UCard>
      </div>
    </div>

    <!-- 年度套卷：年份列表 -->
    <div v-else-if="activeTab === 'paper'" data-panel="paper">
      <div v-if="yearsStatus === 'pending'" class="py-10 text-center text-sm text-muted">
        年份加载中…
      </div>
      <div v-else-if="!years.length" class="py-10 text-center text-sm text-muted">
        题库暂无套卷数据
      </div>
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="y in years"
          :key="y.year"
          class="cursor-pointer transition-shadow hover:shadow-md"
          :data-year="y.year"
          @click="emit('startPaper', { year: y.year })"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-semibold text-highlighted">
                {{ y.year }} 年真题
              </p>
              <p class="mt-1 text-sm text-muted">
                共 {{ y.count }} 题 · 150 分钟 · 交卷判分
              </p>
            </div>
            <UButton icon="i-lucide-arrow-right" color="primary" variant="soft" />
          </div>
        </UCard>
      </div>
    </div>

    <!-- 随机 50 -->
    <div v-else data-panel="random">
      <UCard>
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p class="font-semibold text-highlighted">
              随机 50 题
            </p>
            <p class="mt-1 text-sm text-muted">
              从全题库随机抽取 50 题（不足则全抽），即时判分，答错自动加入复习队列
            </p>
          </div>
          <UButton
            icon="i-lucide-shuffle"
            color="primary"
            :loading="starting === 'random'"
            data-start-random
            @click="startRandom"
          >
            开始
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
