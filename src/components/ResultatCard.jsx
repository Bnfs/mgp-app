import { gradeColor } from '../bareme'

// Affiche le bilan facon releve : MGP /100, MGP /20, qualite de points, cote, mention.
export default function ResultatCard({ resultat, creditsRequis }) {
  const { mgp100, mgp20, qualitePoints, cote, mention, totalCredits, creditsValides } =
    resultat
  const couleur = gradeColor(qualitePoints)

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-white fw-semibold">📊 Tes resultats</div>
      <div className="card-body">
        <div className="row text-center g-3">
          <div
            className="col-6 col-md-3"
            title="Moyenne Generale Ponderee = somme(note x credits) / total credits. Sur 100."
          >
            <div className={`result-number text-${couleur}`}>{mgp100}</div>
            <div className="text-muted small">
              MGP / 100 <span className="text-info">ⓘ</span>
            </div>
          </div>
          <div
            className="col-6 col-md-3"
            title="La MGP exprimee sur 20 (MGP/100 divisee par 5)."
          >
            <div className={`result-number text-${couleur}`}>{mgp20}</div>
            <div className="text-muted small">
              MGP / 20 <span className="text-info">ⓘ</span>
            </div>
          </div>
          <div
            className="col-6 col-md-3"
            title="Cote et qualite de points : on place la MGP/100 dans le bareme. Sur 4."
          >
            <div className={`result-number text-${couleur}`}>
              {qualitePoints.toFixed(2)}
            </div>
            <div className="text-muted small">
              Points / 4 ·{' '}
              <span className={`badge bg-${couleur}`}>{cote}</span>
            </div>
          </div>
          <div className="col-6 col-md-3" title="Appreciation correspondant a ta MGP.">
            <span className={`badge bg-${couleur} fs-6`}>{mention}</span>
            <div className="text-muted small mt-2">Mention</div>
          </div>
        </div>

        <div className="alert alert-light border small mt-3 mb-0">
          <strong>ⓘ Méthode :</strong> la <strong>MGP</strong> est la moyenne de
          tes notes <em>pondérée par les crédits</em> (ex. {mgp100}/100). On
          place ensuite cette moyenne dans le barème pour obtenir la{' '}
          <strong>côte</strong> ({cote}) et la <strong>qualité de points</strong>{' '}
          ({qualitePoints.toFixed(2)}/4).
        </div>

        <hr />
        <div className="d-flex justify-content-between flex-wrap gap-2 small text-muted">
          <span>Credits requis : {creditsRequis}</span>
          <span>Total credits saisis : {totalCredits}</span>
          <span>Credits valides : {creditsValides}</span>
        </div>
      </div>
    </div>
  )
}
