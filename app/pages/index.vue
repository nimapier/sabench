<script setup lang="ts">
interface Stats {
  projects: number
  essaysTotal: number
  essaysDone: number
  versions: number
  minutesWeek: number
  tasksDone: number
  tasksTotal: number
  currentWeek: number
}

interface CaseStat {
  caseType: string
  attempts: number
  avgScore: number | null
  bestScore: number | null
}

interface PlanTask {
  id: number
  week: number
  category: string
  content: string
  done: boolean
  sortOrder: number
}

interface PlanWeek {
  week: number
  tasks: PlanTask[]
}

const EXAM_DATE = new Date('2026-10-24T00:00:00+08:00')
const DAY_MS = 24 * 60 * 60 * 1000

const { data: stats, refresh: refreshStats } = await useFetch<{ data: Stats }>('/api/stats')
const { data: plan } = await useFetch<{ data: PlanWeek[] }>('/api/plan')
const { data: caseStats } = await useFetch<{ data: CaseStat[] }>('/api/cases/stats')

function caseBarColor(avg: number | null): string {
  if (avg == null) return 'bg-muted'
  if (avg < 0.45) return 'bg-error'
  if (avg <= 0.75) return 'bg-warning'
  return 'bg-success'
}

function caseSummary(stat: CaseStat): string {
  if (stat.avgScore == null) return '未练'
  return `${stat.attempts} 次 · 均 ${Math.round(stat.avgScore * 100)}%`
}

const daysLeft = computed(() => Math.max(0, Math.ceil((EXAM_DATE.getTime() - Date.now()) / DAY_MS)))

const studyTime = computed(() => {
  const minutes = stats.value?.data.minutesWeek ?? 0
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
})

const essayProgress = computed(() => `${stats.value?.data.essaysDone ?? 0}/8`)

const projectCount = computed(() => `${stats.value?.data.projects ?? 0}`)

const taskRate = computed(() => {
  const total = stats.value?.data.tasksTotal ?? 0
  if (total === 0) return '0%'
  return `${Math.round(((stats.value?.data.tasksDone ?? 0) / total) * 100)}%`
})

const statCards = computed(() => [
  { label: '本周学习时长', value: studyTime.value, icon: 'i-lucide-clock' },
  { label: '论文进度', value: essayProgress.value, icon: 'i-lucide-file-text' },
  { label: '项目背景数', value: projectCount.value, icon: 'i-lucide-folder' },
  { label: '本周任务完成率', value: taskRate.value, icon: 'i-lucide-check-circle' },
])

// 与 plan.vue 一致：week_task 无 milestone 列，从 content 正则派生
function milestoneOf(content: string): string | null {
  return content.match(/里程碑\s*(M\d)/)?.[1] ?? null
}

const currentWeek = computed(() => stats.value?.data.currentWeek ?? 1)
const currentTasks = computed<PlanTask[]>(() => {
  const week = plan.value?.data.find(w => w.week === currentWeek.value)
  return week?.tasks ?? []
})

async function toggleTask(task: PlanTask, done: boolean | 'indeterminate') {
  const next = done === true
  const prev = task.done
  task.done = next // 乐观更新
  try {
    await $fetch('/api/plan/toggle', { method: 'POST', body: { id: task.id, done: next } })
    await refreshStats()
  }
  catch {
    task.done = prev // 回滚
  }
}

const quickLinks = [
  { label: '去写论文', to: '/essay', icon: 'i-lucide-pen-line' },
  { label: '维护项目背景', to: '/essay/bg', icon: 'i-lucide-folder-cog' },
  { label: '看完整计划', to: '/plan', icon: 'i-lucide-calendar' },
  { label: '练案例', to: '/case', icon: 'i-lucide-book-open-check' },
]
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6 p-4 py-8">
    <UAlert
      color="primary"
      variant="subtle"
      icon="i-lucide-calendar-clock"
      :title="`距 2026-10-24 考试还剩 ${daysLeft} 天`"
      :description="`当前第 ${currentWeek} 周 / 共 12 周，保持节奏。`"
    />

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <UCard v-for="card in statCards" :key="card.label" data-stat-card>
        <div class="flex items-center gap-3">
          <UIcon :name="card.icon" class="size-8 text-primary" />
          <div>
            <p class="text-sm text-muted">
              {{ card.label }}
            </p>
            <p class="text-2xl font-bold text-highlighted" data-stat-value>
              {{ card.value }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-highlighted">
            本周任务（第 {{ currentWeek }} 周）
          </h2>
          <UBadge color="neutral" variant="subtle">
            {{ currentTasks.filter(t => t.done).length }}/{{ currentTasks.length }} 已完成
          </UBadge>
        </div>
      </template>
      <ul v-if="currentTasks.length" class="divide-y divide-default">
        <li
          v-for="task in currentTasks"
          :key="task.id"
          class="flex items-start gap-3 py-3"
        >
          <UCheckbox
            :model-value="task.done"
            class="mt-0.5"
            @update:model-value="toggleTask(task, $event)"
          />
          <div class="min-w-0">
            <p
              class="text-sm"
              :class="task.done ? 'text-muted line-through' : 'text-default'"
            >
              {{ task.content }}
            </p>
            <div class="mt-1 flex items-center gap-2">
              <UBadge size="sm" color="neutral" variant="outline">
                {{ task.category }}
              </UBadge>
              <UBadge v-if="milestoneOf(task.content)" size="sm" color="error" variant="subtle">
                {{ milestoneOf(task.content) }}
              </UBadge>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="py-4 text-center text-sm text-muted">
        本周暂无任务
      </p>
    </UCard>

    <UCard data-case-stats>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-highlighted">
            案例训练
          </h2>
          <UButton to="/case" size="sm" variant="link" color="primary" trailing-icon="i-lucide-arrow-right">
            去练题
          </UButton>
        </div>
      </template>
      <ul class="space-y-3">
        <li
          v-for="stat in caseStats?.data ?? []"
          :key="stat.caseType"
          class="flex items-center gap-3"
          data-case-row
        >
          <span class="w-28 shrink-0 text-sm text-default" data-case-type>{{ stat.caseType }}</span>
          <div class="h-2 min-w-0 flex-1 rounded-full bg-elevated">
            <div
              class="h-full rounded-full"
              :class="caseBarColor(stat.avgScore)"
              :style="{ width: `${(stat.avgScore ?? 0) * 100}%` }"
              data-case-bar
            />
          </div>
          <span class="w-28 shrink-0 text-right text-sm text-muted" data-case-summary>
            {{ caseSummary(stat) }}
          </span>
        </li>
      </ul>
    </UCard>

    <div class="flex flex-wrap gap-3">
      <UButton
        v-for="link in quickLinks"
        :key="link.to"
        :to="link.to"
        :icon="link.icon"
        size="lg"
        variant="outline"
        color="neutral"
      >
        {{ link.label }}
      </UButton>
    </div>
  </div>
</template>
