-- Kitchen Table: reminders. Run once in Supabase > SQL Editor > New query > Run.

-- 1. Each phone that turned reminders on
create table if not exists kt_push (
  id bigserial primary key,
  household text not null,
  who text not null,
  endpoint text not null unique,
  sub jsonb not null,
  created_at timestamptz not null default now()
);
alter table kt_push enable row level security;
drop policy if exists "anon all" on kt_push;
create policy "anon all" on kt_push for all to anon using (true) with check (true);

-- 2. Remembers who was already reminded today (the server job only; not readable from the app)
create table if not exists kt_push_log (
  household text not null,
  day date not null,
  who text not null,
  sent_at timestamptz not null default now(),
  primary key (household, day, who)
);
alter table kt_push_log enable row level security;

-- 3. Wake the function every 5 minutes
create extension if not exists pg_cron;
create extension if not exists pg_net;
select cron.unschedule('kt-pickup') where exists (select 1 from cron.job where jobname = 'kt-pickup');
select cron.schedule(
  'kt-pickup', '*/5 * * * *',
  $$ select net.http_post(
       url := 'https://YOUR-PROJECT-REF.supabase.co/functions/v1/pickup-reminder',
       headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer YOUR-ANON-KEY'),
       body := '{}'::jsonb
     ) $$
);

-- 4. Let the reminder function (service role) read and write these tables
grant usage on schema public to service_role;
grant all on public.kt_push to service_role;
grant all on public.kt_push_log to service_role;
grant select on public.kt_docs to service_role;

-- 5. Let the app (anon key) save its phone subscription
grant usage on schema public to anon;
grant select, insert, update, delete on public.kt_push to anon;

-- 6. Let both keys use the auto-numbering counters
grant usage, select on all sequences in schema public to anon;
grant usage, select on all sequences in schema public to service_role;
