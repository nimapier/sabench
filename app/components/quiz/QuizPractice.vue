<script setup lang="ts">
import type { QuizGradeResult, QuizQuestion } from '#shared/quiz'

const props = defineProps<{
  title: string
  questions: QuizQuestion[]
  sessionKey?: string
  resumeFilter?: { tchapter?: string, module?: string }
}>()

const emit = defineEmits<{
  exit: []
}>()

const toast = useToast()

const ERROR_REASONS = ['概念不清', '审题失误', '计算错误'] as const

interface PracticeRecord {
  choice: string
  correct: boolean
  answer: string
  analysis: string | null
}

interface PracticeSession {
  ids: number[]
  idx: number
  correct: number
  ts: number
  records?: Record<number, PracticeRecord>
}

const storageKey = computed(() => `quiz-practice:${props.sessionKey ?? props.title}`)

function loadSession(): PracticeSession | null {
  if (!import.meta.client) return null
  try {
    const raw = localStorage.getItem(storageKey.value)
    if (!raw) return null
    const s = JSON.parse(raw) as PracticeSession
    const ids = props.questions.map(q => q.id)
    if (!Array.isArray(s.ids) || s.ids.length !== ids.length || s.ids.some((id, i) => id !== ids[i])) return null
    if (typeof s.idx !== 'number' || s.idx <= 0 || s.idx >= ids.length) return null
    // records 校验保持宽松：缺失/损坏时降级为仅恢复 idx/correct
    if (!s.records || typeof s.records !== 'object' || Array.isArray(s.records)) {
      s.records = undefined
    }
    return s
  }
  catch {
    return null
  }
}

function saveSession() {
  if (!import.meta.client) return
  const s: PracticeSession = {
    ids: props.questions.map(q => q.id),
    idx: idx.value,
    correct: correctCount.value,
    ts: Date.now(),
    records: records.value,
  }
  localStorage.setItem(storageKey.value, JSON.stringify(s))
}

function clearSession() {
  if (!import.meta.client) return
  localStorage.removeItem(storageKey.value)
}

const idx = ref(0)
const selected = ref<string | null>(null)
const grading = ref(false)
const result = ref<QuizGradeResult | null>(null)
const correctCount = ref(0)
const records = ref<Record<number, PracticeRecord>>({})
const reasons = ref<Record<number, string>>({})
const reasonOpen = ref(false)
const finished = ref(false)
const resumeOffer = ref<PracticeSession | null>(null)
const dbOffer = ref<{ idx: number, done: number } | null>(null)
const prior = ref<Record<number, boolean>>({})

onMounted(async () => {
  const s = loadSession()
  if (s) {
    resumeOffer.value = s
    return
  }
  if (!props.resumeFilter) return
  try {
    const res = await $fetch<{ data: Array<{ id: number, correct: boolean }> }>('/api/questions/attempted', { query: props.resumeFilter })
    if (!res.data.length) return
    prior.value = Object.fromEntries(res.data.map(r => [r.id, r.correct]))
    const firstNew = props.questions.findIndex(q => !(q.id in prior.value))
    if (firstNew > 0) {
      dbOffer.value = { idx: firstNew, done: props.questions.slice(0, firstNew).filter(q => q.id in prior.value).length }
    }
  }
  catch {
    // DB 兜底失败不阻塞正常刷题
  }
})

function resumeFromDb() {
  if (!dbOffer.value) return
  idx.value = dbOffer.value.idx
  dbOffer.value = null
  saveSession()
}

function restartFromDb() {
  dbOffer.value = null
}

function resumeSession() {
  if (!resumeOffer.value) return
  idx.value = resumeOffer.value.idx
  correctCount.value = resumeOffer.value.correct
  records.value = resumeOffer.value.records ?? {}
  resumeOffer.value = null
}

function restartSession() {
  resumeOffer.value = null
  clearSession()
  idx.value = 0
  correctCount.value = 0
  records.value = {}
  selected.value = null
  result.value = null
}

const current = computed(() => props.questions[idx.value])
const total = computed(() => props.questions.length)
const isLast = computed(() => idx.value >= total.value - 1)
const accuracy = computed(() => (total.value ? Math.round((correctCount.value / total.value) * 100) : 0))
const wrongCount = computed(() => total.value - correctCount.value)

