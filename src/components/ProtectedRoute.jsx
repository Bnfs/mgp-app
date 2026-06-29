import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Empeche l'acces au tableau de bord si l'utilisateur n'est pas connecte.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/connexion" replace />

  return children
}
