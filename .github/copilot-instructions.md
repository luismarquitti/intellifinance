## Copilot / AI agent instructions for IntelliFinance

Keep guidance short and code-focused. This repository is a small monorepo with three main services: `frontend/` (React), `backend/` (Node/Express + GraphQL), and `worker/` (BullMQ agents). Key infra: PostgreSQL (source of truth), PGVector (RAG/memory), Redis (BullMQ queue), and Docker Compose for local setup.

What to prioritize when editing or generating code
- Preserve the async job pattern: the API enqueues Jobs in Redis (BullMQ) and returns a jobId; the `worker` consumes jobs and calls the API to persist results. See `Readme.md` top-level architecture section.
- Environment variables live per-service: `backend/.env.example`, `worker/.env.example`, `frontend/.env.example`. When adding code that reads env vars, follow the existing keys and error modes (fail-fast if DB/Redis keys are missing).
- Storage and memory: PGVector is used for RAG. Prefer small, explicit DB and vector ops in `worker` utilities rather than embedding heavy LLM calls directly in the API.

Quick dev commands (use these examples in generated scripts or docs)
- Start infra: `docker-compose up -d` (root)
- Backend: `cd backend && npm install && npm run db:migrate && npm run dev`
- Worker: `cd worker && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm run dev`

Where to look for patterns / examples
- Job enqueue: search backend for BullMQ producer code and queue names (API handlers that create jobs).
- Worker pipelines: open `worker/src` for orchestrator/agent patterns — job handling, tool invocations (PDF parsing, RAG retrieval), and GraphQL API calls.
- DB & migrations: inspect `backend` package.json scripts and migration setup (used via `npm run db:migrate`).

Integration notes and gotchas
- Local dev assumes Postgres + Redis started by `docker-compose`; ensure `DATABASE_URL` and `REDIS_URL` are set from the `.env` files.
- On Windows recommend Docker Desktop + WSL2 (see `Dev_Env.md`), especially when debugging worker + PGVector.
- LLM keys: code must read `OPENAI_API_KEY` or `GEMINI_API_KEY` from envs; do not hard-code keys in generated code or examples.

Tests, linting and style
- Use existing TypeScript/JS conventions in services. If you generate new files, keep TypeScript types and follow existing import styles (ES modules / common patterns shown in each package).

If unsure where to change behavior
- Trace the flow: frontend -> backend (enqueue) -> Redis -> worker (process) -> backend (persist). Modify the component closest to the change: e.g., change job shape in backend enqueue and mirror the change in worker job handler.

Add references to these files when changing behavior:
- `Readme.md` (root) — overall architecture and commands
- `backend/.env.example`, `worker/.env.example`, `frontend/.env.example`
- `docker-compose.yml` (root)

When done: ask the human for context or a failing test/log if behavior is unclear.

