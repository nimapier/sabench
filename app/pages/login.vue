<script setup lang="ts">
const route = useRoute()
const hasError = computed(() => route.query.error === '1')
const isDev = import.meta.dev
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <UCard class="w-full max-w-sm">
      <div class="flex flex-col items-center gap-6 py-4">
        <h1 class="text-2xl font-bold">
          SABench
        </h1>
        <UAlert
          v-if="hasError"
          color="error"
          variant="subtle"
          title="登录失败或账号未授权"
          class="w-full"
        />
        <UButton
          href="/auth/github"
          external
          size="lg"
          block
        >
          使用 GitHub 登录
        </UButton>
        <UButton
          v-if="isDev"
          href="/auth/dev"
          external
          variant="outline"
          color="neutral"
          block
        >
          开发模式进入
        </UButton>
      </div>
    </UCard>
  </div>
</template>
