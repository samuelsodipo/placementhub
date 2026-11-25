export function parseDate(value: string): Date | null {
  if (!value) return null

  const d = value.length === 10
    ? new Date(value + 'T00:00:00')
    : new Date(value)

  return isNaN(d.getTime()) ? null : d
}

export function formatDate(value: string): string {
  const d = parseDate(value)

  return d
    ? d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—'
}

export function formatDateTime(value: string): string {
  const d = parseDate(value)

  return d
    ? d.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—'
}

export function daysUntil(value: string): number | null {
  const d = parseDate(value)
  if (!d) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const target = new Date(d)
  target.setHours(0, 0, 0, 0)

  return Math.round(
    (target.getTime() - today.getTime()) / 86_400_000
  )
}

export function deadlineLabel(days: number): string {
  if (days < 0) return `${-days}d overdue`
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `${days} days`
}

const gbp = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export function formatSalary(
  min: number | null,
  max: number | null
): string {
  if (min !== null && max !== null)
    return `${gbp.format(min)} – ${gbp.format(max)}`

  if (min !== null) return `From ${gbp.format(min)}`
  if (max !== null) return `Up to ${gbp.format(max)}`

  return '—'
}

export function isoDateFromToday(offsetDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)

  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')

  return `${d.getFullYear()}-${mm}-${dd}`
}