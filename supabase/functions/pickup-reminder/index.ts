// Kitchen Table: pickup reminder. Runs every 5 minutes (pg_cron) and sends ONE push per evening
// to whoever leaves work first, listing what's missing for tonight and tomorrow's dinner.
// The rules come from the app itself (logic.js on GitHub Pages), so they never drift from the app.
import webpush from "npm:web-push@3.6.7";

const SITE = Deno.env.get("KT_SITE") || "https://julianclassen02.github.io/kitchen-table";
const SB = Deno.env.get("SUPABASE_URL");
const KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const H = { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" };

webpush.setVapidDetails(
  Deno.env.get("VAPID_SUBJECT") || "mailto:kitchen@example.com",
  Deno.env.get("VAPID_PUBLIC"),
  Deno.env.get("VAPID_PRIVATE"),
);

async function rest(path, opt) {
  const r = await fetch(SB + "/rest/v1/" + path, Object.assign({ headers: H }, opt || {}));
  if (!r.ok) throw new Error(path + " " + r.status + " " + (await r.text()).slice(0, 200));
  const t = await r.text();
  return t ? JSON.parse(t) : null;
}

// ===== CORE START =====
function londonNow(d) {
  const p = {};
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(d).forEach((x) => { p[x.type] = x.value; });
  return { iso: p.year + "-" + p.month + "-" + p.day, min: (+p.hour) * 60 + (+p.minute) };
}
function buildState(L, rows) {
  const S = { recipes: {}, shifts: {}, plan: {}, settings: L.mergeSettings(null), shop: { checked: {}, extras: [], horizon: 5, shopped: {} }, fridge: { items: [], from: null } };
  rows.forEach((r) => {
    if (r.k === "settings") S.settings = L.mergeSettings(r.data);
    else if (r.k === "shop") S.shop = Object.assign(S.shop, r.data || {});
    else if (r.k === "fridge") S.fridge = Object.assign({ items: [], from: null }, r.data || {});
    else if (r.k.charAt(1) === ":") { const m = { r: S.recipes, s: S.shifts, p: S.plan }[r.k.charAt(0)]; if (m) m[r.k.slice(2)] = r.data; }
  });
  S.fridge.items = L.fridgeDedupe(S.fridge.items || []);
  L.fridgeFill(S);
  return S;
}
// Decide what (if anything) to send right now. Pure: no network.
function decide(L, rows, now, windowMin) {
  const S = buildState(L, rows);
  const P = L.pickupPlan(S, now.iso, now.min);
  if (!P.items.length || !P.who || P.at == null || P.skip) return { send: false, why: P.skip ? "too late for the shops" : "nothing missing", P };
  if (now.min < P.at) return { send: false, why: "not yet (" + L.fmtMin(P.at) + ")", P };
  if (now.min >= P.at + windowMin) return { send: false, why: "window passed", P };
  const body = (P.store ? P.store + ". " : "") + L.pickupText(P);
  return { send: true, who: P.who, title: "Pick up on the way home", body: body, P };
}
// ===== CORE END =====

let LOGIC = null, LOGIC_DAY = "";
async function logic(day) {
  if (LOGIC && LOGIC_DAY === day) return LOGIC;
  const m = await import(SITE + "/logic.js?d=" + day);
  let n = 0;
  LOGIC = m.makeLogic((p) => p + "_" + (++n) + Math.random().toString(36).slice(2, 6));
  LOGIC_DAY = day;
  return LOGIC;
}

async function pushTo(subs, payload) {
  let ok = 0;
  for (const s of subs) {
    try { await webpush.sendNotification(s.sub, JSON.stringify(payload)); ok++; }
    catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) await rest("kt_push?id=eq." + s.id, { method: "DELETE" }).catch(() => {});
    }
  }
  return ok;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const now = londonNow(new Date());
  const out = { now: now, households: [] };
  try {
    const L = await logic(now.iso);
    const subs = await rest("kt_push?select=id,household,who,sub&limit=1000");
    const byHome = {};
    subs.forEach((s) => { (byHome[s.household] = byHome[s.household] || []).push(s); });
    for (const home of Object.keys(byHome)) {
      const mine = byHome[home];
      // Test button in the app: sends straight away to the person who pressed it.
      if (url.searchParams.get("test") === "1") {
        const who = url.searchParams.get("who");
        const sent = await pushTo(mine.filter((s) => !who || s.who === who), { title: "Kitchen Table", body: "Reminders are working.", url: "./#shop" });
        out.households.push({ home: home, test: true, sent: sent });
        continue;
      }
      const rows = await rest("kt_docs?select=k,data&household=eq." + encodeURIComponent(home) + "&limit=20000");
      const d = decide(L, rows, now, 25);
      const row = { home: home, send: d.send, why: d.why || "", who: d.who || "" };
      if (url.searchParams.get("dry") === "1") { row.items = d.P && d.P.items; out.households.push(row); continue; }
      if (d.send) {
        // one per person per evening: claim the slot first, so two runs can't both send
        const claim = await fetch(SB + "/rest/v1/kt_push_log?on_conflict=household,day,who", {
          method: "POST", headers: Object.assign({}, H, { Prefer: "resolution=ignore-duplicates,return=representation" }),
          body: JSON.stringify({ household: home, day: now.iso, who: d.who }),
        });
        const claimed = claim.ok ? await claim.json() : [];
        if (claimed.length) row.sent = await pushTo(mine.filter((s) => s.who === d.who), { title: d.title, body: d.body, url: "./#shop" });
        else row.why = "already sent today";
      }
      out.households.push(row);
    }
  } catch (e) {
    out.error = String(e && e.message || e);
    return new Response(JSON.stringify(out), { status: 500, headers: { "Content-Type": "application/json" } });
  }
  return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
});
