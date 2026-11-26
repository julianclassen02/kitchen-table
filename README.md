# Kitchen Table

Single-device meal planner: recipes, dinner planning around shifts, shopping list.
No build step. Files: index.html, sw.js, manifest.webmanifest, icon-180.png, icon-512.png.

Host on GitHub Pages: repo Settings > Pages > Deploy from branch > main / root.
On iPhone: open the Pages address in Safari > Share > Add to Home Screen.
Data lives in that browser only (use Rules > Copy backup now and then).

## Sync between phones (optional)

1. Create a free project at supabase.com.
2. SQL Editor → run:

```sql
create table kt_docs (
  household text not null,
  k text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (household, k)
);
alter table kt_docs enable row level security;
create policy "anon all" on kt_docs for all to anon using (true) with check (true);
```

3. Project Settings → API: copy the Project URL and the `anon` public key.
4. In the app: Shifts → Rules → Sync between devices. Paste URL, key and a made-up household code. Connect.
5. Same screen → "Copy setup link for Viv" and send it to her.