const reveal = computed(() => {
  if (!result.value || !selected.value) return null
  return { answer: result.value.answer.trim().toUpperCase(), choice: selected.value }
})

async function choose(letter: string) {
  if (result.value || grading.value || !current.value) return
  selected.value = letter
  grading.value = true
  try {
    const res = await $fetch<{ data: QuizGradeResult }>('/api/questions/answer', {
      method: 'POST',
      body: { questionId: current.value.id, choice: letter },
    })
    result.value = res.data
    records.value = {
      ...records.value,
      [current.value.id]: {
        choice: letter,
        correct: res.data.correct,
        answer: res.data.answer,
        analysis: res.data.analysis,
      },
    }
    if (res.data.correct) {
      correctCount.value += 1
    }
    else {
      reasonOpen.value = true
    }
    saveSession()
  }
  catch {
    selected.value = null
    toast.add({ title: '判分失败，请重试', color: 'error' })
  }
  finally {
    grading.value = false
  }
}

function setReason(reason: string | null) {
  if (reason && current.value) {
    reasons.value = { ...reasons.value, [current.value.id]: reason }
  }
  reasonOpen.value = false
}

function applyState(i: number) {
  idx.value = i
  const q = props.questions[i]
  const rec = q ? records.value[q.id] : undefined
  if (rec) {
    selected.value = rec.choice
    result.value = { correct: rec.correct, answer: rec.answer, analysis: rec.analysis }
  }
  else {
    selected.value = null
    result.value = null
  }
}

function jump(i: number) {
  if (i < 0 || i >= total.value) return
  applyState(i)
  saveSession()
}

function next() {
  if (isLast.value) {
    finished.value = true
    clearSession()
    return
  }
  jump(idx.value + 1)
}

function cellClass(q: QuizQuestion, i: number) {
  const base = 'flex h-8 w-full items-center justify-center rounded text-xs font-medium transition-colors'
  const parts = [base]
  const rec = records.value[q.id]
  if (rec?.correct) parts.push('bg-success text-white')
  else if (rec) parts.push('bg-error text-white')
  else if (q.id in prior.value) parts.push(prior.value[q.id] ? 'bg-success/35 text-white' : 'bg-error/35 text-white')
  else parts.push('bg-elevated text-muted hover:bg-accented')
  if (i === idx.value) parts.push('outline outline-2 outline-offset-1 outline-highlighted')
  return parts.join(' ')
}
</script>

