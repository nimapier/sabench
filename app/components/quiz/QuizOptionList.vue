<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string>
  selected: string | null
  reveal: { answer: string, choice: string } | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  select: [letter: string]
}>()

const letters = computed(() => Object.keys(props.options).sort())

function letterClass(letter: string) {
  const base = 'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors'
  if (props.reveal) {
    const { answer, choice } = props.reveal
    if (letter === answer) {
      return `${base} border-success bg-success/10 text-highlighted`
    }
    if (letter === choice) {
      return `${base} border-error bg-error/10 text-highlighted`
    }
    return `${base} border-default text-muted opacity-60`
  }
  if (letter === props.selected) {
    return `${base} border-primary bg-primary/10 text-highlighted`
  }
  return `${base} border-default text-default hover:border-primary hover:bg-primary/5`
}

function badgeClass(letter: string) {
  const base = 'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold'
  if (props.reveal) {
    const { answer, choice } = props.reveal
    if (letter === answer) return `${base} bg-success text-white`
    if (letter === choice) return `${base} bg-error text-white`
    return `${base} bg-elevated text-muted`
  }
  if (letter === props.selected) return `${base} bg-primary text-white`
  return `${base} bg-elevated text-muted`
}
</script>

<template>
  <div class="space-y-2" data-option-list>
    <button
      v-for="letter in letters"
      :key="letter"
      type="button"
      :class="letterClass(letter)"
      :disabled="disabled || !!reveal"
      :data-option="letter"
      @click="emit('select', letter)"
    >
      <span :class="badgeClass(letter)">{{ letter }}</span>
      <span class="leading-6">{{ options[letter] }}</span>
      <UIcon
        v-if="reveal && letter === reveal.answer"
        name="i-lucide-check-circle-2"
        class="ml-auto size-5 shrink-0 self-center text-success"
      />
      <UIcon
        v-else-if="reveal && letter === reveal.choice && reveal.choice !== reveal.answer"
        name="i-lucide-x-circle"
        class="ml-auto size-5 shrink-0 self-center text-error"
      />
    </button>
  </div>
</template>
