GlowUp
=====

Modern community app for sharing requests and helping others glow up. This fork removes external auth and runs fully client-side with a dummy repository, adds a referral UI (demo payouts), and applies a ChatGPT-style grey/blue theme.

Features
- Accessible without login (guest mode by default)
- Dummy auth stored in localStorage; optional username claim via modal
- Referral program UI with copyable link and simulated earnings
- ChatGPT-inspired dark theme with blue accents
- Leaderboard, profile, and feed views

Getting Started
1. Install: `npm install`
2. Run dev: `npm run dev`
3. Build: `npm run build` then `npm run preview`

Environment
- No server or Supabase required. All data is demo-only and stored locally in the browser.

Referral Program (Demo)
- Your referral link appears in `Profile`
- Each referred friend adds a simulated $5 to your earnings
- Copy link to clipboard with one click

Production Readiness
- TypeScript + Vite + Tailwind
- Componentized UI under `src/components/ui`
- Theming via CSS variables in `src/styles/globals.css`
- No secrets or private keys in the repo

Notes
- This is a demo build. Replace the dummy data and localStorage with your real backend when ready.
