import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { calculerMGP, getGrade, gradeColor } from '../bareme'
import ResultatCard from '../components/ResultatCard'

export default function Dashboard() {
  const { user } = useAuth()
  const [matieres, setMatieres] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Champs du formulaire d'ajout.
  const [nom, setNom] = useState('')
  const [credit, setCredit] = useState('')
  const [note, setNote] = useState('')

  // Charge les matieres de l'utilisateur au montage.
  useEffect(() => {
    let actif = true
    async function charger() {
      setLoading(true)
      const { data, error } = await supabase
        .from('matieres')
        .select('*')
        .order('created_at', { ascending: true })
      if (!actif) return
      if (error) setError(error.message)
      else setMatieres(data ?? [])
      setLoading(false)
    }
    charger()
    return () => {
      actif = false
    }
  }, [])

  const resultat = useMemo(() => calculerMGP(matieres), [matieres])

  async function ajouterMatiere(e) {
    e.preventDefault()
    setError('')
    const c = Number(credit)
    const n = Number(note)
    if (!nom.trim()) return setError('Donne un nom a la matiere.')
    if (!(c > 0)) return setError('Le credit doit etre superieur a 0.')
    if (n < 0 || n > 100 || note === '')
      return setError('La note doit etre comprise entre 0 et 100.')

    setSaving(true)
    const { data, error } = await supabase
      .from('matieres')
      .insert({ nom: nom.trim(), credit: c, note: n, user_id: user.id })
      .select()
      .single()
    setSaving(false)
    if (error) return setError(error.message)

    setMatieres((prev) => [...prev, data])
    setNom('')
    setCredit('')
    setNote('')
  }

  async function supprimerMatiere(id) {
    const sauvegarde = matieres
    setMatieres((prev) => prev.filter((m) => m.id !== id)) // maj optimiste
    const { error } = await supabase.from('matieres').delete().eq('id', id)
    if (error) {
      setError(error.message)
      setMatieres(sauvegarde) // rollback en cas d'echec
    }
  }

  return (
    <div className="container pb-5">
      <h2 className="mb-4">Mon espace MGP</h2>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <ResultatCard resultat={resultat} />

      {/* Formulaire d'ajout */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white fw-semibold">
          ➕ Ajouter une matiere (UE)
        </div>
        <div className="card-body">
          <form onSubmit={ajouterMatiere} className="row g-3 align-items-end">
            <div className="col-12 col-md-5">
              <label className="form-label">Nom de la matiere</label>
              <input
                className="form-control"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex : Algorithmique"
              />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label">Credit</label>
              <input
                type="number"
                min="0"
                step="0.5"
                className="form-control"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                placeholder="Ex : 4"
              />
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label">Note /100</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                className="form-control"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ex : 72"
              />
            </div>
            <div className="col-12 col-md-2 d-grid">
              <button className="btn btn-primary" disabled={saving}>
                {saving ? '...' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tableau des matieres */}
      <div className="card shadow-sm">
        <div className="card-header bg-white fw-semibold">
          📚 Mes matieres
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : matieres.length === 0 ? (
            <p className="text-muted text-center my-4">
              Aucune matiere pour l'instant. Ajoute ta premiere UE ci-dessus.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Matiere</th>
                    <th className="text-center">Credit</th>
                    <th className="text-center">Note /100</th>
                    <th className="text-center">Grade</th>
                    <th className="text-center">Points</th>
                    <th className="text-center">Mention</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {matieres.map((m) => {
                    const g = getGrade(m.note)
                    return (
                      <tr key={m.id}>
                        <td>{m.nom}</td>
                        <td className="text-center">{m.credit}</td>
                        <td className="text-center">{m.note}</td>
                        <td className="text-center">
                          <span className={`badge bg-${gradeColor(g.points)}`}>
                            {g.grade}
                          </span>
                        </td>
                        <td className="text-center">{g.points.toFixed(2)}</td>
                        <td className="text-center small">{g.mention}</td>
                        <td className="text-end table-actions">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => supprimerMatiere(m.id)}
                            title="Supprimer"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
