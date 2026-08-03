<script setup lang="ts">
interface ReviewItem {
  questionId: number
  stem: string
  options: Record<string, string>
  chapter: string
  level: number
  streak: number
  dueDate: string
}

interface ReviewStats {
  dueToday: number
  inQueue: number
  graduated: number
}

interface GradeData {
  correct: boolean
  answer: string
  analysis: string
}

interface ScheduleData {
  correct: boolean
  answer: string
  analysis: string
  level: number
  streak: number
  dueDate: string
  graduated: boolean
}

interface CardState {
  chosen: string | null
  grade: GradeData | null
  schedule: ScheduleData | null
  submitting: boolean
  reasonOpen: boolean
  reason: string
  reasonSubmitting: boolean
}

const ERROR_REASONS = ['概念不清', '审题失误', '计算错误'] as const

const { data: todayData } = await useFetch<{ data: ReviewItem[] }>('/api/review/today')
const { data: statsData, refresh: refreshStats } = await useFetch<{ data: ReviewStats }>('/api/review/stats')

const queue = ref<ReviewItem[]>([...(todayData.value?.data ?? [])])
const stats = computed(() => statsData.value?.data ?? null)
const answeredCount = ref(0)

const cardStates = reactive<Record<number, CardState>>({})
function stateOf(item: ReviewItem): CardState {
  if (!cardStates[item.questionId]) {
    cardStates[item.questionId] = {
      chosen: null,
      grade: null,
      schedule: null,
      submitting: false,
      reasonOpen: false,
      reason: '',
      reasonSubmitting: false,
    }
  }
  return cardStates[item.questionId]
}

