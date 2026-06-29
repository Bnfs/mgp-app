import { Routes, Route, Navigate } from 'react-router-dom'
import { supabaseConfigured } from './supabaseClient'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function ConfigWarning() {
  return (
    <div className="container mt-5">
      <div className="alert alert-warning">
        <h5 className="alert-heading">⚙️ Configuration Supabase manquante</h5>
        <p>
          Cree un fichier <code>.env</code> a la racine du projet (a partir de{' '}
          <code>.env.example</code>) avec ton URL et ta cle Supabase, puis
          relance <code>npm run dev</code>.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      {!supabaseConfigured && <ConfigWarning />}
      <Routes>
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="container text-center footer-note my-4">
        Calculateur de MGP — systeme LMD (note /100 → MGP /4 → /20)
      </footer>
    </>
  )
}
