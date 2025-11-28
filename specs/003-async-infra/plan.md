# Implementation Plan: Async Worker Infrastructure

**Branch**: `003-async-infra` | **Date**: 2025-11-28 | **Spec**: [./spec.md](./spec.md)
**Input**: Feature specification from `specs/003-async-infra/spec.md`

## Summary

This plan outlines the implementation of a new asynchronous task processing system using BullMQ and Redis. The core requirement is to create a robust, type-safe architecture for offloading tasks from the main API (`apps/backend`) to a separate, scalable `apps/worker` process. This will be achieved by creating a new shared package, `packages/jobs`, to define all job-related schemas and queue configurations, ensuring strict separation of concerns and type safety across the monorepo.

## Technical Context

**Language/Version**: TypeScript
**Primary Dependencies**: BullMQ, Redis (ioredis), Zod
**Storage**: Redis for queueing
**Testing**: Jest (Code-only implementation, no tests will be run)
**Target Platform**: Node.js
**Project Type**: Monorepo (packages/jobs, apps/worker, apps/backend)
**Constraints**: CODE-ONLY implementation. No access to running Redis or Docker instances.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **[X] Technology Stack:** Does the plan adhere to the approved technology stack (React, Node.js, TypeScript, PostgreSQL, PGVector, Redis, BullMQ)?
- **[X] Asynchronous Architecture:** Are all AI operations designed to be asynchronous?
- **[ ] Test-Driven Development (TDD):** Does the plan include tasks for writing tests before implementation? (NOTE: TDD is followed in spirit, but tests will not be run due to CODE-ONLY constraint).
- **[X] Code Standards:** Does the plan account for adherence to Prettier and ESLint standards?
- **[X] Security:** Does the plan ensure that agents do not have direct access to the database?
- **[X] Code Quality:** Does the plan promote well-documented, modular, and understandable code?
- **[X] Testing Standards:** Does the plan include unit, integration, and end-to-end tests? (NOTE: Test files will be created but not executed).
- **[ ] User Experience Consistency:** Does the plan respect established UI/UX patterns? (N/A for this infrastructure task).
- **[X] Performance Requirements:** Does the plan consider performance implications?

## Project Structure

### Documentation (this feature)

```text
specs/003-async-infra/
├── plan.md              # This file
├── spec.md              # The technical specification
└── tasks.md             # The implementation checklist (to be created)
```

### Source Code (repository root)

```text
apps/
├── backend/
│   └── src/
│       └── services/
│           └── QueueService.ts  # New producer service
├── frontend/
└── worker/                  # New worker application
    ├── src/
    │   ├── index.ts         # Entrypoint
    │   └── WorkerFactory.ts # Consumes jobs
    ├── package.json
    └── tsconfig.json

packages/
├── database/
├── jobs/                    # New shared jobs package
│   ├── src/
│   │   ├── index.ts
│   │   ├── queues.ts        # Queue name definitions
│   │   └── schemas.ts       # Zod schemas for jobs
│   ├── package.json
│   └── tsconfig.json
└── types/
```

**Structure Decision**: The monorepo will be extended with a new shared package `packages/jobs` for defining job schemas and queues, and a new application `apps/worker` for processing these jobs. This structure ensures a clean separation of concerns between the job producer (`apps/backend`) and the consumer (`apps/worker`), while maintaining type safety through the shared package.
