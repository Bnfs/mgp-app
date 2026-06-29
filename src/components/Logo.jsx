// ⬇️ Texte affiche sous "MGP" dans le logo. Modifie cette ligne si besoin
//    (par ex. mets le nom de ton ecole quand tu l'auras).
export const NOM_ECOLE = 'Calculateur de moyenne'

// Logo provisoire : une toque de diplome (mortarboard) en SVG + le nom de l'ecole.
// Remplacable plus tard par le vrai logo (voir <Logo /> et le composant image).
export default function Logo({ size = 36, showText = true, light = false }) {
  return (
    <span className="d-inline-flex align-items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label="Logo MGP"
      >
        <circle cx="32" cy="32" r="31" fill={light ? '#ffffff' : '#0d6efd'} />
        <g fill={light ? '#0d6efd' : '#ffffff'}>
          {/* planche de la toque */}
          <polygon points="32,15 57,26 32,37 7,26" />
          {/* base de la toque (le bonnet) */}
          <path d="M17 30.5 v8.5 c0 4.2 30 4.2 30 0 v-8.5 l-15 6.2 z" />
          {/* ficelle du gland */}
          <rect x="55" y="26" width="2.2" height="13" rx="1.1" />
          {/* gland */}
          <circle cx="56.1" cy="41" r="3.2" />
        </g>
      </svg>
      {showText && (
        <span className="d-flex flex-column lh-1 text-start">
          <span className={`fw-bold ${light ? 'text-white' : ''}`}>
            MGP
          </span>
          <small
            className={light ? 'text-white-50' : 'text-muted'}
            style={{ fontSize: '0.62rem' }}
          >
            {NOM_ECOLE}
          </small>
        </span>
      )}
    </span>
  )
}
