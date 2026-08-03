// 简化 SM-2 间隔复习引擎（纯函数，无 DB 依赖）
// 规则：间隔序列严格 1/3/7/15 天；答对推进 level/streak；答错归零并明天到期；streak>=3 毕业

export const REVIEW_INTERVALS = [1, 3, 7, 15] as const

export interface ReviewEntry {
  level: number
  streak: number
}

export interface ReviewSchedule extends ReviewEntry {
  dueDate: string // YYYY-MM-DD（本地日期）
}

export function nextInterval(level: number): number {
  return REVIEW_INTERVALS[Math.min(level, 3)]!
}

export function isGraduated(streak: number): boolean {
  return streak >= 3
}

function formatLocalDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayString(): string {
  return formatLocalDate(new Date())
}

// 本地时区安全的日期加法（避免 UTC 解析跨日界）
export function addDays(dateStr: string, days: number): string {
  const [y = 1970, m = 1, d = 1] = dateStr.split('-').map(Number)
  return formatLocalDate(new Date(y, m - 1, d + days))
}

export function scheduleOnCorrect(entry: ReviewEntry): ReviewSchedule {
  const level = entry.level + 1
  return {
    level,
    streak: entry.streak + 1,
    dueDate: addDays(todayString(), nextInterval(level)),
  }
}

export function scheduleOnWrong(): ReviewSchedule {
  return {
    level: 0,
    streak: 0,
    dueDate: addDays(todayString(), 1),
  }
}
