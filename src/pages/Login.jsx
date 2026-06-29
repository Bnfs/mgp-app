import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError("Email ou mot de passe incorrect.")
      return
    }
    navigate('/')
  }

  return (
    <div className="container">
      <div className="card shadow-sm auth-card">
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <Logo size={56} />
          </div>
          <h3 className="card-title text-center mb-4">Connexion</h3>
          {error && <div className="alert alert-danger py-2">{error}</div>}
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
              <div className="input-group">
                <input
                  type={showPwd ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPwd((v) => !v)}
                  title={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          <p className="text-center mt-3 mb-0">
            Pas encore de compte ?{' '}
            <Link to="/inscription">Creer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
