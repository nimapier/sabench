<script setup lang="ts">
import { ESSAY_SECTION_BUDGET } from '#shared/constants'

interface EssayVersion {
  id: number
  essayId: number
  content: string
  wordCount: number | null
  durationSec: number | null
  selfReview: string | null
  isDraft: boolean
  createdAt: string
}

interface EssayDetail {
  id: number
  title: string
  direction: string | null
  status: 'draft' | 'done' | null
  projectBgId: number | null
  createdAt: string
  versions: EssayVersion[]
  latestDraft: EssayVersion | null
}

interface ProjectBg {
  id: number
  name: string
  scale: string | null
  role: string | null
  techStack: string | null
  results: string | null
}

const route = useRoute()
const toast = useToast()
const id = route.params.id as string

const { data, error } = await useFetch<{ data: EssayDetail }>(`/api/essays/${id}`)
if (error.value || !data.value?.data) {
  throw createError({ statusCode: 404, statusMessage: '论文不存在', fatal: true })
}
const essay = computed(() => data.value?.data)

// 关联项目背景（列表接口自行匹配）
const { data: projectsData } = await useFetch<{ data: ProjectBg[] }>('/api/projects')
const projectBg = computed(() => {
  const pid = essay.value?.projectBgId
  if (!pid) return null
  return projectsData.value?.data.find(p => p.id === pid) ?? null
})

// ---------- 只读（done）态 ----------
const isDone = computed(() => essay.value?.status === 'done')
const finalVersion = computed(() => essay.value?.versions.find(v => !v.isDraft) ?? null)

const REVIEW_LABELS: Record<string, string> = {
  roleEffect: '摘要包含担任角色与项目效果',
  realProject: '结合了真实项目细节',
  quantified: '包含量化数字',
  structure: '结构完整覆盖六段',
  wordRange: '字数在 2500-3000 区间',
}

const finalReview = computed<Record<string, boolean>>(() => {
  const raw = finalVersion.value?.selfReview
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  }
  catch {
    return {}
  }
})

const finalMinutes = computed(() => Math.round((finalVersion.value?.durationSec ?? 0) / 60))

// ---------- 编辑态 ----------
const content = ref(essay.value?.latestDraft?.content ?? '')

