// =============================================================
//  Bareme de notation (systeme LMD - note sur 100)
//  Source : grille fournie par l'utilisateur.
//  Modifie librement les valeurs ci-dessous si ta fac change la grille.
// =============================================================

// Chaque entree : note minimale (incluse) -> grade, points (/4), mention.
// L'ambiguite du 34 (E vs D-) est resolue ici : 34+ => D-, 30 a 33 => E.
export const BAREME = [
  { min: 80, grade: 'A+', points: 4.0, mention: 'Excellent' },
  { min: 75, grade: 'A-', points: 3.7, mention: 'Tres Bien' },
  { min: 70, grade: 'B+', points: 3.3, mention: 'Bien' },
  { min: 65, grade: 'B', points: 3.0, mention: 'Assez Bien' },
  { min: 60, grade: 'B-', points: 2.7, mention: 'Assez Bien' },
  { min: 55, grade: 'C+', points: 2.3, mention: 'Passable' },
  { min: 50, grade: 'C', points: 2.0, mention: 'Passable' },
  { min: 45, grade: 'C-', points: 1.7, mention: 'CANT' },
  { min: 40, grade: 'D+', points: 1.3, mention: 'CANT' },
  { min: 34, grade: 'D-', points: 1.0, mention: 'CANT' },
  { min: 30, grade: 'E', points: 0.0, mention: 'Echec' },
  { min: 0, grade: 'F', points: 0.0, mention: 'Echec' },
]

// Retourne l'entree du bareme correspondant a une note /100.
export function getGrade(note) {
  const n = Number(note)
  if (Number.isNaN(n)) return null
  return BAREME.find((b) => n >= b.min) ?? BAREME[BAREME.length - 1]
}

// Couleur Bootstrap pour afficher le grade joliment.
export function gradeColor(points) {
  if (points >= 3.3) return 'success'
  if (points >= 2.0) return 'primary'
  if (points >= 1.0) return 'warning'
  return 'danger'
}

// Note minimale (sur 100) pour valider le credit d'une UE (grade C ou mieux).
export const SEUIL_VALIDATION = 50

// =============================================================
//  Calcul de la MGP
//  matieres = [{ nom, credit, note }]  (note sur 100)
// =============================================================
export function calculerMGP(matieres) {
  const valides = matieres.filter(
    (m) => Number(m.credit) > 0 && m.note !== '' && m.note !== null && m.note !== undefined,
  )

  const totalCredits = valides.reduce((s, m) => s + Number(m.credit), 0)

  if (totalCredits === 0) {
    return {
      totalCredits: 0,
      creditsValides: 0,
      mgp4: 0,
      mgp20: 0,
      moyenne100: 0,
      moyenne20: 0,
      mention: '-',
      details: [],
    }
  }

  let sommePoints = 0 // somme(credit * points)
  let sommeNotes = 0 // somme(credit * note/100)
  let creditsValides = 0 // credits des UE validees (note >= SEUIL_VALIDATION)

  const details = valides.map((m) => {
    const g = getGrade(m.note)
    const credit = Number(m.credit)
    sommePoints += credit * g.points
    sommeNotes += credit * Number(m.note)
    if (Number(m.note) >= SEUIL_VALIDATION) creditsValides += credit
    return { ...m, ...g }
  })

  const mgp4 = sommePoints / totalCredits // sur 4
  const mgp20 = mgp4 * 5 // conversion /4 -> /20
  const moyenne100 = sommeNotes / totalCredits // moyenne ponderee /100
  const moyenne20 = moyenne100 / 5 // /100 -> /20

  // Mention globale basee sur la MGP /4 (memes seuils que le bareme).
  const mention = getGrade(mgp4 * 25).mention // mgp4*25 ramene /4 -> /100

  return {
    totalCredits,
    creditsValides,
    mgp4: round(mgp4),
    mgp20: round(mgp20),
    moyenne100: round(moyenne100),
    moyenne20: round(moyenne20),
    mention,
    details,
  }
}

function round(x) {
  return Math.round(x * 100) / 100
}
