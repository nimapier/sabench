<script setup lang="ts">
import type { QuizQuestion } from '#shared/quiz'

type Phase =
  | { kind: 'select' }
  | { kind: 'practice', title: string, questions: QuizQuestion[] }
  | { kind: 'paper', year: string }

const phase = ref<Phase>({ kind: 'select' })

function startPractice(payload: { title: string, questions: QuizQuestion[] }) {
  phase.value = { kind: 'practice', ...payload }
}

function startPaper(payload: { year: string }) {
  phase.value = { kind: 'paper', year: payload.year }
}

function backToSelect() {
  phase.value = { kind: 'select' }
}
</script>

<template>
  <div class="mx-auto max-w-6xl p-4 py-6">
    <div class="mb-6 flex items-center gap-3">
      <h1 class="text-2xl font-bold text-highlighted">
        刷题
      </h1>
      <UBadge v-if="phase.kind !== 'select'" color="neutral" variant="subtle">
        {{ phase.kind === 'paper' ? '年度套卷' : '即时判分' }}
      </UBadge>
    </div>

    <QuizModeSelect
      v-if="phase.kind === 'select'"
      @start-practice="startPractice"
      @start-paper="startPaper"
    />
    <QuizPractice
      v-else-if="phase.kind === 'practice'"
      :key="`practice-${phase.title}`"
      :title="phase.title"
      :questions="phase.questions"
      @exit="backToSelect"
    />
    <QuizPaper
      v-else
      :key="`paper-${phase.year}`"
      :year="phase.year"
      @exit="backToSelect"
    />
  </div>
</template>
