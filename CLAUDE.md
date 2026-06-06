# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

RCO (Rental Cashflow Obligation) — Argentine fintech MVP that lets property owners advance cash from future rental cashflows. A landing page with an interactive calculator and an evaluation request form that stores submissions and notifies the team.

`docs/index.html` is the design reference. Do not serve it directly — port it into React components.

---

## Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS — deployed on Vercel
- **Backend**: FastAPI (Python 3.12) — deployed on Railway
- **Database**: Supabase (PostgreSQL) — `supabase-py` client, service role key
- **File storage**: Supabase Storage — PDFs uploaded directly from browser, paths stored in DB
- **Email**: Resend Python SDK — transactional notification to RCO team on form submission
- **Validation**: Pydantic v2 — models mirror DB schema (replaces Zod)
- **Env config**: `pydantic-settings` — validated at startup (replaces `lib/env.ts`)
- **Package manager**: `uv`

---

## Architecture

```
Browser → Vercel (Next.js frontend only — no API routes)
              │
              └── FastAPI backend (Railway)
                      │
                      ├── Supabase Storage  (direct browser upload, anon key + RLS)
                      ├── Supabase DB       (insert via service role, supabase-py)
                      └── Resend            (email notification on submission)
```

File uploads go directly from the browser to Supabase Storage — never through the API. The FastAPI backend handles `/evaluations` POST (DB insert + email) and future `/calculate` and `/score` endpoints. The frontend calls the backend via its full Railway URL; CORS is configured on the FastAPI app.

---

## Commands

```bash
# Frontend (Next.js)
npm run dev          # start local dev server
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
vercel               # deploy frontend to preview
vercel --prod        # deploy frontend to production

# Backend (FastAPI)
uv run uvicorn app.main:app --reload   # start local API server
uv run pytest                          # unit/integration tests
uv run pytest --watch                  # watch mode for TDD
uv run mypy app/                       # type check
railway up                             # deploy backend to Railway

# E2E
npm run test:e2e     # Playwright (runs against both frontend + backend)
```

---

## Ways of Working

**SDD + TDD is non-negotiable.** Every feature starts with a specification (what it does, what it accepts, what it returns, what it rejects) before any implementation. Tests are written before code. A feature is not "done" until tests pass and the spec is satisfied.

- Write the spec first (in a comment block or a `*.spec.md` next to the module)
- Write the test second
- Write the implementation third
- Refactor only once tests are green

**When in doubt, stop and think harder.** Do not guess at requirements, financial logic, or data shape. Question assumptions explicitly — especially anything touching money calculations, form validation rules, or database schema. Ask before assuming.

**Financial correctness is critical.** The advance rate is **90%** (`flujo_total * 0.90`). Any change to financial formulas requires an explicit spec update and corresponding test. Never adjust rates, fees, or calculated fields without a clear requirement.

**Good standards:**
- TypeScript strict mode on the frontend — no `any`, no implicit returns
- Pydantic v2 for all API input validation (request bodies, env vars via `pydantic-settings`)
- Python type hints throughout — `mypy` must pass with no errors
- Supabase RLS policies are the security boundary for storage — do not rely solely on application logic
- No secrets in code or committed `.env` files

**OffBound**


---

## Domain Glossary

| Term | Meaning |
|---|---|
| `propietario` | Property owner submitting an evaluation |
| `flujo_total` | `valor_mensual × meses_restantes` |
| `adelanto_estimado` | `flujo_total × 0.90` |
| `evaluation` | A submitted request for contract assessment |
| `status` | `pending_review` → `reviewed` → `approved` / `rejected` |
