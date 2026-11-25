import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Application, ApplicationInput, Stage } from '../types'
import { loadApplications, saveApplications } from '../storage'

interface ApplicationsContextValue {
  applications: Application[]
  addApplication: (data: ApplicationInput) => void
  updateApplication: (id: string, data: ApplicationInput) => void
  deleteApplication: (id: string) => void
  moveApplication: (id: string, stage: Stage) => void
  formOpen: boolean
  editing: Application | null
  openForm: (app?: Application) => void
  closeForm: () => void
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null)

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(loadApplications)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Application | null>(null)

  useEffect(() => {
    saveApplications(applications)
  }, [applications])

  function addApplication(data: ApplicationInput) {
    const now = new Date().toISOString()
    setApplications(prev => [
      { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
      ...prev,
    ])
  }

  function updateApplication(id: string, data: ApplicationInput) {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, ...data, updatedAt: new Date().toISOString() }
          : app
      )
    )
  }

  function deleteApplication(id: string) {
    setApplications(prev => prev.filter(app => app.id !== id))
  }

  function moveApplication(id: string, stage: Stage) {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, stage, updatedAt: new Date().toISOString() }
          : app
      )
    )
  }

  function openForm(app?: Application) {
    setEditing(app ?? null)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        moveApplication,
        formOpen,
        editing,
        openForm,
        closeForm,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  )
}

export function useApplications() {
  const context = useContext(ApplicationsContext)

  if (!context) {
    throw new Error('useApplications must be used inside ApplicationsProvider')
  }

  return context
}