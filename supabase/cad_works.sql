-- CAD Works gallery
-- Run this once in Supabase: Dashboard > SQL Editor > New query > Run.

create table if not exists public.cad_works (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text not null,
  category text,
  software text[] default '{}',
  member_id text,
  member_name text,
  source_url text,
  created_at timestamptz not null default now()
);

create index if not exists cad_works_created_at_idx on public.cad_works (created_at desc);
create index if not exists cad_works_category_idx on public.cad_works (category);

alter table public.cad_works enable row level security;

-- Anyone can read the gallery.
drop policy if exists "cad_works_public_read" on public.cad_works;
create policy "cad_works_public_read"
  on public.cad_works
  for select
  using (true);

-- Only signed-in admins can add, edit or remove works.
drop policy if exists "cad_works_admin_write" on public.cad_works;
create policy "cad_works_admin_write"
  on public.cad_works
  for all
  to authenticated
  using (true)
  with check (true);
