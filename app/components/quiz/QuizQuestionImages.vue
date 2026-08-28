<script setup lang="ts">
const props = defineProps<{ images: string[] }>()

const current = ref<number | null>(null)

const isOpen = computed(() => current.value !== null)
const currentSrc = computed(() => (current.value === null ? '' : (props.images[current.value] ?? '')))
const total = computed(() => props.images.length)

function close() {
  current.value = null
}

function step(delta: number) {
  if (current.value === null) return
  current.value = (current.value + delta + total.value) % total.value
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
}

watch(isOpen, (open) => {
  if (open) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="space-y-2">
    <button
      v-for="(img, i) in images"
      :key="img"
      type="button"
      class="block max-w-full cursor-zoom-in rounded-md border border-default bg-white p-1 transition hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
      @click="current = i"
    >
      <img
        :src="img"
        alt="题图"
        class="max-w-full"
      >
    </button>
  </div>

  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 sm:p-8"
      @click="close"
    >
      <img
        :src="currentSrc"
        alt="题图大图"
        class="max-h-full max-w-full cursor-zoom-out rounded-md bg-white p-2 object-contain shadow-2xl"
      >
      <template v-if="total > 1">
        <UButton
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="solid"
          aria-label="上一张"
          class="absolute left-4 top-1/2 -translate-y-1/2"
          @click.stop="step(-1)"
        />
        <UButton
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="solid"
          aria-label="下一张"
          class="absolute right-4 top-1/2 -translate-y-1/2"
          @click.stop="step(1)"
        />
        <span class="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
          {{ (current ?? 0) + 1 }} / {{ total }}
        </span>
      </template>
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        aria-label="关闭"
        class="absolute right-4 top-4 text-white hover:bg-white/10"
        @click.stop="close"
      />
    </div>
  </Teleport>
</template>
