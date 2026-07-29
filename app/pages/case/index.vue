<script setup lang="ts">
import { CASE_TYPES } from '#shared/constants'

interface CaseItem {
  id: number
  year: string
  caseType: string
  title: string
  attemptCount: number
  bestScore: number | null
}

const activeType = ref<string>('全部')

const { data: casesData, status } = await useFetch<{ data: CaseItem[] }>('/api/cases', {
  query: {
    caseType: computed(() => activeType.value === '全部' ? undefined : activeType.value),
  },
})

const cases = computed(() => casesData.value?.data ?? [])

const tabs = computed(() => ['全部', ...CASE_TYPES])

type BadgeColor = 'neutral' | 'error' | 'warning' | 'success'

function scoreBadge(item: CaseItem): { color: BadgeColor, label: string } {
  if (item.attemptCount === 0 || item.bestScore == null) {
    return { color: 'neutral', label: '未做' }
  }
  const pct = `${Math.round(item.bestScore * 100)}%`
  if (item.bestScore < 0.45) return { color: 'error', label: pct }
  if (item.bestScore <= 0.75) return { color: 'warning', label: pct }
  return { color: 'success', label: pct }
}
</script>

<template>
  <div class="p-8 max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <h1 class="text-2xl font-bold">
        案例题库
      </h1>
      <UButton to="/case/cards" variant="outline" icon="i-lucide-layers">
        框架卡速查
      </UButton>
    </div>

    <div class="flex items-center gap-2 mb-6 flex-wrap">
      <UButton
        v-for="tab in tabs"
        :key="tab"
        size="sm"
        :color="activeType === tab ? 'primary' : 'neutral'"
        :variant="activeType === tab ? 'solid' : 'subtle'"
        @click="activeType = tab"
      >
        {{ tab }}
      </UButton>
    </div>

    <div v-if="status === 'pending'" class="text-center text-gray-400 py-16">
      加载中…
    </div>

    <div v-else-if="!cases.length" class="text-center text-gray-400 py-16">
      <UIcon name="i-lucide-inbox" class="text-4xl mb-3" />
      <p>暂无题目</p>
      <p class="text-sm mt-1">
        题目通过导入接口（POST /api/cases）添加，导入后会显示在这里
      </p>
    </div>

    <div v-else class="flex flex-col gap-3">
      <UCard
        v-for="item in cases"
        :key="item.id"
        class="cursor-pointer hover:ring-2 hover:ring-primary/40 transition-shadow"
        @click="navigateTo(`/case/${item.id}`)"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <UBadge color="neutral" variant="subtle">
                {{ item.year }}
              </UBadge>
              <UBadge color="primary" variant="subtle">
                {{ item.caseType }}
              </UBadge>
              <span class="font-medium truncate">{{ item.title }}</span>
            </div>
            <div class="text-sm text-gray-500 mt-1">
              作答 {{ item.attemptCount }} 次
            </div>
          </div>
          <UBadge
            :color="scoreBadge(item).color"
            :variant="scoreBadge(item).color === 'neutral' ? 'subtle' : 'solid'"
            class="shrink-0"
          >
            {{ scoreBadge(item).label }}
          </UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>
