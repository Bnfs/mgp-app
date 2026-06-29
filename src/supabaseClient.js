import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Avertissement clair si la config est manquante (evite les erreurs obscures).
export const supabaseConfigured = Boolean(url && anonKey)

if (!supabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase non configure : cree un fichier .env a partir de .env.example ' +
      'avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.',
  )
}

export const supabase = supabaseConfigured
  ? createClient(url, anonKey)
  : null
