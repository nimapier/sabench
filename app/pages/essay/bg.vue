<script setup lang="ts">
import { ESSAY_DIRECTIONS } from '#shared/constants'

interface ProjectBg {
  id: number
  name: string
  scale: string | null
  role: string | null
  techStack: string | null
  results: string | null
  directions: string | null
  description: string | null
  createdAt: string | Date
}

const { data, refresh } = await useFetch<{ data: ProjectBg[] }>('/api/projects')
const projects = computed(() => data.value?.data ?? [])

// ---------- 新建 / 编辑 ----------
const formOpen = ref(false)
const editingId = ref<number | null>(null)
const submitting = ref(false)
const nameError = ref('')

const emptyForm = () => ({
  name: '',
  scale: '',
  role: '',
  techStack: '',
  results: '',
  description: '',
  directions: [] as string[],
})

const form = reactive(emptyForm())

function resetForm() {
  Object.assign(form, emptyForm())
  nameError.value = ''
}

function openCreate() {
  editingId.value = null
  resetForm()
  formOpen.value = true
}

function openEdit(p: ProjectBg) {
  editingId.value = p.id
  resetForm()
  Object.assign(form, {
    name: p.name,
    scale: p.scale ?? '',
    role: p.role ?? '',
    techStack: p.techStack ?? '',
    results: p.results ?? '',
    description: p.description ?? '',
    directions: p.directions ? p.directions.split(',').filter(Boolean) : [],
  })
  formOpen.value = true
}

watch(() => form.name, () => {
  if (nameError.value && form.name.trim()) nameError.value = ''
})

async function submitForm() {
  if (!form.name.trim()) {
    nameError.value = '项目名称不能为空'
    return
  }
  submitting.value = true
  try {
    const payload = {
      name: form.name.trim(),
      scale: form.scale || null,
      role: form.role || null,
      techStack: form.techStack || null,
      results: form.results || null,
      description: form.description || null,
      directions: form.directions,
    }
    if (editingId.value) {
      await $fetch(`/api/projects/${editingId.value}`, { method: 'PUT', body: payload })
    } else {
      await $fetch('/api/projects', { method: 'POST', body: payload })
    }
    formOpen.value = false
    await refresh()
  } finally {
    submitting.value = false
  }
}

// ---------- 删除 ----------
const deleteOpen = ref(false)
const deleting = ref<ProjectBg | null>(null)
const deletingLoading = ref(false)

function confirmDelete(p: ProjectBg) {
  deleting.value = p
  deleteOpen.value = true
}

async function doDelete() {
  if (!deleting.value) return
  deletingLoading.value = true
  try {
    await $fetch(`/api/projects/${deleting.value.id}`, { method: 'DELETE' })
    deleteOpen.value = false
    deleting.value = null
    await refresh()
  } finally {
    deletingLoading.value = false
  }
}

