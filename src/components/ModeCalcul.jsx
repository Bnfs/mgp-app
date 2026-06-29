import { useState } from 'react'
import { BAREME, SEUIL_VALIDATION } from '../bareme'

// Encadre depliable expliquant comment la MGP est calculee.
export default function ModeCalcul() {
  const [ouvert, setOuvert] = useState(false)

  return (
    <div className="card shadow-sm mb-4">
      <button
        type="button"
        className="card-header bg-white fw-semibold d-flex justify-content-between align-items-center w-100 border-0"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
      >
        <span>ⓘ Comment est calculée ma MGP ?</span>
        <span className="text-muted">{ouvert ? '▲' : '▼'}</span>
      </button>

      {ouvert && (
        <div className="card-body">
          <h6 className="fw-semibold">1. La formule (dans le bon ordre)</h6>
          <ol className="mb-3">
            <li>
              On fait la <strong>moyenne des notes /100, pondérée par les
              crédits</strong> :<br />
              <code>MGP = Σ(note × crédit) ÷ Σ(crédits)</code>
            </li>
            <li>
              On l'exprime sur 20 : <code>MGP /20 = MGP /100 ÷ 5</code>
            </li>
            <li>
              On place <strong>cette moyenne</strong> dans le barème ci-dessous
              pour obtenir la <strong>côte</strong> et la{' '}
              <strong>qualité de points</strong> (/4).
            </li>
          </ol>
          <p className="alert alert-warning py-2 small mb-3">
            ⚠️ <strong>À ne pas faire :</strong> calculer la moyenne des qualités
            de points directement donnerait un résultat <em>faux</em>. On fait
            toujours la moyenne des <strong>notes</strong> d'abord, puis la
            conversion en points.
          </p>

          <h6 className="fw-semibold">2. Le barème (note /100 → points)</h6>
          <div className="table-responsive">
            <table className="table table-sm table-bordered mb-3">
              <thead className="table-light">
                <tr>
                  <th>Note /100</th>
                  <th className="text-center">Grade</th>
                  <th className="text-center">Points</th>
                  <th>Mention</th>
                </tr>
              </thead>
              <tbody>
                {BAREME.map((b, i) => {
                  const max = i === 0 ? 100 : BAREME[i - 1].min - 1
                  return (
                    <tr key={b.grade}>
                      <td>
                        {b.min} – {max}
                      </td>
                      <td className="text-center">{b.grade}</td>
                      <td className="text-center">{b.points.toFixed(2)}</td>
                      <td>{b.mention}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <h6 className="fw-semibold">3. Validation des crédits</h6>
          <p className="mb-0">
            Une matière <strong>valide</strong> ses crédits si sa note est{' '}
            <strong>≥ {SEUIL_VALIDATION}/100</strong> (grade C ou mieux). En
            dessous (grades E et F), les crédits ne sont pas validés.
          </p>
        </div>
      )}
    </div>
  )
}
