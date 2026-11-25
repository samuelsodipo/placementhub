export const STAGES = [
  'saved',
  'applied',
  'assessment',
  'interview',
  'offer',
  'rejected',
] as const

export type Stage = (typeof STAGES)[number]

export const STAGE_LABELS: Record<Stage, string> = {
  saved: 'Saved',
  applied: 'Applied',
  assessment: 'Assessment',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}

export const ROLE_TYPES = [
  'placement',
  'internship',
  'graduate_scheme',
] as const

export type RoleType = (typeof ROLE_TYPES)[number]

export const ROLE_LABELS: Record<RoleType, string> = {
  placement: 'Placement',
  internship: 'Internship',
  graduate_scheme: 'Graduate scheme',
}

export const WORK_MODES = [
  'onsite',
  'hybrid',
  'remote',
] as const

export type WorkMode = (typeof WORK_MODES)[number]

export const WORK_LABELS: Record<WorkMode, string> = {
  onsite: 'On-site',
  hybrid: 'Hybrid',
  remote: 'Remote',
}

export interface Application {
  id: string
  companyName: string
  jobTitle: string
  location: string
  workMode: WorkMode
  roleType: RoleType
  salaryMin: number | null
  salaryMax: number | null
  jobUrl: string
  stage: Stage
  deadline: string
  interviewDate: string
  notes: string
  createdAt: string
  updatedAt: string
}

export type ApplicationInput = Omit<
  Application,
  'id' | 'createdAt' | 'updatedAt'
>