function directionList(p: ProjectBg): string[] {
  return p.directions ? p.directions.split(',').filter(Boolean) : []
}
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">
          项目背景库
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          维护论文可复用的项目背景素材
        </p>
      </div>
      <UButton icon="i-lucide-plus" @click="openCreate">
        新建背景
      </UButton>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!projects.length"
      class="flex flex-col items-center justify-center py-24 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
    >
      <UIcon name="i-lucide-folder-open" class="text-4xl text-gray-400 mb-4" />
      <p class="text-gray-500 mb-2">
        还没有项目背景
      </p>
      <p class="text-sm text-gray-400 mb-6">
        创建你的第一个项目背景，写论文时可以直接引用
      </p>
      <UButton icon="i-lucide-plus" @click="openCreate">
        新建背景
      </UButton>
    </div>

    <!-- 卡片网格 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="p in projects" :key="p.id">
        <template #header>
          <div class="flex items-start justify-between gap-2">
            <h3 class="font-semibold truncate">
              {{ p.name }}
            </h3>
            <div class="flex gap-1 shrink-0">
              <UButton
                icon="i-lucide-pencil"
                size="xs"
                color="neutral"
                variant="ghost"
                aria-label="编辑"
                @click="openEdit(p)"
              />
              <UButton
                icon="i-lucide-trash-2"
                size="xs"
                color="error"
                variant="ghost"
                aria-label="删除"
                @click="confirmDelete(p)"
              />
            </div>
          </div>
        </template>

        <dl class="space-y-2 text-sm">
          <div v-if="p.role" class="flex gap-2">
            <dt class="text-gray-500 shrink-0 w-16">担任角色</dt>
            <dd>{{ p.role }}</dd>
          </div>
          <div v-if="p.scale" class="flex gap-2">
            <dt class="text-gray-500 shrink-0 w-16">项目规模</dt>
            <dd>{{ p.scale }}</dd>
          </div>
          <div v-if="p.techStack" class="flex gap-2">
            <dt class="text-gray-500 shrink-0 w-16">技术栈</dt>
            <dd>{{ p.techStack }}</dd>
          </div>
          <div v-if="p.results" class="flex gap-2">
            <dt class="text-gray-500 shrink-0 w-16">项目成果</dt>
            <dd>{{ p.results }}</dd>
          </div>
          <div v-if="directionList(p).length" class="flex gap-2">
            <dt class="text-gray-500 shrink-0 w-16">适用方向</dt>
            <dd class="flex flex-wrap gap-1">
              <UBadge
                v-for="d in directionList(p)"
                :key="d"
                color="primary"
                variant="subtle"
                size="sm"
              >
                {{ d }}
              </UBadge>
            </dd>
          </div>
        </dl>
      </UCard>
    </div>

    <!-- 新建 / 编辑弹窗 -->
    <UModal
      v-model:open="formOpen"
      :title="editingId ? '编辑项目背景' : '新建项目背景'"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <form class="space-y-4" @submit.prevent="submitForm">
          <UFormField label="项目名称" required :error="nameError || undefined">
            <UInput v-model="form.name" placeholder="例如：电商中台" class="w-full" />
          </UFormField>
          <UFormField label="项目规模">
            <UInput v-model="form.scale" placeholder="例如：日均订单 100w，50 人团队" class="w-full" />
          </UFormField>
          <UFormField label="担任角色">
            <UInput v-model="form.role" placeholder="例如：系统架构师" class="w-full" />
          </UFormField>
          <UFormField label="技术栈">
            <UInput v-model="form.techStack" placeholder="例如：Spring Cloud / MySQL / Redis" class="w-full" />
          </UFormField>
          <UFormField label="项目成果">
            <UInput v-model="form.results" placeholder="例如：上线后下单耗时降低 40%" class="w-full" />
          </UFormField>
          <UFormField label="项目描述">
            <UTextarea v-model="form.description" :rows="3" placeholder="项目背景、业务场景等补充说明" class="w-full" />
          </UFormField>
          <UFormField label="适用方向">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <UCheckbox
                v-for="d in ESSAY_DIRECTIONS"
                :key="d"
                v-model="form.directions"
                :value="d"
                :label="d"
              />
            </div>
          </UFormField>
        </form>
      </template>
      <template #footer>
        <UButton color="neutral" variant="ghost" @click="formOpen = false">
          取消
        </UButton>
        <UButton :loading="submitting" @click="submitForm">
          保存
        </UButton>
      </template>
    </UModal>

    <!-- 删除确认弹窗 -->
    <UModal v-model:open="deleteOpen" title="删除项目背景" :ui="{ footer: 'justify-end' }">
      <template #body>
        <p class="text-sm">
          确定删除「{{ deleting?.name }}」吗？该背景被论文引用时论文保留但失去关联。此操作不可撤销。
        </p>
      </template>
      <template #footer>
        <UButton color="neutral" variant="ghost" @click="deleteOpen = false">
          取消
        </UButton>
        <UButton color="error" :loading="deletingLoading" @click="doDelete">
          确认删除
        </UButton>
      </template>
    </UModal>
  </div>
</template>
