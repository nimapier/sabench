export const ESSAY_DIRECTIONS = [
  '需求分析',
  '架构设计',
  '性能优化',
  '系统安全',
  '质量管理',
  '进度成本',
] as const

export type EssayDirection = (typeof ESSAY_DIRECTIONS)[number]

export const CASE_TYPES = [
  '需求分析',
  '系统设计',
  '架构评估',
  '数据库设计',
  '项目管理计算',
] as const

export type CaseType = (typeof CASE_TYPES)[number]

export interface EssaySection {
  name: string
  budget: number
}

export const ESSAY_SECTION_BUDGET: EssaySection[] = [
  { name: '摘要', budget: 300 },
  { name: '项目背景', budget: 300 },
  { name: '问题分析', budget: 400 },
  { name: '解决方案', budget: 1000 },
  { name: '实施过程', budget: 500 },
  { name: '效果与总结', budget: 500 },
]

export const ESSAY_TOTAL_BUDGET = ESSAY_SECTION_BUDGET.reduce((sum, s) => sum + s.budget, 0)
