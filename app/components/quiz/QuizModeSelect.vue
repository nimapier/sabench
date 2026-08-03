<script setup lang="ts">
import type { QuizQuestion } from '#shared/quiz'

const emit = defineEmits<{
  startPractice: [payload: { title: string, questions: QuizQuestion[] }]
  startPaper: [payload: { year: string }]
}>()

const toast = useToast()

interface ModuleRow { chapter: string, count: number }
interface YearRow { year: string, count: number }

const { data: modulesData, status: modulesStatus } = await useFetch<{ data: ModuleRow[] }>('/api/questions/modules')
const { data: yearsData, status: yearsStatus } = await useFetch<{ data: YearRow[] }>('/api/questions/years')

const modules = computed(() => modulesData.value?.data ?? [])
const years = computed(() => (yearsData.value?.data ?? []).filter(y => y.year !== 'mock'))

const tabs = [
  { key: 'chapter', label: '章节练习', icon: 'i-lucide-book-open' },
  { key: 'paper', label: '年度套卷', icon: 'i-lucide-file-clock' },
  { key: 'random', label: '随机 50', icon: 'i-lucide-shuffle' },
]
const activeTab = ref('chapter')

const starting = ref<string | null>(null)

async function startChapter(chapter: string) {
  if (starting.value) return
  starting.value = chapter
  try {
    const res = await $fetch<{ data: { list: QuizQuestion[], total: number } }>('/api/questions', {
      query: { module: chapter, size: 100 },
    })
    if (!res.data.list.length) {
      toast.add({ title: '该模块暂无题目', color: 'warning' })
      return
    }
    emit('startPractice', { title: chapter, questions: res.data.list })
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

    <!-- 章节练习：模块卡 -->
    <div v-if="activeTab === 'chapter'" data-panel="chapter">
      <div v-if="modulesStatus === 'pending'" class="py-10 text-center text-sm text-muted">
        模块加载中…
      </div>
      <div v-else-if="!modules.length" class="py-10 text-center text-sm text-muted">
        题库暂无章节数据
      </div>
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="m in modules"
          :key="m.chapter"
          class="cursor-pointer transition-shadow hover:shadow-md"
          :data-module="m.chapter"
          @click="startChapter(m.chapter)"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate font-semibold text-highlighted">
                {{ m.chapter }}
              </p>
              <p class="mt-1 text-sm text-muted">
                共 {{ m.count }} 题 · 即时判分
              </p>
            </div>
            <UButton
              icon="i-lucide-arrow-right"
              color="primary"
              variant="soft"
              :loading="starting === m.chapter"
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
