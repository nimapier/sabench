<script setup lang="ts">
import type { QuizPaperDetail, QuizQuestion } from '#shared/quiz'

const props = defineProps<{
  year: string
}>()

const emit = defineEmits<{
  exit: []
}>()

const toast = useToast()
const TOTAL_SEC = 150 * 60

const { data, status, error } = await useFetch<{ data: QuizQuestion[] }>('/api/questions/paper', {
  query: { year: props.year },
})
if (error.value) {
  toast.add({ title: '套卷加载失败', color: 'error' })
  emit('exit')
}
const questions = computed(() => data.value?.data ?? [])

// ---------- 作答状态 ----------
const idx = ref(0)
const answers = ref<Record<number, string>>({})
const marked = ref<Set<number>>(new Set())
const submitted = ref(false)
const submitting = ref(false)
const confirmOpen = ref(false)
const score = ref(0)
const detail = ref<QuizPaperDetail[]>([])

const current = computed(() => questions.value[idx.value])
const total = computed(() => questions.value.length)
const answeredCount = computed(() => Object.keys(answers.value).length)
const unansweredCount = computed(() => total.value - answeredCount.value)
const accuracy = computed(() => (total.value ? Math.round((score.value / total.value) * 100) : 0))

const detailRows = computed(() => detail.value.map((d) => {
  const q = questions.value.find(item => item.id === d.questionId)
  return { ...d, question: q, choice: answers.value[d.questionId] ?? null }
}))

function choose(letter: string) {
  if (submitted.value || !current.value) return
  answers.value = { ...answers.value, [current.value.id]: letter }
}

function toggleMark() {
  if (!current.value || submitted.value) return
  const next = new Set(marked.value)
  if (next.has(current.value.id)) next.delete(current.value.id)
  else next.add(current.value.id)
  marked.value = next
}

function jump(i: number) {
  if (i >= 0 && i < total.value) idx.value = i
}

function cellClass(q: QuizQuestion, i: number) {
  const base = 'flex h-8 w-full items-center justify-center rounded text-xs font-medium transition-colors'
  const parts = [base]
  if (answers.value[q.id]) parts.push('bg-primary text-white')
  else parts.push('bg-elevated text-muted hover:bg-accented')
  if (marked.value.has(q.id)) parts.push('ring-2 ring-amber-500')
  if (i === idx.value) parts.push('outline outline-2 outline-offset-1 outline-highlighted')
  return parts.join(' ')
}

// ---------- 倒计时（语义同写作器：≤30min 琥珀，≤15min 红） ----------
const remaining = ref(TOTAL_SEC)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value -= 1
      if (remaining.value === 0) submitPaper()
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function formatSec(t: number) {
  const m = String(Math.floor(t / 60)).padStart(2, '0')
  const s = String(t % 60).padStart(2, '0')
  return `${m}:${s}`
}

const initialTimeText = formatSec(TOTAL_SEC)
const timeText = computed(() => formatSec(remaining.value))
const timerClass = computed(() => {
  if (remaining.value <= 15 * 60) return 'text-red-500'
  if (remaining.value <= 30 * 60) return 'text-amber-500'
  return 'text-highlighted'
})

