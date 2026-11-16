-- ===========================================================================
-- Private Transfers Across Saudi — CRM schema
-- ===========================================================================
-- Run this once in the Supabase SQL editor (or `supabase db push`) against a
-- NEW, EMPTY project. It is idempotent: re-running it is safe and will not drop
-- data.
--
-- Access model: every read and write happens server-side through the
-- service-role key (see lib/crm/supabase.ts). Row Level Security is enabled on
-- every table with NO policies at all, so the anon and authenticated roles --
-- i.e. anything a browser could hold -- can read nothing and write nothing.
-- The service-role key bypasses RLS by design and must never be exposed to a
-- client bundle.
--
-- No data from any previous project is imported here. These tables start empty.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Shared trigger: keep updated_at honest
-- ---------------------------------------------------------------------------
create or replace function public.crm_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- crm_users — CRM accounts and roles
-- ---------------------------------------------------------------------------
-- Passwords are bcrypt-hashed inside Postgres via pgcrypto, reached only
-- through the SECURITY DEFINER functions below. A plaintext password is never
-- stored, and neither the plaintext nor the hash is ever returned to the
-- application: verification returns the account row without the hash column.
--
-- Roles, narrowest first:
--   agent   — read leads, add notes, change status, email a customer
--   manager — everything an agent can do, plus edit and delete leads and
--             create and send quotations and invoices
--   owner   — everything, plus manage CRM users
create table if not exists public.crm_users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  name          text,
  role          text not null default 'agent'
                  check (role in ('owner', 'manager', 'agent')),
  is_active     boolean not null default true,
  last_login_at timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists crm_users_email_idx on public.crm_users (lower(email));

drop trigger if exists crm_users_set_updated_at on public.crm_users;
create trigger crm_users_set_updated_at
  before update on public.crm_users
  for each row execute function public.crm_set_updated_at();

-- ---------------------------------------------------------------------------
-- leads — the core record
-- ---------------------------------------------------------------------------
-- Column names follow the website's enquiry contract (lib/inquiry/schema.ts).
-- All free-text columns are `text`, which in Postgres is UTF-8, so Arabic is
-- stored verbatim with no transliteration, escaping or length surprises.
create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),

  -- The customer-quotable reference, and the intake idempotency key.
  --
  -- The website derives it from the form's per-render submission id, so a
  -- double-click, a retried Server Action or a browser replaying the POST all
  -- carry the same reference. Because it is unique, the second write loses:
  -- `createLead` reads the existing row back instead of inserting a twin. That
  -- is the whole duplicate-suppression mechanism, and it lives in the database
  -- rather than in application timing.
  reference        text not null unique,

  -- Contact
  full_name        text,
  email            text,
  phone            text,

  -- Journey
  service_type     text,
  pickup_location  text,
  dropoff_location text,
  date             text,
  time             text,
  passengers       text,
  luggage          text,
  vehicle_type     text,
  flight_number    text,
  message          text,

  -- Provenance. `locale` is the language the enquiry was made in, so a reply
  -- goes out in the language the customer used.
  locale           text not null default 'en' check (locale in ('en', 'ar')),
  source           text not null default 'website',
  source_page      text,

  -- Multi-touch attribution, captured by the quote form's hidden inputs.
  -- First-touch columns persist across sessions; the unprefixed ones describe
  -- the session that converted. Internal only: none of this is ever shown to
  -- a customer or included in a customer-facing email.
  first_landing_page text,
  first_referrer     text,
  first_utm_source   text,
  first_utm_medium   text,
  first_utm_campaign text,
  landing_page       text,
  referrer           text,
  utm_source         text,
  utm_medium         text,
  utm_campaign       text,
  gclid              text,
  search_source      text,

  -- Pipeline
  status           text not null default 'New'
                     check (status in ('New', 'Contacted', 'Quoted',
                                       'Confirmed', 'Completed', 'Cancelled')),
  assigned_to      uuid references public.crm_users(id) on delete set null,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists leads_created_at_idx  on public.leads (created_at desc);
