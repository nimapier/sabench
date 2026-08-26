<script setup lang="ts">
import type { QuizGradeResult, QuizQuestion } from '#shared/quiz'

const props = defineProps<{
  title: string
  questions: QuizQuestion[]
}>()

const emit = defineEmits<{
  exit: []
}>()

const toast = useToast()

const ERROR_REASONS = ['概念不清', '审题失误', '计算错误'] as const

const idx = ref(0)
const selected = ref<string | null>(null)
const grading = ref(false)
const result = ref<QuizGradeResult | null>(null)
const correctCount = ref(0)
const reasons = ref<Record<number, string>>({})
const reasonOpen = ref(false)
const finished = ref(false)

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
    if (res.data.correct) {
      correctCount.value += 1
    }
    else {
      reasonOpen.value = true
    }
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

function next() {
  if (isLast.value) {
    finished.value = true
    return
  }
  idx.value += 1
  selected.value = null
  result.value = null
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

      <UCard>
        <p class="leading-7 text-default whitespace-pre-wrap" data-stem>
          {{ current.stem }}
        </p>
      </UCard>

      <QuizOptionList
        :options="current.options"
        :selected="selected"
        :reveal="reveal"
        :disabled="grading"
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
