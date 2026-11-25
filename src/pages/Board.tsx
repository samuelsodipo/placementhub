import { useApplications } from '../context/ApplicationsContext'
import type { Stage } from '../types'

const stages: Stage[] = [
  'saved',
  'applied',
  'assessment',
  'interview',
  'offer',
  'rejected',
]

export default function Board() {
  const { applications, moveApplication } = useApplications()

  return (
    <div>
      <h2>Application Board</h2>
      <p>View and manage applications by status.</p>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          overflowX: 'auto',
          marginTop: '20px',
        }}
      >
        {stages.map(stage => (
          <div
            key={stage}
            style={{
              minWidth: '200px',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <h3>{stage.charAt(0).toUpperCase() + stage.slice(1)}</h3>

            {applications
              .filter(app => app.stage === stage)
              .map(app => (
                <div
                  key={app.id}
                  style={{
                    padding: '10px',
                    marginTop: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                  }}
                >
                  <strong>{app.company}</strong>
                  <p>{app.role}</p>

                  <select
                    value={app.stage}
                    onChange={e =>
                      moveApplication(app.id, e.target.value as Stage)
                    }
                  >
                    {stages.map(option => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}