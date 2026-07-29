import { PLAN_START_DATE } from '#shared/plan'

const DAY_MS = 24 * 60 * 60 * 1000

export function calcCurrentWeek(date: Date | string = new Date()): number {
  const d = typeof date === 'string' ? new Date(`${date}T00:00:00Z`) : date
  const start = new Date(`${PLAN_START_DATE}T00:00:00Z`)
  start.setUTCDate(start.getUTCDate() - (start.getUTCDay() + 6) % 7)
  const diffDays = Math.floor((d.getTime() - start.getTime()) / DAY_MS)
  const week = Math.floor(diffDays / 7) + 1
  return Math.min(12, Math.max(1, week))
}
