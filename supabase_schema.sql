-- =============================================================
--  Schema a executer dans Supabase (SQL Editor > New query > Run)
--  Cree la table des matieres + securite par utilisateur (RLS).
-- =============================================================

create table if not exists public.matieres (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade default auth.uid(),
  nom         text not null,
  credit      numeric not null check (credit > 0),
  note        numeric not null check (note >= 0 and note <= 100),
  created_at  timestamptz not null default now()
);

-- Active la securite au niveau des lignes.
alter table public.matieres enable row level security;

-- Chaque utilisateur ne voit et ne modifie QUE ses propres matieres.
drop policy if exists "matieres_owner" on public.matieres;
create policy "matieres_owner"
  on public.matieres
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Index pour charger rapidement les matieres d'un utilisateur.
create index if not exists matieres_user_id_idx on public.matieres (user_id);
