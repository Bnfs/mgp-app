-- =============================================================
--  MIGRATION : ajoute la gestion des semestres (1 ou 2)
--  A executer dans Supabase > SQL Editor > New query > Run
--  (les matieres existantes seront mises en Semestre 1 par defaut)
-- =============================================================

alter table public.matieres
  add column if not exists semestre smallint not null default 1
  check (semestre in (1, 2));
