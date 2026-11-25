import { useState } from 'react'
import { useApplications } from '../context/ApplicationsContext'
import type { Stage } from '../types'

export default function Applications() {
  const {
    applications,
    addApplication,
    deleteApplication,
    moveApplication,
  } = useApplications()

  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!company.trim() || !role.trim()) return

    addApplication({
      company: company.trim(),
      role: role.trim(),
      stage: 'applied',
    } as Parameters<typeof addApplication>[0])

    setCompany('')
    setRole('')
  }

  const stages: Stage[] = [
    'saved',
    'applied',
    'assessment',
    'interview',
    'offer',
    'rejected',
  ]

  return (
    <div>
      <h2>My Applications</h2>
      <p>Add and manage your internship applications.</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '10px', margin: '20px 0' }}
      >
        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Job title"
          value={role}
          onChange={e => setRole(e.target.value)}
          required
        />

        <button type="submit">Add Application</button>
      </form>

      {applications.length === 0 ? (
        <p>No applications yet. Add your first one above!</p>
      ) : (
        <div>
          {applications.map(app => (
            <div
              key={app.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px',
              }}
            >
              <h3>{app.company}</h3>
              <p>{app.role}</p>

              <label>
                Status:{' '}
                <select
                  value={app.stage}
                  onChange={e =>
                    moveApplication(app.id, e.target.value as Stage)
                  }
                >
                  {stages.map(stage => (
                    <option key={stage} value={stage}>
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <button
                onClick={() => deleteApplication(app.id)}
                style={{ marginLeft: '15px' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}