create index if not exists leads_status_idx      on public.leads (status);
create index if not exists leads_assigned_to_idx on public.leads (assigned_to);
create index if not exists leads_locale_idx      on public.leads (locale);
create index if not exists leads_reference_idx   on public.leads (reference);
-- Campaign reporting reads these two far more than the rest of the
-- attribution block, so only they are indexed.
create index if not exists leads_utm_source_idx       on public.leads (utm_source);
create index if not exists leads_first_utm_source_idx on public.leads (first_utm_source);

-- Backs the lead search box. `gin_trgm_ops` would be better for substring
-- matching at scale; plain btree indexes above already serve the filters, and
-- search uses ILIKE across a handful of columns, which is correct and fast
-- enough well past the volume this desk will see. Revisit with pg_trgm if the
-- table passes ~100k rows.

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.crm_set_updated_at();

-- ---------------------------------------------------------------------------
-- lead_notes — internal notes, never shown to a customer
-- ---------------------------------------------------------------------------
create table if not exists public.lead_notes (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references public.leads(id) on delete cascade,
  -- Author is kept two ways on purpose: the FK for joins, and a snapshot of
  -- the email so a note still says who wrote it after that account is removed.
  author_id    uuid references public.crm_users(id) on delete set null,
  author_email text,
  body         text not null,
  created_at   timestamptz not null default now()
);

create index if not exists lead_notes_lead_id_idx on public.lead_notes (lead_id, created_at desc);

-- ---------------------------------------------------------------------------
-- lead_events — the audit trail and communication history
-- ---------------------------------------------------------------------------
-- Every state change and every outbound message lands here, so a lead's page
-- can show what happened and who did it. Append-only in practice: nothing in
-- the application updates or deletes a row.
create table if not exists public.lead_events (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  type        text not null
                check (type in ('created', 'status_changed', 'assigned',
                                'note_added', 'email_sent', 'email_failed',
                                'updated')),
  summary     text not null,
  detail      jsonb not null default '{}'::jsonb,
  actor_id    uuid references public.crm_users(id) on delete set null,
  actor_email text,
  created_at  timestamptz not null default now()
);

create index if not exists lead_events_lead_id_idx on public.lead_events (lead_id, created_at desc);
create index if not exists lead_events_type_idx    on public.lead_events (type);

-- ---------------------------------------------------------------------------
-- email_logs — what was actually sent, and what failed
-- ---------------------------------------------------------------------------
-- A failed send is recorded as deliberately as a successful one. Without that,
-- "the customer never got the email" is unanswerable.
create table if not exists public.email_logs (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid references public.leads(id) on delete cascade,
  template    text not null,
  subject     text not null,
  sent_to     text not null,
  body        text,
  status      text not null default 'sent'
                check (status in ('sent', 'failed', 'skipped')),
  provider_id text,
  error       text,
  created_at  timestamptz not null default now()
);

create index if not exists email_logs_lead_id_idx on public.email_logs (lead_id, created_at desc);
create index if not exists email_logs_status_idx  on public.email_logs (status);