<template>
  <div class="space-y-4">
    <!-- 总结 -->
    <div v-if="finished" class="space-y-4" data-practice-summary>
      <UCard>
        <div class="text-center space-y-3 py-4">
          <UIcon name="i-lucide-flag" class="size-10 text-primary mx-auto" />
          <h2 class="text-xl font-bold text-highlighted">
            {{ title }} · 完成
          </h2>
          <p class="text-lg" data-summary-score>
            对 <b class="text-success">{{ correctCount }}</b> / 共 {{ total }} 题
          </p>
          <p class="text-sm text-muted" data-summary-accuracy>
            正确率 {{ accuracy }}%<template v-if="wrongCount">
              · {{ wrongCount }} 道错题已加入复习队列
            </template>
          </p>
        </div>
      </UCard>
      <div class="flex justify-center gap-3">
        <UButton color="primary" icon="i-lucide-arrow-left" data-back-to-modes @click="emit('exit')">
          返回模式选择
        </UButton>
      </div>
    </div>

    <!-- 断点恢复 -->
    <UCard v-else-if="resumeOffer" data-resume-offer>
      <div class="text-center space-y-3 py-4">
        <UIcon name="i-lucide-history" class="size-10 text-primary mx-auto" />
        <h2 class="text-lg font-bold text-highlighted">
          检测到上次未完成的进度
        </h2>
        <p class="text-sm text-muted">
          上次做到第 {{ resumeOffer.idx + 1 }} 题，已答对 {{ resumeOffer.correct }} 题
        </p>
        <div class="flex justify-center gap-3">
          <UButton color="primary" icon="i-lucide-play" data-resume-continue @click="resumeSession">
            从第 {{ resumeOffer.idx + 1 }} 题继续
          </UButton>
          <UButton color="neutral" variant="outline" data-resume-restart @click="restartSession">
            重新开始
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- DB 兜底恢复（无本地存档但题库记录显示本章已做过部分题） -->
    <UCard v-else-if="dbOffer" data-db-resume-offer>
      <div class="text-center space-y-3 py-4">
        <UIcon name="i-lucide-history" class="size-10 text-primary mx-auto" />
        <h2 class="text-lg font-bold text-highlighted">
          本章你之前做过 {{ dbOffer.done }} 题
        </h2>
        <p class="text-sm text-muted">
          这 {{ dbOffer.done }} 题分散在本章各处（含套卷/随机练习里做过的）。第 {{ dbOffer.idx + 1 }} 题是你第一道没做过的题，可以从它继续，也可以从头完整刷一遍
        </p>
        <div class="flex justify-center gap-3">
          <UButton color="primary" icon="i-lucide-play" data-db-resume-continue @click="resumeFromDb">
            从第 {{ dbOffer.idx + 1 }} 题继续
          </UButton>
          <UButton color="neutral" variant="outline" data-db-resume-restart @click="restartFromDb">
            从头开始
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- 作答 -->
    <template v-else-if="current">
      <UCard>
        <div class="flex items-center gap-4 flex-wrap">
          <UBadge color="primary" variant="subtle">
            {{ title }}
          </UBadge>
          <span class="text-sm font-medium text-default" data-progress>
            {{ idx + 1 }}/{{ total }}
          </span>
          <UProgress :model-value="idx + 1" :max="total" class="flex-1 min-w-32" />
          <span v-if="current.chapter && current.chapter !== title" class="text-xs text-muted">
            {{ current.chapter }}<template v-if="current.textbookChapter"> · {{ textbookChapterLabel(current.textbookChapter) }}</template>
          </span>
        </div>
      </UCard>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div class="space-y-4">
          <UCard>
            <p class="leading-7 text-default whitespace-pre-wrap" data-stem>
              {{ idx + 1 }}. {{ current.stem }}
            </p>
          </UCard>

          <QuizOptionList
            :options="current.options"
            :selected="selected"
            :reveal="reveal"
            :disabled="grading || !!result"
            @select="choose"
          />

          <!-- 判分反馈 -->
          <UCard v-if="result" data-grade-feedback>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <UBadge :color="result.correct ? 'success' : 'error'" data-grade-badge>
                  {{ result.correct ? '回答正确' : '回答错误' }}
                </UBadge>
                <span v-if="!result.correct" class="text-sm text-default" data-correct-answer>
                  正确答案：<b>{{ result.answer }}</b>
                </span>
              </div>
              <div v-if="result.analysis" class="rounded-lg bg-elevated p-3 text-sm leading-6 text-default" data-analysis>
                <p class="mb-1 text-xs font-semibold text-muted">
                  解析
                </p>
                <p class="whitespace-pre-wrap">{{ result.analysis }}</p>
              </div>
              <div class="flex justify-end">
                <UButton color="primary" icon="i-lucide-arrow-right" trailing data-next @click="next">
                  {{ isLast ? '查看总结' : '下一题' }}
                </UButton>
              </div>
            </div>
          </UCard>

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
              <span class="flex items-center gap-2 flex-wrap">
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-success" />答对</span>
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-error" />答错</span>
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-success/35" />上次对</span>
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-error/35" />上次错</span>
                <span class="flex items-center gap-1"><i class="inline-block size-2.5 rounded-sm bg-elevated ring-1 ring-default" />未答</span>
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

    <!-- 错因弹窗（可跳过；answer API 不接收错因，仅本地记录用于本次会话回顾） -->
    <UModal v-model:open="reasonOpen" title="这题错在哪？" :dismissible="false" :ui="{ footer: 'justify-end' }">
      <template #body>
        <p class="text-sm text-muted mb-3">
          标记错因，便于后续针对性复习（可跳过）
        </p>
        <div class="flex flex-col gap-2">
          <UButton
            v-for="r in ERROR_REASONS"
            :key="r"
            color="neutral"
            variant="outline"
            block
            :data-reason="r"
            @click="setReason(r)"
          >
            {{ r }}
          </UButton>
        </div>
      </template>
      <template #footer>
        <UButton color="neutral" variant="ghost" data-reason-skip @click="setReason(null)">
          跳过
        </UButton>
      </template>
    </UModal>
  </div>
</template>
