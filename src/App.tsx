import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type Application = {
  id: string
  company: string
  role: string
  status: string
  deadline?: string
}

const statuses = [
  'Saved',
  'Applied',
  'Assessment',
  'Interview',
  'Offer',
  'Rejected',
]

export default function App() {
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('placementhub') || '[]')
    } catch {
      return []
    }
  })

  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [deadline, setDeadline] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('placementhub', JSON.stringify(applications))
  }, [applications])

  function addApplication(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!company.trim() || !role.trim()) return

    const newApplication: Application = {
      id: crypto.randomUUID(),
      company: company.trim(),
      role: role.trim(),
      status: 'Applied',
      deadline,
    }

    setApplications(previous => [newApplication, ...previous])

    setCompany('')
    setRole('')
    setDeadline('')
  }

  function updateStatus(id: string, status: string) {
    setApplications(previous =>
      previous.map(app =>
        app.id === id ? { ...app, status } : app
      )
    )
  }

  function deleteApplication(id: string) {
    setApplications(previous =>
      previous.filter(app => app.id !== id)
    )
  }

  function editApplication(id: string) {
    const app = applications.find(a => a.id === id)

    if (!app) return

    const updatedCompany = window.prompt(
      'Edit company name:',
      app.company
    )

    if (updatedCompany === null || !updatedCompany.trim()) return

    const updatedRole = window.prompt(
      'Edit job title:',
      app.role
    )

    if (updatedRole === null || !updatedRole.trim()) return

    setApplications(previous =>
      previous.map(a =>
        a.id === id
          ? {
              ...a,
              company: updatedCompany.trim(),
              role: updatedRole.trim(),
            }
          : a
      )
    )
  }

  const filtered = applications.filter(app => {
    const matchesSearch = `${app.company} ${app.role}`
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  function formatDeadline(date: string) {
    return new Date(date + 'T00:00:00').toLocaleDateString('en-GB')
  }

  return (
    <div className="container">
      <header>
        <h1>PlacementHub</h1>
        <p>Your internship application tracker</p>
      </header>

      <section className="stats">
        <div className="card">
          <h3>Total Applications</h3>
          <h2>{applications.length}</h2>
        </div>

        <div className="card">
          <h3>Applied</h3>
          <h2>
            {applications.filter(a => a.status === 'Applied').length}
          </h2>
        </div>

        <div className="card">
          <h3>Interviews</h3>
          <h2>
            {applications.filter(a => a.status === 'Interview').length}
          </h2>
        </div>

        <div className="card">
          <h3>Offers</h3>
          <h2>
            {applications.filter(a => a.status === 'Offer').length}
          </h2>
        </div>
      </section>

      <section className="card">
        <h2>Add Application</h2>

        <form onSubmit={addApplication}>
          <input
            placeholder="Company name"
            value={company}
            onChange={e => setCompany(e.target.value)}
            required
          />

          <input
            placeholder="Job title"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          />

          <input
            type="date"
            aria-label="Application deadline"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />

          <button type="submit">
            Add Application
          </button>
        </form>
      </section>

      <section className="card">
        <h2>My Applications</h2>

        <div className="filters">
          <input
            placeholder="Search applications..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            aria-label="Filter applications by status"
          >
            <option value="All">All statuses</option>

            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          filtered.map(app => (
            <div className="application" key={app.id}>
              <div>
                <h3>{app.company}</h3>
                <p>{app.role}</p>

                {app.deadline && (
                  <p>
                    Deadline: {formatDeadline(app.deadline)}
                  </p>
                )}
              </div>

              <select
                value={app.status}
                onChange={e => updateStatus(app.id, e.target.value)}
                aria-label={`Status for ${app.company}`}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => editApplication(app.id)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete"
                onClick={() => deleteApplication(app.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  )
}