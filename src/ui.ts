import type { Stage } from './types'

export const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500'

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'

export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'

export const cardCls =
  'rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'

export const STAGE_BADGE: Record<Stage, string> = {
  saved: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  applied: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  assessment: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  interview: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  offer: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
}

export const STAGE_DOT: Record<Stage, string> = {
  saved: 'bg-slate-400',
  applied: 'bg-blue-500',
  assessment: 'bg-amber-500',
  interview: 'bg-violet-500',
  offer: 'bg-emerald-500',
  rejected: 'bg-rose-500',
}