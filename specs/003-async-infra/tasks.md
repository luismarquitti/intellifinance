# TASKS-003: Async Worker Infrastructure

This document lists the concrete tasks required to implement the async worker infrastructure.

### [PKG-JOBS] Setup package & Zod schemas
- [x] Create `packages/jobs` directory.
- [x] Create `packages/jobs/package.json` with `bullmq` and `zod` dependencies.
- [x] Create `packages/jobs/tsconfig.json`.
- [x] Create `packages/jobs/src/index.ts` to export all definitions.
- [x] Create `packages/jobs/src/queues.ts` to define queue names.
- [x] Create `packages/jobs/src/jobs/test.job.ts` to define the `TEST_JOB` name, Zod schema, and inferred TypeScript type.

### [WORKER] Setup BullMQ Consumer
- [x] Create `apps/worker` directory.
- [x] Create `apps/worker/package.json` with `bullmq`, `ioredis`, and `@intellifinance/jobs` dependencies.
- [x] Create `apps/worker/tsconfig.json`.
- [x] Create `apps/worker/.env.example` with `REDIS_URL`.
- [x] Create `apps/worker/src/index.ts` as the main entrypoint.
- [x] Create `apps/worker/src/lib/worker.factory.ts` to configure BullMQ Worker instances.
- [x] Create `apps/worker/src/processors/test.processor.ts` to handle the `TEST_JOB`.

### [API] Setup BullMQ Producer
- [x] Add `bullmq`, `ioredis`, and `@intellifinance/jobs` to `apps/backend/package.json`.
- [x] Create `apps/backend/src/lib/queue.service.ts` to encapsulate job creation logic.
- [x] (CODE-ONLY) Define how `QueueService` will be instantiated and used in the application.
