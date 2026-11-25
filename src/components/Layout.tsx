import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>
      <header>
        <h1>PlacementHub</h1>
        <p>My Internship Application Tracker</p>

        <nav style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/applications">Applications</NavLink>
          <NavLink to="/board">Board</NavLink>
        </nav>
      </header>

      <hr style={{ margin: '24px 0' }} />

      <main>
        <Outlet />
      </main>
    </div>
  )
}