function todayString(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function daysFromToday(dateStr: string): number {
  const [y = 1970, m = 1, d = 1] = dateStr.split('-').map(Number)
  const target = new Date(y, m - 1, d).getTime()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return Math.round((target - today) / 86400000)
}

function dueBadge(item: ReviewItem): { label: string, color: 'warning' | 'error' } {
  return item.dueDate < todayString()
    ? { label: '逾期', color: 'error' }
    : { label: '今天到期', color: 'warning' }
}

function optionClass(item: ReviewItem, key: string): string {
  const st = stateOf(item)
  if (!st.grade) {
    return 'border-(--ui-border) hover:border-(--ui-primary) cursor-pointer'
  }
  if (key === st.grade.answer) {
    return 'border-(--ui-success) bg-(--ui-success)/10'
  }
  if (key === st.chosen) {
    return 'border-(--ui-error) bg-(--ui-error)/10'
  }
  return 'border-(--ui-border) opacity-60'
}

function nextLabel(item: ReviewItem): string {
  const st = stateOf(item)
  const sc = st.schedule
  if (!sc) return ''
  if (sc.graduated) return '已毕业 🎓'
  if (sc.correct) return `已掌握，${daysFromToday(sc.dueDate)} 天后复习`
  return '明天再来'
}

// 判分分两步：先 /api/questions/answer 按选项判分（客户端无法预知对错，/result 契约需要 correct 布尔），
// 再 /api/review/[id]/result 推进 SM-2。答错时第二发等错因弹窗提交后再发，携带 errorReason。
async function choose(item: ReviewItem, key: string) {
  const st = stateOf(item)
  if (st.grade || st.submitting) return
  st.chosen = key
  st.submitting = true
  try {
    const gradeRes = await $fetch<{ data: GradeData }>('/api/questions/answer', {
      method: 'POST',
      body: { questionId: item.questionId, choice: key },
    })
    st.grade = gradeRes.data
    if (gradeRes.data.correct) {
      const res = await $fetch<{ data: ScheduleData }>(`/api/review/${item.questionId}/result`, {
        method: 'POST',
        body: { correct: true },
      })
      st.schedule = res.data
      await refreshStats()
    }
    else {
      st.reason = ''
      st.reasonOpen = true
    }
  }
  finally {
    st.submitting = false
  }
}

async function submitReason(item: ReviewItem) {
  const st = stateOf(item)
  if (!st.reason || st.reasonSubmitting) return
  st.reasonSubmitting = true
  try {
    const res = await $fetch<{ data: ScheduleData }>(`/api/review/${item.questionId}/result`, {
      method: 'POST',
      body: { correct: false, errorReason: st.reason },
    })
    st.schedule = res.data
    st.reasonOpen = false
    await refreshStats()
  }
  finally {
    st.reasonSubmitting = false
  }
}

function nextCard(item: ReviewItem) {
  queue.value = queue.value.filter(q => q.questionId !== item.questionId)
  answeredCount.value++
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        错题复习
      </h1>
      <div v-if="stats" class="flex items-center gap-3 text-sm text-(--ui-text-muted)">
        <span>今日到期 <span class="font-semibold text-(--ui-text)">{{ stats.dueToday }}</span></span>
        <span>·</span>
        <span>在队 <span class="font-semibold text-(--ui-text)">{{ stats.inQueue }}</span></span>
        <span>·</span>
        <span>已毕业 <span class="font-semibold text-(--ui-text)">{{ stats.graduated }}</span></span>
      </div>
    </div>

    <!-- 空状态：无到期且尚未作答 -->
    <UCard v-if="queue.length === 0 && answeredCount === 0">
      <div class="flex flex-col items-center gap-4 py-10 text-center">
        <UIcon name="i-lucide-coffee" class="text-4xl text-(--ui-text-muted)" />
        <div class="space-y-1">
          <p class="font-medium">
            今天没有到期的错题
          </p>
          <p class="text-sm text-(--ui-text-muted)">
            答错的选择题会自动进入复习队列，按 1/3/7/15 天间隔提醒你复习
          </p>
        </div>
        <UButton to="/quiz" icon="i-lucide-pencil-line">
          去刷题
        </UButton>
      </div>
    </UCard>

    <!-- 全部完成 -->
    <UCard v-else-if="queue.length === 0">
      <div class="flex flex-col items-center gap-4 py-10 text-center">
        <UIcon name="i-lucide-check-circle-2" class="text-4xl text-(--ui-success)" />
        <div class="space-y-1">
          <p class="font-medium">
            今日复习完成
          </p>
          <p class="text-sm text-(--ui-text-muted)">
            共复习 {{ answeredCount }} 题，明天记得回来看新到期的错题
          </p>
        </div>
        <UButton to="/quiz" variant="soft" icon="i-lucide-pencil-line">
          去刷题
        </UButton>
      </div>
    </UCard>

    <!-- 到期卡片流 -->
    <UCard v-for="item in queue" :key="item.questionId">
      <div class="space-y-4">
        <div class="flex items-center gap-2 flex-wrap">
          <UBadge color="primary" variant="subtle">
            {{ item.chapter }}
          </UBadge>
          <UBadge color="neutral" variant="subtle">
            第 {{ item.level + 1 }} 次复习
          </UBadge>
          <UBadge :color="dueBadge(item).color" variant="subtle">
            {{ dueBadge(item).label }}
          </UBadge>
        </div>

        <p class="whitespace-pre-wrap leading-relaxed">
          {{ item.stem }}
        </p>

        <div class="space-y-2">
          <div
            v-for="(text, key) in item.options"
            :key="key"
            class="flex items-start gap-3 rounded-lg border px-4 py-3 transition-colors"
            :class="optionClass(item, key)"
            @click="choose(item, key)"
          >
            <span class="font-semibold shrink-0">{{ key }}.</span>
            <span>{{ text }}</span>
          </div>
        </div>

        <template v-if="stateOf(item).grade">
          <div class="rounded-lg bg-(--ui-bg-elevated) px-4 py-3 space-y-2">
            <p class="text-sm">
              <span class="font-semibold">正确答案：</span>
              <span class="font-semibold text-(--ui-success)">{{ stateOf(item).grade!.answer }}</span>
            </p>
            <p class="text-sm whitespace-pre-wrap text-(--ui-text-muted)">
              {{ stateOf(item).grade!.analysis }}
            </p>
          </div>

          <div v-if="stateOf(item).schedule" class="flex items-center justify-between gap-3">
            <p
              class="text-sm font-medium"
              :class="stateOf(item).schedule!.graduated
                ? 'text-(--ui-success)'
                : stateOf(item).schedule!.correct ? 'text-(--ui-primary)' : 'text-(--ui-warning)'"
            >
              {{ nextLabel(item) }}
            </p>
            <UButton size="sm" @click="nextCard(item)">
              下一题
            </UButton>
          </div>
          <p v-else class="text-sm text-(--ui-text-muted)">
            请先选择错因…
          </p>
        </template>
      </div>
    </UCard>

    <!-- 错因弹窗（必选，不可跳过） -->
    <UModal
      v-for="item in queue"
      :key="`reason-${item.questionId}`"
      :open="stateOf(item).reasonOpen"
      title="选一下错因"
      :dismissible="false"
      :close="false"
      :ui="{ footer: 'justify-end' }"
      @update:open="stateOf(item).reasonOpen = $event"
    >
      <template #body>
        <div class="space-y-3">
          <p class="text-sm text-(--ui-text-muted)">
            这题为什么错？选一个最贴近的原因（必选）
          </p>
          <div class="flex flex-col gap-2">
            <UButton
              v-for="r in ERROR_REASONS"
              :key="r"
              :variant="stateOf(item).reason === r ? 'solid' : 'outline'"
              :color="stateOf(item).reason === r ? 'primary' : 'neutral'"
              block
              @click="stateOf(item).reason = r"
            >
              {{ r }}
            </UButton>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton
          :disabled="!stateOf(item).reason"
          :loading="stateOf(item).reasonSubmitting"
          @click="submitReason(item)"
        >
          提交
        </UButton>
      </template>
    </UModal>
  </div>
</template>
