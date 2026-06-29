import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres.')
      return
    }
    setLoading(true)
    const { data, error } = await signUp(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    // Si la confirmation email est desactivee, une session est creee directement.
    if (data.session) {
      navigate('/')
    } else {
      setMessage(
        'Compte cree ! Verifie ta boite mail pour confirmer ton adresse, puis connecte-toi.',
      )
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm auth-card">
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Creer un compte</h3>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {message && <div className="alert alert-success py-2">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Adresse email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <div className="form-text">Au moins 6 caracteres.</div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Creation...' : "S'inscrire"}
            </button>
          </form>
          <p className="text-center mt-3 mb-0">
            Deja un compte ? <Link to="/connexion">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
