# Implementation Plan: Smart Document Ingestion

**Branch**: `004-smart-ingestion` | **Date**: 2025-11-28 | **Spec**: [specs/004-smart-ingestion/spec.md](../spec.md)
**Input**: Feature specification from `/specs/004-smart-ingestion/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature implements an automated pipeline for ingesting PDF bank statements. It allows users to upload a PDF via the Backend API, which stores the file and dispatches a job to a Redis queue. A dedicated Worker process picks up the job, extracts text using `pdf-parse`, and uses an LLM (LangChain + OpenAI) to parse the text into structured `Transaction` objects, validated by a shared Zod schema. The system includes a "Mock Mode" for cost-free development.

## Technical Context

**Language/Version**: TypeScript 5.x (Node.js 18+)
**Primary Dependencies**: 
- `apps/backend`: `graphql-upload`, `bullmq`
- `apps/worker`: `bullmq`, `langchain`, `pdf-parse`, `@langchain/openai`
- `packages/database`: `prisma`
- `packages/types`: `zod`
**Storage**: PostgreSQL (Prisma), Redis (BullMQ), Local Filesystem (`uploads/`)
**Testing**: Jest (Unit), Manual (E2E via Playground)
**Target Platform**: Dockerized Node.js containers
**Project Type**: Monorepo (Turborepo/Yarn Workspaces)
**Performance Goals**: <60s processing time per page.
**Constraints**: Must support Mock Mode if API key is missing.
**Scale/Scope**: MVP (Single page PDFs, standard layouts).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **[x] Principle I (SDD):** Does this feature have a `.spec.md` file?
- **[x] Principle II (Typing):** Are Zod schemas planned for all inputs? (Yes, `ExtractedTransaction` schema).
- **[x] Principle III (Async):** Is blocking I/O correctly deferred to a worker? (Yes, BullMQ pipeline).
- **[x] Principle IV (Monorepo):** Does the proposed structure respect app/package boundaries? (Yes, logic split between backend/worker, types in packages).
- **[x] Principle V (AI):** If AI is used, are there fallbacks and structured outputs? (Yes, Zod validation + Mock Mode).
- **[x] Testing Strategy:** Does the plan include unit, integration, and E2E tests as required?
- **[x] Dev Workflow:** Does the plan account for conventional commits and PR reviews?

## Project Structure

### Documentation (this feature)

```text
specs/004-smart-ingestion/
├── plan.md              # This file
├── research.md          # Architecture decisions
├── data-model.md        # Prisma schema definitions
├── quickstart.md        # Dev setup instructions
├── contracts/           # GraphQL schema
│   └── ingestion.graphql
└── tasks.md             # To be generated
```

### Source Code (repository root)

```text
apps/
├── backend/
│   └── src/
│       ├── graphql/
│       │   ├── resolvers/
│       │   │   └── ingestion.resolver.ts
│       │   └── schemas/
│       │       └── ingestion.graphql
│       └── services/
│           └── upload.service.ts
└── worker/
    └── src/
        ├── processors/
        │   └── ingestion.processor.ts
        └── services/
            ├── llm.service.ts
            └── pdf.service.ts

packages/
├── database/
│   └── schema.prisma
└── types/
    └── src/
        └── ingestion.ts
```

**Structure Decision**: Standard Monorepo layout. New `worker` app logic, new `backend` resolvers, shared `database` and `types` updates.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | | |