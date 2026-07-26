-- Clear Terms: initial Supabase schema and access controls
create extension if not exists pgcrypto;
create type public.app_role as enum ('admin','moderator','viewer');
create type public.moderation_state as enum ('pending','under_review','published','rejected','unpublished','flagged');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, email text not null, role public.app_role not null default 'viewer',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.reviews (
  id uuid primary key default gen_random_uuid(), slug text unique, reviewer_name text not null,
  public_name text, email text not null, phone text, company_name text, service_type text,
  service_date date, amount_paid numeric(12,2), currency char(3) default 'AED',
  rating smallint check (rating between 1 and 5), title_original text not null, body_original text not null,
  title_public text, body_public text, desired_resolution text, company_contacted boolean default false,
  company_responded boolean default false, evidence_status text default 'unverified_personal_account',
  identity_status text default 'unconfirmed', moderation_status text not null default 'pending',
  public_moderator_note text, internal_notes text, published_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.documents (
  id uuid primary key default gen_random_uuid(), title text not null, slug text unique,
  document_date date, description text, category text not null, source text,
  private_file_path text, public_file_path text, verification_status text default 'awaiting_evidence',
  redaction_status text default 'not_reviewed', visibility text not null default 'private' check (visibility in ('private','public','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.review_attachments (
  id uuid primary key default gen_random_uuid(), review_id uuid not null references public.reviews(id) on delete cascade,
  private_file_path text not null, public_redacted_file_path text, file_name text not null, file_type text not null,
  file_size bigint not null check(file_size > 0), description text, redaction_status text default 'not_reviewed',
  visibility text not null default 'private', created_at timestamptz not null default now()
);
create table public.timeline_events (
  id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null,
  event_date date, description text not null, event_type text not null, evidence_status text not null,
  source_type text not null, sort_order integer not null default 0, moderation_status text not null default 'pending',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.timeline_documents (
  id uuid primary key default gen_random_uuid(), timeline_event_id uuid not null references public.timeline_events(id) on delete cascade,
  document_id uuid not null references public.documents(id) on delete cascade, unique(timeline_event_id,document_id)
);
create table public.company_responses (
  id uuid primary key default gen_random_uuid(), review_id uuid references public.reviews(id) on delete set null,
  respondent_name text not null, respondent_position text, company_email text not null, company_phone text,
  response_type text not null, response_original text not null, response_public text, identity_status text default 'unconfirmed',
  moderation_status text not null default 'submitted', public_note text, internal_notes text, published_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.articles (
  id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, excerpt text,
  content text not null, category text not null, tags text[] not null default '{}', featured_image text,
  seo_title text, meta_description text, author text, status text not null default 'draft',
  published_at timestamptz, updated_at timestamptz not null default now(), created_at timestamptz not null default now()
);
create table public.contact_requests (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text,
  enquiry_type text not null, subject text not null, message text not null, status text not null default 'new',
  internal_notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.moderation_logs (
  id uuid primary key default gen_random_uuid(), admin_id uuid not null references public.profiles(id),
  entity_type text not null, entity_id uuid not null, action text not null, previous_status text,
  new_status text, notes text, created_at timestamptz not null default now()
);
create table public.site_settings (
  id uuid primary key default gen_random_uuid(), setting_key text unique not null,
  setting_value jsonb not null default '{}', updated_at timestamptz not null default now()
);
create table public.faqs (
  id uuid primary key default gen_random_uuid(), question text not null, answer text not null,
  sort_order integer not null default 0, published boolean not null default false
);

create index reviews_moderation_idx on public.reviews(moderation_status,created_at desc);
create index reviews_published_idx on public.reviews(published_at desc) where moderation_status='published';
create index timeline_order_idx on public.timeline_events(moderation_status,sort_order);
create index articles_status_idx on public.articles(status,published_at desc);
create index responses_status_idx on public.company_responses(moderation_status,created_at desc);
create index contact_status_idx on public.contact_requests(status,created_at desc);

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path='' as
$$ select exists(select 1 from public.profiles where id=auth.uid() and role in ('admin','moderator')); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.review_attachments enable row level security;
alter table public.timeline_events enable row level security;
alter table public.timeline_documents enable row level security;
alter table public.documents enable row level security;
alter table public.company_responses enable row level security;
alter table public.articles enable row level security;
alter table public.contact_requests enable row level security;
alter table public.moderation_logs enable row level security;
alter table public.site_settings enable row level security;
alter table public.faqs enable row level security;

create policy "public published reviews" on public.reviews for select using (moderation_status='published');
create policy "public published timeline" on public.timeline_events for select using (moderation_status='published');
create policy "public redacted documents" on public.documents for select using (visibility='public' and public_file_path is not null);
create policy "public published responses" on public.company_responses for select using (moderation_status='published');
create policy "public published articles" on public.articles for select using (status='published');
create policy "public published faqs" on public.faqs for select using (published=true);
create policy "admins profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins reviews" on public.reviews for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins attachments" on public.review_attachments for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins timeline" on public.timeline_events for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins timeline docs" on public.timeline_documents for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins documents" on public.documents for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins responses" on public.company_responses for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins articles" on public.articles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins contacts" on public.contact_requests for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins logs" on public.moderation_logs for select to authenticated using (public.is_admin());
create policy "admins settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins faqs" on public.faqs for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
('private-evidence','private-evidence',false,10485760,array['application/pdf','image/jpeg','image/png','image/webp']),
('public-redacted','public-redacted',true,10485760,array['application/pdf','image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
create policy "admins private evidence" on storage.objects for all to authenticated using (bucket_id='private-evidence' and public.is_admin()) with check(bucket_id='private-evidence' and public.is_admin());
create policy "public reads redacted only" on storage.objects for select using(bucket_id='public-redacted');
create policy "admins manage redacted" on storage.objects for all to authenticated using(bucket_id='public-redacted' and public.is_admin()) with check(bucket_id='public-redacted' and public.is_admin());
