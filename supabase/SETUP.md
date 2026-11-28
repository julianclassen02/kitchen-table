# Pickup reminders: Supabase setup

1. **SQL.** Supabase dashboard > SQL Editor > New query. Paste `setup.sql`, replace `YOUR-PROJECT-REF` (the xxxx in https://xxxx.supabase.co) and `YOUR-ANON-KEY` (Project Settings > API), then Run.
2. **Function.** Edge Functions > Deploy a new function > Via Editor. Name it exactly `pickup-reminder`. Paste `functions/pickup-reminder/index.ts` and Deploy.
3. **Secrets.** Edge Functions > Secrets. Add `VAPID_PUBLIC`, `VAPID_PRIVATE` and `VAPID_SUBJECT` (`mailto:` plus your email). The private key is never stored in this repo.
4. **Each phone.** Open the app from the Home Screen icon > Settings > Reminders on this phone. Choose who the phone belongs to, tap Turn on reminders, then Send a test.

The function loads its rules from `logic.js` on GitHub Pages, so it follows the app automatically.
`logic.js` is generated: run `python3 tools/build-logic.py` before committing any change to the logic block in index.html.

## Recipe from a screenshot
1. Get an Anthropic API key at console.anthropic.com (Settings > API keys) and add a few pounds of credit under Billing.
2. Edge Functions > Deploy a new function > Via Editor. Name it `recipe-from-image`, file `index.ts`, paste `functions/recipe-from-image/index.ts`, turn Verify JWT off, Deploy.
3. Edge Functions > Secrets: add `ANTHROPIC_API_KEY` with the key.
4. In the app: Recipes > Add > From a screenshot.
