<script setup lang="ts">
import { PLAN_START_DATE } from '#shared/plan'

interface WeekTaskRow {
  id: number
  week: number
  category: string
  content: string
  done: boolean
  sortOrder: number
}

interface WeekGroup {
  week: number
  tasks: WeekTaskRow[]
}

const DAY_MS = 24 * 60 * 60 * 1000

const { data, status } = await useFetch<{ data: WeekGroup[] }>('/api/plan')
const { data: stats } = await useFetch<{ data: { currentWeek: number } }>('/api/stats')

const currentWeek = computed(() => stats.value?.data.currentWeek ?? 1)

// useFetch 的 data 是浅响应，勾选状态用独立 reactive map 承载，保证 checkbox 即时更新
const doneMap = reactive<Record<number, boolean>>({})
watch(data, (d) => {
  for (const g of d?.data ?? []) {
    for (const t of g.tasks) doneMap[t.id] = t.done
  }
}, { immediate: true })

const openWeeks = ref<Set<number>>(new Set())
watch(currentWeek, (w) => {
  if (openWeeks.value.size === 0) openWeeks.value = new Set([w])
}, { immediate: true })

function isOpen(week: number): boolean {
  return openWeeks.value.has(week)
}

function toggleOpen(week: number) {
  const next = new Set(openWeeks.value)
  if (next.has(week)) next.delete(week)
  else next.add(week)
  openWeeks.value = next
}

const startMonday = (() => {
  const d = new Date(`${PLAN_START_DATE}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7))
  return d
})()

function fmt(d: Date): string {
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${m}-${day}`
}

function weekRange(week: number): string {
  const s = new Date(startMonday.getTime() + (week - 1) * 7 * DAY_MS)
  const e = new Date(s.getTime() + 6 * DAY_MS)
  return `${fmt(s)} ~ ${fmt(e)}`
}

function stage(week: number): { label: string, color: 'primary' | 'warning' | 'error' } {
  if (week <= 4) return { label: '基础夯实', color: 'primary' }
  if (week <= 7) return { label: '真题专项', color: 'warning' }
  return { label: '全真冲刺', color: 'error' }
}

function milestoneOf(content: string): string | null {
  return content.match(/里程碑\s*(M\d)/)?.[1] ?? null
}

const orderedGroups = computed<WeekGroup[]>(() => {
  const groups = data.value?.data ?? []
  return [...groups].sort((a, b) => {
    if (a.week === currentWeek.value) return -1
    if (b.week === currentWeek.value) return 1
    return a.week - b.week
  })
})

function doneCount(group: WeekGroup): number {
  return group.tasks.filter(t => doneMap[t.id]).length
}

async function toggle(task: WeekTaskRow, done: boolean) {
  const prev = doneMap[task.id] ?? false
  doneMap[task.id] = done
  try {
    await $fetch('/api/plan/toggle', {
      method: 'POST',
      body: { id: task.id, done },
    })
  }
  catch {
    doneMap[task.id] = prev
  }
}
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold">
      12 周备考计划
    </h1>

    <div v-if="status === 'pending'" class="text-sm text-muted">
      加载中…
    </div>

    <template v-else>
      <div v-for="group in orderedGroups" :key="group.week" :data-week="group.week">
        <UCard :class="group.week === currentWeek ? 'ring-2 ring-primary' : ''">
          <template #header>
            <button
              type="button"
              class="flex w-full items-center gap-2 cursor-pointer text-left"
              @click="toggleOpen(group.week)"
            >
              <span class="text-muted text-xs w-4">{{ isOpen(group.week) ? '▼' : '▶' }}</span>
              <span class="font-semibold">
                W{{ group.week }}（{{ weekRange(group.week) }}）
              </span>
              <UBadge :color="stage(group.week).color" variant="subtle">
                {{ stage(group.week).label }}
              </UBadge>
              <UBadge v-if="group.week === currentWeek" color="primary">
                当前周
              </UBadge>
              <span class="ml-auto text-sm text-muted">
                {{ doneCount(group) }}/{{ group.tasks.length }}
              </span>
            </button>
          </template>

          <div v-show="isOpen(group.week)" class="space-y-3">
            <UProgress
              :model-value="doneCount(group)"
              :max="group.tasks.length"
              size="sm"
            />
            <div v-for="task in group.tasks" :key="task.id" class="flex items-start gap-2">
              <UCheckbox
                :model-value="doneMap[task.id] ?? false"
                @update:model-value="toggle(task, $event)"
              >
                <template #label>
                  <span :class="doneMap[task.id] ? 'line-through text-muted' : ''">
                    <UBadge variant="subtle" color="neutral" class="mr-1">
                      {{ task.category }}
                    </UBadge>
                    {{ task.content }}
                  </span>
                  <UBadge
                    v-if="milestoneOf(task.content)"
                    color="error"
                    class="ml-1"
                  >
                    {{ milestoneOf(task.content) }}
                  </UBadge>
                </template>
              </UCheckbox>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </div>
</template>
