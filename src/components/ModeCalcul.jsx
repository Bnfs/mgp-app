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
          <h6 className="fw-semibold">1. La formule</h6>
          <p className="mb-1">
            Chaque note (/100) est convertie en <strong>points</strong> (0 à 4)
            selon le barème ci-dessous, puis :
          </p>
          <ul className="mb-3">
            <li>
              <code>MGP /4 = Σ(crédit × points) ÷ Σ(crédits)</code>
            </li>
            <li>
              <code>MGP /20 = MGP/4 × 5</code>
            </li>
            <li>
              La <strong>Moyenne /20</strong> est la moyenne pondérée de tes
              notes exactes (info indicative).
            </li>
          </ul>

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
