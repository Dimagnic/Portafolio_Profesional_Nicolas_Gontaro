-- Ejecuta este script en Supabase → SQL Editor.
-- 1) Cambia TU_CORREO@dominio.com por el correo con el que vas a entrar al panel Admin.
-- 2) Crea ese usuario en Authentication → Users (email + contraseña).
-- 3) Recomendado: Authentication → Sign In / Providers → desactiva "Allow new users to sign up".

create table if not exists public.site_content (
  id         text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "site_content lectura publica" on public.site_content;
create policy "site_content lectura publica"
  on public.site_content for select using (true);

drop policy if exists "site_content escritura admin" on public.site_content;
create policy "site_content escritura admin"
  on public.site_content for all
  using      ((auth.jwt() ->> 'email') = 'nicolas.gontaro3@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'nicolas.gontaro3@gmail.com');

-- Bucket público para las imágenes y el video que subas desde el panel
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists "media lectura publica" on storage.objects;
create policy "media lectura publica"
  on storage.objects for select using (bucket_id = 'portfolio-media');

drop policy if exists "media escritura admin" on storage.objects;
create policy "media escritura admin"
  on storage.objects for all
  using      (bucket_id = 'portfolio-media' and (auth.jwt() ->> 'email') = 'nicolas.gontaro3@gmail.com')
  with check (bucket_id = 'portfolio-media' and (auth.jwt() ->> 'email') = 'nicolas.gontaro3@gmail.com');
