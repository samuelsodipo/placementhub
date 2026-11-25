import type { Application } from './types'

const KEY = 'placementhub.applications.v1'

export function loadApplications(): Application[] {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function saveApplications(applications: Application[]): void {
  localStorage.setItem(KEY, JSON.stringify(applications))
}