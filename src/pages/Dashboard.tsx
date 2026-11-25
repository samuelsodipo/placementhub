import { useApplications } from '../context/ApplicationsContext'

export default function Dashboard() {
  const { applications } = useApplications()

  const applied = applications.filter(
    app => app.stage === 'applied'
  ).length

  const interviews = applications.filter(
    app => app.stage === 'interview'
  ).length

  const offers = applications.filter(
    app => app.stage === 'offer'
  ).length

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to PlacementHub!</p>
      <p>Track your internship and placement applications.</p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <div>
          <h3>Total Applications</h3>
          <h2>{applications.length}</h2>
        </div>

        <div>
          <h3>Applied</h3>
          <h2>{applied}</h2>
        </div>

        <div>
          <h3>Interviews</h3>
          <h2>{interviews}</h2>
        </div>

        <div>
          <h3>Offers</h3>
          <h2>{offers}</h2>
        </div>
      </div>
    </div>
  )
}