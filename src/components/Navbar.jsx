import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/connexion')
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary mb-4 shadow-sm">
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">
          🎓 MGP App
        </Link>
        <div className="ms-auto d-flex align-items-center gap-3">
          {user && (
            <>
              <span className="text-white-50 small d-none d-sm-inline">
                {user.email}
              </span>
              <button className="btn btn-light btn-sm" onClick={handleLogout}>
                Deconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
