<script setup lang="ts">
import { ESSAY_DIRECTIONS } from '#shared/constants'

interface EssayItem {
  id: number
  title: string
  direction: string | null
  status: 'draft' | 'done' | null
  projectBgId: number | null
  projectBgName: string | null
  latestWordCount: number | null
  latestAt: string | null
  createdAt: string
}

interface ProjectItem {
  id: number
  name: string
}

const { data: essaysData, refresh } = await useFetch<{ data: EssayItem[] }>('/api/essays')
const { data: projectsData } = await useFetch<{ data: ProjectItem[] }>('/api/projects')

const essays = computed(() => essaysData.value?.data ?? [])
const projects = computed(() => projectsData.value?.data ?? [])

const GOAL = 8
const doneCount = computed(() => essays.value.filter(e => e.status === 'done').length)

// 新建弹窗
const createOpen = ref(false)
const creating = ref(false)
const createError = ref('')
const form = reactive({
  title: '',
  direction: undefined as string | undefined,
  projectBgId: undefined as number | undefined,
})

const projectItems = computed(() =>
  projects.value.map(p => ({ label: p.name, value: p.id })),
)

async function submitCreate() {
  if (!form.title.trim()) {
    createError.value = '请填写标题'
    return
  }
  creating.value = true
  createError.value = ''
  try {
    await $fetch('/api/essays', {
      method: 'POST',
      body: {
        title: form.title.trim(),
        direction: form.direction ?? null,
        projectBgId: form.projectBgId ?? null,
      },
    })
    createOpen.value = false
    form.title = ''
    form.direction = undefined
    form.projectBgId = undefined
    await refresh()
  }
  catch (e: any) {
    createError.value = e?.data?.message || e?.message || '创建失败'
  }
  finally {
    creating.value = false
  }
}

// 删除（二次确认）
const toast = useToast()
const deleteOpen = ref(false)
const deleting = ref(false)
const pendingDelete = ref<EssayItem | null>(null)

function askDelete(item: EssayItem) {
  pendingDelete.value = item
  deleteOpen.value = true
}

async function confirmDelete() {
  if (!pendingDelete.value) return
  deleting.value = true
  try {
    await $fetch(`/api/essays/${pendingDelete.value.id}`, { method: 'DELETE' })
    deleteOpen.value = false
    pendingDelete.value = null
    await refresh()
  }
  catch {
    toast.add({ title: '删除失败，请重试', color: 'error' })
  }
  finally {
    deleting.value = false
  }
}

function formatTime(v: string | null) {
  if (!v) return '—'
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('zh-CN', { hour12: false })
}
</script>

<template>
  <div class="p-8 max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        论文列表
      </h1>
      <UModal v-model:open="createOpen" title="新建论文">
        <UButton icon="i-lucide-plus">
          新建论文
        </UButton>
        <template #body>
          <div class="flex flex-col gap-4">
            <UFormField label="标题" required>
              <UInput v-model="form.title" placeholder="论文标题" class="w-full" />
            </UFormField>
            <UFormField label="方向">
              <USelect
                v-model="form.direction"
                :items="[...ESSAY_DIRECTIONS]"
                placeholder="选择方向"
                class="w-full"
              />
            </UFormField>
            <UFormField label="关联项目背景">
              <USelect
                v-if="projectItems.length"
                v-model="form.projectBgId"
                :items="projectItems"
                placeholder="选择项目背景"
                class="w-full"
              />
              <div v-else class="text-sm text-gray-500">
                暂无项目背景，
                <NuxtLink to="/essay/bg" class="text-primary underline">
                  先去背景库创建
                </NuxtLink>
              </div>
            </UFormField>
            <UAlert v-if="createError" color="error" variant="subtle" :title="createError" />
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton variant="outline" color="neutral" @click="createOpen = false">
              取消
            </UButton>
            <UButton :loading="creating" @click="submitCreate">
              创建
            </UButton>
          </div>
        </template>
      </UModal>
    </div>

    <UCard class="mb-6">
      <div class="flex items-center gap-4">
        <UProgress :model-value="doneCount" :max="GOAL" class="flex-1" />
        <span class="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
          已完成 {{ doneCount }} / {{ GOAL }} 篇目标
        </span>
      </div>
    </UCard>

    <div v-if="!essays.length" class="text-center text-gray-400 py-16">
      还没有论文，点击右上角「新建论文」开始
    </div>

    <div class="flex flex-col gap-3">
      <UCard v-for="item in essays" :key="item.id">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-medium truncate">{{ item.title }}</span>
              <UBadge v-if="item.direction" color="primary" variant="subtle">
                {{ item.direction }}
              </UBadge>
              <UBadge
                :color="item.status === 'done' ? 'success' : 'neutral'"
                :variant="item.status === 'done' ? 'solid' : 'subtle'"
              >
                {{ item.status === 'done' ? '已完成' : '草稿' }}
              </UBadge>
            </div>
            <div class="text-sm text-gray-500 mt-1 flex items-center gap-3 flex-wrap">
              <span>项目背景：{{ item.projectBgName || '未关联' }}</span>
              <span>最新字数：{{ item.latestWordCount ?? '—' }}</span>
              <span>更新时间：{{ formatTime(item.latestAt) }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UButton
              :to="`/essay/${item.id}`"
              size="sm"
              variant="outline"
              icon="i-lucide-pen-line"
            >
              进入写作器
            </UButton>
            <UButton
              size="sm"
              color="error"
              variant="ghost"
              icon="i-lucide-trash-2"
              @click="askDelete(item)"
            >
              删除
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <UModal v-model:open="deleteOpen" title="确认删除">
      <template #body>
        <p>确定删除论文「{{ pendingDelete?.title }}」吗？其所有版本将一并删除，且不可恢复。</p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="outline" color="neutral" @click="deleteOpen = false">
            取消
          </UButton>
          <UButton color="error" :loading="deleting" @click="confirmDelete">
            确认删除
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
