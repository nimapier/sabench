<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
const route = useRoute()

const links = [
  { label: '仪表盘', to: '/' },
  { label: '计划', to: '/plan' },
  { label: '刷题', to: '/quiz' },
  { label: '论文', to: '/essay' },
  { label: '背景库', to: '/essay/bg' },
  { label: '案例', to: '/case' },
]

// 取最长前缀匹配，避免 /essay/bg 同时高亮 /essay
const activeTo = computed(() => {
  let best = ''
  for (const link of links) {
    const matched = link.to === '/' ? route.path === '/' : route.path.startsWith(link.to)
    if (matched && link.to.length > best.length) {
      best = link.to
    }
  }
  return best
})

async function logout() {
  await clear()
  await navigateTo('/login')
}
</script>

<template>
  <UApp>
    <header
      v-if="loggedIn"
      class="sticky top-0 z-40 border-b border-default bg-default/80 backdrop-blur"
    >
      <div class="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <NuxtLink to="/" class="text-lg font-bold text-highlighted">
          SABench
        </NuxtLink>
        <nav class="flex flex-1 items-center gap-1">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            :class="activeTo === link.to
              ? 'bg-primary/10 text-primary'
              : 'text-muted hover:bg-elevated hover:text-default'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-3">
          <UAvatar
            :src="user?.avatar"
            :alt="user?.name || user?.login || '用户'"
            size="sm"
          />
          <UButton
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-log-out"
            @click="logout"
          >
            登出
          </UButton>
        </div>
      </div>
    </header>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