// ---------- 交卷 ----------
async function submitPaper() {
  if (submitted.value || submitting.value) return
  submitting.value = true
  confirmOpen.value = false
  try {
    const body: Record<string, unknown> = {
      year: props.year,
      answers: Object.fromEntries(Object.entries(answers.value).map(([k, v]) => [k, v])),
      durationSec: TOTAL_SEC - remaining.value,
    }
    const res = await $fetch<{ data: { score: number, total: number, detail: QuizPaperDetail[] } }>(
      '/api/questions/paper/submit',
      { method: 'POST', body },
    )
    score.value = res.data.score
    detail.value = res.data.detail
    submitted.value = true
  }
  catch {
    toast.add({ title: '交卷失败，请重试', color: 'error' })
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- 成绩页 -->
    <div v-if="submitted" class="space-y-4" data-paper-result>
      <UCard>
        <div class="text-center space-y-3 py-4">
          <UIcon name="i-lucide-award" class="size-10 text-primary mx-auto" />
          <h2 class="text-xl font-bold text-highlighted">
            {{ year }} 年套卷成绩
          </h2>
          <p class="text-2xl font-bold" data-paper-score>
            {{ score }}<span class="text-base font-normal text-muted"> / {{ total }}</span>
          </p>
          <p class="text-sm text-muted" data-paper-accuracy>
            正确率 {{ accuracy }}% · 错题已加入复习队列
          </p>
          <UButton color="primary" variant="outline" icon="i-lucide-arrow-left" data-back-to-modes @click="emit('exit')">
            返回模式选择
          </UButton>
        </div>
      </UCard>

      <div class="space-y-3 overflow-y-auto" data-paper-review>
        <UCard v-for="(row, i) in detailRows" :key="row.questionId" :data-review-item="row.questionId">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <UBadge :color="row.correct ? 'success' : 'error'">
                {{ i + 1 }}. {{ row.correct ? '正确' : '错误' }}
              </UBadge>
              <span class="text-xs text-muted">
                你的答案：{{ row.choice ?? '未答' }} · 正确答案：{{ row.answer }}
              </span>
            </div>
            <p class="text-sm leading-6 text-default whitespace-pre-wrap">
              {{ row.question?.stem }}
            </p>
            <div v-if="row.question?.images?.length" class="space-y-2">
              <img
                v-for="img in row.question.images"
                :key="img"
                :src="img"
                alt="题图"
                class="max-w-full rounded-md border border-default bg-white p-1"
              >
            </div>
            <div v-if="row.analysis" class="rounded-lg bg-elevated p-3 text-sm leading-6 text-default whitespace-pre-wrap">
              {{ row.analysis }}
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- 作答中 -->
    <template v-else>
      <UCard>
        <div class="flex items-center gap-4 flex-wrap">
          <UBadge color="primary" variant="subtle">
            {{ year }} 年套卷
          </UBadge>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-timer" class="size-5 text-muted" />
            <span
              class="text-2xl font-mono font-bold tabular-nums"
              :class="timerClass"
              data-timer
            ><ClientOnly>{{ timeText }}<template #fallback>{{ initialTimeText }}</template></ClientOnly></span>
          </div>
          <span class="text-sm text-muted" data-answered-count>
            已答 {{ answeredCount }}/{{ total }}
          </span>
          <UButton
            class="ml-auto"
            color="primary"
            icon="i-lucide-send"
            :loading="submitting"
            data-submit-paper
            @click="confirmOpen = true"
          >
            交卷
          </UButton>
        </div>
      </UCard>

      <div v-if="status === 'pending'" class="py-10 text-center text-sm text-muted">
        套卷加载中…
      </div>

      <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div class="space-y-4">
          <UCard v-if="current">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="leading-7 text-default whitespace-pre-wrap" data-stem>
                  {{ idx + 1 }}. {{ current.stem }}
                </p>
                <div v-if="current.images?.length" class="mt-3 space-y-2">
                  <img
                    v-for="img in current.images"
                    :key="img"
                    :src="img"
                    alt="题图"
                    class="max-w-full rounded-md border border-default bg-white p-1"
                  >
                </div>
              </div>
              <UButton
                :icon="marked.has(current.id) ? 'i-lucide-flag' : 'i-lucide-flag-off'"
                :color="marked.has(current.id) ? 'warning' : 'neutral'"
                variant="ghost"
                size="sm"
                data-toggle-mark
                @click="toggleMark"
              >
                {{ marked.has(current.id) ? '取消标记' : '标记回头' }}
              </UButton>
            </div>
          </UCard>

          <QuizOptionList
            v-if="current"
            :options="current.options"
            :selected="answers[current.id] ?? null"
            :reveal="null"
            @select="choose"
          />

          <div class="flex justify-between">
            <UButton color="neutral" variant="outline" icon="i-lucide-arrow-left" :disabled="idx === 0" @click="jump(idx - 1)">
              上一题
            </UButton>
            <UButton color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right" :disabled="idx >= total - 1" @click="jump(idx + 1)">
              下一题
            </UButton>
          </div>
        </div>

        <!-- 题号网格 -->
        <UCard class="self-start lg:sticky lg:top-20">
          <template #header>
            <div class="flex items-center justify-between text-xs text-muted">
              <span>题号</span>
              <span class="flex items-center gap-2">
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-primary" />已答</span>
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-elevated ring-1 ring-default" />未答</span>
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-elevated ring-2 ring-amber-500" />标记</span>
              </span>
            </div>
          </template>
          <div class="grid grid-cols-5 gap-1.5" data-question-grid>
            <button
              v-for="(q, i) in questions"
              :key="q.id"
              type="button"
              :class="cellClass(q, i)"
              :data-cell="i + 1"
              @click="jump(i)"
            >
              {{ i + 1 }}
            </button>
          </div>
        </UCard>
      </div>
    </template>

    <!-- 交卷二次确认 -->
    <UModal v-model:open="confirmOpen" title="确认交卷？" :ui="{ footer: 'justify-end' }">
      <template #body>
        <p class="text-sm text-default" data-confirm-text>
          已答 {{ answeredCount }} 题<template v-if="unansweredCount">
            ，还有 <b class="text-error">{{ unansweredCount }}</b> 题未作答（未答按错误计）
          </template>。确定交卷吗？
        </p>
      </template>
      <template #footer>
        <UButton color="neutral" variant="ghost" @click="confirmOpen = false">
          继续作答
        </UButton>
        <UButton color="primary" :loading="submitting" data-confirm-submit @click="submitPaper">
          确认交卷
        </UButton>
      </template>
    </UModal>
  </div>
</template>