// 倒计时：起点 120 分钟，若已有草稿时长则续走
const TOTAL_SEC = 120 * 60
const baseDurationSec = essay.value?.latestDraft?.durationSec ?? 0
const remaining = ref(Math.max(0, TOTAL_SEC - baseDurationSec))
const sessionSec = ref(0)

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (isDone.value) return
  timer = setInterval(() => {
    sessionSec.value += 1
    if (remaining.value > 0) remaining.value -= 1
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function formatSec(total: number) {
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${m}:${s}`
}

// SSR 初始快照（静态，不参与后续响应式更新），供 ClientOnly fallback 渲染，避免布局跳动
const initialTimeText = formatSec(Math.max(0, TOTAL_SEC - baseDurationSec))

const timeText = computed(() => formatSec(remaining.value))

const timerClass = computed(() => {
  if (remaining.value <= 15 * 60) return 'text-red-500'
  if (remaining.value <= 30 * 60) return 'text-amber-500'
  return 'text-highlighted'
})

// 字数（去空白字符）
const wordCount = computed(() => content.value.replace(/\s/g, '').length)
const WORD_GOAL = 3000
const WORD_PASS = 2500
// reka-ui ProgressRoot 要求 value <= max，超目标字数时钳制（视觉满格，真实字数仍显示在文本里）
const progressValue = computed(() => Math.min(wordCount.value, WORD_GOAL))
const wordBarColor = computed(() => (wordCount.value >= WORD_PASS ? 'success' : 'primary') as 'success' | 'primary')

// ---------- 保存 ----------
const dirty = ref(false)
const saving = ref(false)
const lastSavedAt = ref<Date | null>(null)
const durationSec = computed(() => baseDurationSec + sessionSec.value)

let debounceTimer: ReturnType<typeof setTimeout> | undefined

async function saveDraft() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = undefined
  }
  if (saving.value || isDone.value) return
  const snapshot = content.value
  saving.value = true
  try {
    await $fetch(`/api/essays/${id}/versions`, {
      method: 'POST',
      body: {
        content: snapshot,
        wordCount: snapshot.replace(/\s/g, '').length,
        durationSec: durationSec.value,
        isDraft: true,
      },
    })
    lastSavedAt.value = new Date()
    // 保存期间又有新输入则保持脏标记，等待下一轮自动保存
    if (content.value === snapshot) dirty.value = false
  }
  catch {
    toast.add({ title: '保存失败，请重试', color: 'error' })
  }
  finally {
    saving.value = false
  }
}

watch(content, () => {
  if (isDone.value) return
  dirty.value = true
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => saveDraft(), 10_000)
})

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

const saveStatusText = computed(() => {
  if (saving.value) return '保存中…'
  if (lastSavedAt.value) {
    const d = lastSavedAt.value
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    const ss = String(d.getSeconds()).padStart(2, '0')
    return `已保存 ${hh}:${mm}:${ss}`
  }
  return dirty.value ? '有未保存修改' : '尚未保存'
})

// ---------- 离开保护 ----------
function onBeforeUnload(e: BeforeUnloadEvent) {
  e.preventDefault()
  e.returnValue = ''
}

watch(dirty, (v) => {
  if (!import.meta.client) return
  if (v) window.addEventListener('beforeunload', onBeforeUnload)
  else window.removeEventListener('beforeunload', onBeforeUnload)
})

onBeforeUnmount(() => {
  if (import.meta.client) window.removeEventListener('beforeunload', onBeforeUnload)
})

onBeforeRouteLeave(() => {
  if (!dirty.value) return true
  return window.confirm('有未保存的修改，确定要离开吗？')
})

// ---------- 完成 ----------
const finishOpen = ref(false)
const finishing = ref(false)
const review = reactive({
  roleEffect: false,
  realProject: false,
  quantified: false,
  structure: false,
  wordRange: false,
})
const reviewKeys = Object.keys(REVIEW_LABELS) as (keyof typeof review)[]
const allChecked = computed(() => reviewKeys.every(k => review[k]))

async function submitFinish() {
  if (!allChecked.value || finishing.value) return
  finishing.value = true
  try {
    await $fetch(`/api/essays/${id}/versions`, {
      method: 'POST',
      body: {
        content: content.value,
        wordCount: wordCount.value,
        durationSec: durationSec.value,
        isDraft: false,
        selfReview: { ...review },
      },
    })
    dirty.value = false
    finishOpen.value = false
    toast.add({ title: '论文已完成，继续加油', color: 'success' })
    await navigateTo('/essay')
  }
  catch {
    toast.add({ title: '提交失败，请重试', color: 'error' })
  }
  finally {
    finishing.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-6xl p-4 py-6">
    <!-- 只读完成态 -->
    <div v-if="isDone" class="space-y-6">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="text-2xl font-bold text-highlighted">
          {{ essay?.title }}
        </h1>
        <UBadge v-if="essay?.direction" color="primary" variant="subtle">
          {{ essay.direction }}
        </UBadge>
        <UBadge color="success">
          已完成
        </UBadge>
      </div>

      <UCard>
        <div class="flex items-center gap-6 flex-wrap text-sm">
          <span>字数：<b>{{ finalVersion?.wordCount ?? '—' }}</b></span>
          <span>用时：<b>{{ finalMinutes }} 分钟</b></span>
        </div>
      </UCard>

      <UCard v-if="Object.keys(finalReview).length">
        <template #header>
          <h2 class="font-semibold text-highlighted">
            完成自评
          </h2>
        </template>
        <ul class="space-y-2">
          <li
            v-for="key in reviewKeys"
            :key="key"
            class="flex items-center gap-2 text-sm"
          >
            <UIcon
              :name="finalReview[key] ? 'i-lucide-check-circle-2' : 'i-lucide-circle'"
              :class="finalReview[key] ? 'text-success' : 'text-muted'"
            />
            {{ REVIEW_LABELS[key] }}
          </li>
        </ul>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-semibold text-highlighted">
            最终版本
          </h2>
        </template>
        <div class="whitespace-pre-wrap text-sm leading-7" data-final-content>
          {{ finalVersion?.content ?? '' }}
        </div>
      </UCard>

      <UButton to="/essay" variant="outline" color="neutral" icon="i-lucide-arrow-left">
        返回论文列表
      </UButton>
    </div>

    <!-- 写作器 -->
    <div v-else class="space-y-4">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="text-xl font-bold text-highlighted">
          {{ essay?.title }}
        </h1>
        <UBadge v-if="essay?.direction" color="primary" variant="subtle">
          {{ essay.direction }}
        </UBadge>
      </div>

      <!-- 顶部状态栏 -->
      <UCard>
        <div class="flex items-center gap-6 flex-wrap">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-timer" class="size-5 text-muted" />
            <!-- 倒计时客户端每秒驱动，ClientOnly 包裹避免 SSR/CSR 文本 hydration mismatch；fallback 为同一初始值，无跳动 -->
            <span
              class="text-2xl font-mono font-bold tabular-nums"
              :class="timerClass"
              data-timer
            ><ClientOnly>{{ timeText }}<template #fallback>{{ initialTimeText }}</template></ClientOnly></span>
          </div>

          <div class="flex items-center gap-3 min-w-64 flex-1">
            <UProgress
              :model-value="progressValue"
              :max="WORD_GOAL"
              :color="wordBarColor"
              class="flex-1"
              data-word-progress
            />
            <span class="text-sm text-muted whitespace-nowrap" data-word-count>
              {{ wordCount }} 字 · 2500 合格 / 3000 目标
            </span>
          </div>

          <div class="flex items-center gap-3">
            <!-- 保存状态依赖客户端运行时状态（lastSavedAt/dirty），ClientOnly 防 hydration mismatch -->
            <span class="text-sm text-muted" data-save-status><ClientOnly>{{ saveStatusText }}<template #fallback>尚未保存</template></ClientOnly></span>
            <UButton
              icon="i-lucide-save"
              variant="outline"
              color="neutral"
              :loading="saving"
              @click="saveDraft"
            >
              保存草稿
            </UButton>
            <UButton
              icon="i-lucide-check"
              color="primary"
              @click="finishOpen = true"
            >
              完成
            </UButton>
          </div>
        </div>
      </UCard>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <!-- 提纲面板 -->
        <UCollapsible class="lg:sticky lg:top-20 self-start w-full">
          <UButton
            block
            color="neutral"
            variant="outline"
            icon="i-lucide-list-checks"
            trailing-icon="i-lucide-chevron-down"
            class="group [&>span:last-child]:group-data-[state=open]:rotate-180"
          >
            写作提纲（六段结构）
          </UButton>
          <template #content>
            <UCard class="mt-2">
              <ul class="space-y-2 text-sm">
                <li
                  v-for="(section, i) in ESSAY_SECTION_BUDGET"
                  :key="section.name"
                  class="flex items-center justify-between gap-2"
                >
                  <span class="text-default">{{ i + 1 }}. {{ section.name }}</span>
                  <UBadge color="neutral" variant="subtle" size="sm">
                    {{ section.budget }} 字
                  </UBadge>
                </li>
              </ul>

              <div v-if="projectBg" class="mt-4 border-t border-default pt-3" data-project-bg>
                <p class="text-xs text-muted mb-2">
                  关联项目背景
                </p>
                <p class="font-medium text-sm mb-2">
                  {{ projectBg.name }}
                </p>
                <dl class="space-y-1.5 text-xs">
                  <div v-if="projectBg.scale" class="flex gap-2">
                    <dt class="text-muted shrink-0 w-14">规模</dt>
                    <dd>{{ projectBg.scale }}</dd>
                  </div>
                  <div v-if="projectBg.role" class="flex gap-2">
                    <dt class="text-muted shrink-0 w-14">角色</dt>
                    <dd>{{ projectBg.role }}</dd>
                  </div>
                  <div v-if="projectBg.techStack" class="flex gap-2">
                    <dt class="text-muted shrink-0 w-14">技术栈</dt>
                    <dd>{{ projectBg.techStack }}</dd>
                  </div>
                  <div v-if="projectBg.results" class="flex gap-2">
                    <dt class="text-muted shrink-0 w-14">成果</dt>
                    <dd>{{ projectBg.results }}</dd>
                  </div>
                </dl>
              </div>
            </UCard>
          </template>
        </UCollapsible>

        <!-- 编辑区 -->
        <UTextarea
          v-model="content"
          :rows="20"
          autoresize
          class="w-full font-mono"
          :ui="{ base: 'min-h-[50vh]' }"
          placeholder="按提纲六段结构开始写作，草稿每 10 秒自动保存…"
          data-editor
        />
      </div>
    </div>

    <!-- 完成自评弹窗 -->
    <UModal v-model:open="finishOpen" title="完成自评" :ui="{ footer: 'justify-end' }">
      <template #body>
        <div class="space-y-3">
          <p class="text-sm text-muted">
            提交前请确认以下各项均已满足（当前 {{ wordCount }} 字，用时 {{ Math.round(durationSec / 60) }} 分钟）：
          </p>
          <UCheckbox
            v-for="key in reviewKeys"
            :key="key"
            v-model="review[key]"
            :label="REVIEW_LABELS[key]"
          />
        </div>
      </template>
      <template #footer>
        <UButton color="neutral" variant="ghost" @click="finishOpen = false">
          继续写作
        </UButton>
        <UButton
          color="primary"
          :disabled="!allChecked"
          :loading="finishing"
          data-submit-finish
          @click="submitFinish"
        >
          提交完成
        </UButton>
      </template>
    </UModal>
  </div>
</template>