-- ---------------------------------------------------------------------------
-- quotations — customer-facing estimates
-- ---------------------------------------------------------------------------
-- Client and journey fields are snapshotted at creation rather than joined
-- live from `leads`, so a sent quotation keeps saying what it said when it was
-- sent, even if the lead is later edited or deleted. Delivered by an
-- unguessable public_token, never by the primary key.
create table if not exists public.quotations (
  id                  uuid primary key default gen_random_uuid(),
  quote_number        text not null unique,
  public_token        text not null unique default encode(gen_random_bytes(16), 'hex'),

  lead_id             uuid references public.leads(id) on delete set null,

  client_name         text,
  client_email        text,
  client_phone        text,
  locale              text not null default 'en' check (locale in ('en', 'ar')),

  service_type        text,
  pickup_location     text,
  dropoff_location    text,
  date                text,
  time                text,
  flight_number       text,
  passengers          text,
  luggage             text,
  vehicle_type        text,
  special_requests    text,

  -- [{ description, vehicleType, passengers, luggage, amount }]
  line_items          jsonb not null default '[]'::jsonb,
  currency            text not null default 'SAR',
  -- Kept in step with the sum of line_items by the application on every write,
  -- so an explicit discount can be recorded without inventing a line item.
  -- Deliberately not a generated column.
  total_amount        numeric(12, 2) not null default 0,

  payment_terms       text,
  cancellation_policy text,
  notes               text,

  status              text not null default 'Draft'
                        check (status in ('Draft', 'Sent', 'Accepted',
                                          'Declined', 'Expired')),
  quote_date          date not null default current_date,
  valid_until         date,

  created_by          uuid references public.crm_users(id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists quotations_created_at_idx   on public.quotations (created_at desc);
create index if not exists quotations_lead_id_idx      on public.quotations (lead_id);
create index if not exists quotations_public_token_idx on public.quotations (public_token);
create index if not exists quotations_status_idx       on public.quotations (status);

drop trigger if exists quotations_set_updated_at on public.quotations;
create trigger quotations_set_updated_at
  before update on public.quotations
  for each row execute function public.crm_set_updated_at();

-- ---------------------------------------------------------------------------
-- invoices — customer-facing bills
-- ---------------------------------------------------------------------------
create table if not exists public.invoices (
  id               uuid primary key default gen_random_uuid(),
  invoice_number   text not null unique,
  public_token     text not null unique default encode(gen_random_bytes(16), 'hex'),

  lead_id          uuid references public.leads(id) on delete set null,
  quotation_id     uuid references public.quotations(id) on delete set null,

  client_name      text,
  client_email     text,
  client_phone     text,
  locale           text not null default 'en' check (locale in ('en', 'ar')),

  service_type     text,
  pickup_location  text,
  dropoff_location text,
  date             text,
  time             text,

  line_items       jsonb not null default '[]'::jsonb,
  currency         text not null default 'SAR',
  total_amount     numeric(12, 2) not null default 0,

  payment_status   text not null default 'Unpaid'
                     check (payment_status in ('Unpaid', 'Partially Paid', 'Paid')),
  notes            text,
  invoice_date     date not null default current_date,

  created_by       uuid references public.crm_users(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists invoices_created_at_idx     on public.invoices (created_at desc);
create index if not exists invoices_lead_id_idx        on public.invoices (lead_id);
create index if not exists invoices_public_token_idx   on public.invoices (public_token);
create index if not exists invoices_payment_status_idx on public.invoices (payment_status);

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at
  before update on public.invoices
  for each row execute function public.crm_set_updated_at();

-- ---------------------------------------------------------------------------
-- Document numbering
-- ---------------------------------------------------------------------------
-- Sequences, not count(*) + 1: two quotations created in the same second must
-- not be handed the same number. Numbers restart per calendar year.
create sequence if not exists public.quotation_number_seq as bigint minvalue 1;
create sequence if not exists public.invoice_number_seq   as bigint minvalue 1;

create or replace function public.next_quote_number()
returns text
language sql
volatile
as $$
  select 'PTQ-' || to_char(now(), 'YYYY') || '-'
         || lpad(nextval('public.quotation_number_seq')::text, 4, '0');
$$;

create or replace function public.next_invoice_number()
returns text
language sql
volatile
as $$
  select 'PTI-' || to_char(now(), 'YYYY') || '-'
         || lpad(nextval('public.invoice_number_seq')::text, 4, '0');
$$;

-- ---------------------------------------------------------------------------
-- Account functions — bcrypt stays inside the database
-- ---------------------------------------------------------------------------
-- crm_verify_user returns the account on a correct password and nothing at
-- all otherwise, so the application never sees a hash and cannot be tricked
-- into comparing one itself. Inactive accounts never match.
create or replace function public.crm_verify_user(p_email text, p_password text)
returns table (id uuid, email text, name text, role text)
language sql
security definer
set search_path = public, extensions
as $$
  select u.id, u.email, u.name, u.role
  from public.crm_users u
  where u.email = lower(trim(p_email))
    and u.is_active
    and u.password_hash = crypt(p_password, u.password_hash)
  limit 1;
$$;

-- Create an account, or change an existing one's password, name or role.
-- Passing p_password as null leaves the existing password untouched, so a role
-- change does not require knowing or resetting the password.
create or replace function public.crm_upsert_user(
  p_email    text,
  p_password text default null,
  p_name     text default null,
  p_role     text default 'agent'
)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id uuid;
begin
  if p_role not in ('owner', 'manager', 'agent') then
    raise exception 'invalid role: %', p_role;
  end if;

  select u.id into v_id from public.crm_users u
  where u.email = lower(trim(p_email));

  if v_id is null then
    if p_password is null or length(p_password) < 12 then
      raise exception 'a password of at least 12 characters is required for a new account';
    end if;
    insert into public.crm_users (email, password_hash, name, role)
    values (lower(trim(p_email)), crypt(p_password, gen_salt('bf', 12)), p_name, p_role)
    returning id into v_id;
  else
    if p_password is not null and length(p_password) < 12 then
      raise exception 'a password of at least 12 characters is required';
    end if;
    update public.crm_users
       set password_hash = case
             when p_password is null then password_hash
             else crypt(p_password, gen_salt('bf', 12))
           end,
           name = coalesce(p_name, name),
           role = p_role
     where id = v_id;
  end if;

  return v_id;
end;
$$;

-- The last owner cannot be demoted or deactivated: an account-management
-- mistake must not be able to lock everyone out of the CRM.
create or replace function public.crm_guard_last_owner()
returns trigger
language plpgsql
as $$
begin
  if old.role = 'owner' and (new.role <> 'owner' or new.is_active = false) then
    if (select count(*) from public.crm_users
        where role = 'owner' and is_active and id <> old.id) = 0 then
      raise exception 'cannot remove the last active owner';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists crm_users_guard_last_owner on public.crm_users;
create trigger crm_users_guard_last_owner
  before update on public.crm_users
  for each row execute function public.crm_guard_last_owner();

create or replace function public.crm_guard_last_owner_delete()
returns trigger
language plpgsql
as $$
begin
  if old.role = 'owner' then
    if (select count(*) from public.crm_users
        where role = 'owner' and is_active and id <> old.id) = 0 then
      raise exception 'cannot delete the last active owner';
    end if;
  end if;
  return old;
end;
$$;

drop trigger if exists crm_users_guard_last_owner_delete on public.crm_users;
create trigger crm_users_guard_last_owner_delete
  before delete on public.crm_users
  for each row execute function public.crm_guard_last_owner_delete();

-- These functions read and write credentials, so they are reachable only by
-- the service role. The anon and authenticated roles -- anything a browser
-- could present -- are explicitly stripped of execute permission.
revoke all on function public.crm_verify_user(text, text)              from public, anon, authenticated;
revoke all on function public.crm_upsert_user(text, text, text, text)   from public, anon, authenticated;
revoke all on function public.next_quote_number()                      from public, anon, authenticated;
revoke all on function public.next_invoice_number()                    from public, anon, authenticated;

grant execute on function public.crm_verify_user(text, text)            to service_role;
grant execute on function public.crm_upsert_user(text, text, text, text) to service_role;
grant execute on function public.next_quote_number()                    to service_role;
grant execute on function public.next_invoice_number()                  to service_role;

-- ---------------------------------------------------------------------------
-- Lock every table to the service role
-- ---------------------------------------------------------------------------
-- RLS on with no policies defined means: no row is visible or writable to any
-- role that RLS applies to. Only the service-role key, used server-side, gets
-- through. Do not add a policy here to "make something work" from a browser --
-- add a server route instead.
alter table public.crm_users   enable row level security;
alter table public.leads       enable row level security;
alter table public.lead_notes  enable row level security;
alter table public.lead_events enable row level security;
alter table public.email_logs  enable row level security;
alter table public.quotations  enable row level security;
alter table public.invoices    enable row level security;

-- ---------------------------------------------------------------------------
-- First account
-- ---------------------------------------------------------------------------
-- Nothing is seeded. Create the first owner by running this once, with your
-- own address and a password you generate -- then delete the statement from
-- your SQL editor history. Do not commit a real password to this file.
--
--   select public.crm_upsert_user('you@example.com', '<a long random password>', 'Your Name', 'owner');
