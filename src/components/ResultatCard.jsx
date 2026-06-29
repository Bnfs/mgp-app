import { gradeColor } from '../bareme'

// Affiche le bilan : MGP /4, MGP /20, moyenne, mention.
export default function ResultatCard({ resultat }) {
  const { mgp4, mgp20, moyenne20, mention, totalCredits, creditsValides } =
    resultat
  const couleur = gradeColor(mgp4)

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-white fw-semibold">📊 Tes resultats</div>
      <div className="card-body">
        <div className="row text-center g-3">
          <div
            className="col-6 col-md-3"
            title="Note officielle LMD, calculee sur les grades (points de 0 a 4 selon le bareme). Sur 4."
          >
            <div className={`result-number text-${couleur}`}>{mgp4}</div>
            <div className="text-muted small">
              MGP / 4 <span className="text-info">ⓘ</span>
            </div>
          </div>
          <div
            className="col-6 col-md-3"
            title="La MGP convertie sur 20 (MGP/4 x 5). C'est ta note officielle exprimee sur 20."
          >
            <div className={`result-number text-${couleur}`}>{mgp20}</div>
            <div className="text-muted small">
              MGP / 20 <span className="text-info">ⓘ</span>
            </div>
          </div>
          <div
            className="col-6 col-md-3"
            title="Moyenne classique de tes notes exactes (ponderee par les credits), convertie sur 20. Indicatif uniquement."
          >
            <div className="result-number text-secondary">{moyenne20}</div>
            <div className="text-muted small">
              Moyenne / 20 <span className="text-info">ⓘ</span>
            </div>
          </div>
          <div className="col-6 col-md-3" title="Appreciation correspondant a ta MGP.">
            <span className={`badge bg-${couleur} fs-6`}>{mention}</span>
            <div className="text-muted small mt-2">Mention</div>
          </div>
        </div>

        <div className="alert alert-light border small mt-3 mb-0">
          <strong>ⓘ Différence ?</strong> La <strong>MGP</strong> est ta note
          officielle : elle se base sur les <em>grades</em> (paliers du barème,
          ex. toute note ≥ 80 = 4.00). La <strong>Moyenne / 20</strong> est la
          moyenne de tes <em>notes exactes</em> — indicative seulement.
          <em> Survole chaque chiffre pour le détail.</em>
        </div>

        <hr />
        <div className="d-flex justify-content-between small text-muted">
          <span>Total credits : {totalCredits}</span>
          <span>Credits valides : {creditsValides}</span>
        </div>
      </div>
    </div>
  )
}
