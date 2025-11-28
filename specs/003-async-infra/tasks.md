# TASKS-003: Async Worker Infrastructure

This document lists the concrete tasks required to implement the async worker infrastructure.

### [PKG-JOBS] Setup package & Zod schemas
- [ ] Create `packages/jobs` directory.
- [ ] Create `packages/jobs/package.json` with `bullmq` and `zod` dependencies.
- [ ] Create `packages/jobs/tsconfig.json`.
- [ ] Create `packages/jobs/src/index.ts` to export all definitions.
- [ ] Create `packages/jobs/src/queues.ts` to define queue names.
- [ ] Create `packages/jobs/src/jobs/test.job.ts` to define the `TEST_JOB` name, Zod schema, and inferred TypeScript type.

### [WORKER] Setup BullMQ Consumer
- [ ] Create `apps/worker` directory.
- [ ] Create `apps/worker/package.json` with `bullmq`, `ioredis`, and `@intellifinance/jobs` dependencies.
- [ ] Create `apps/worker/tsconfig.json`.
- [ ] Create `apps/worker/.env.example` with `REDIS_URL`.
- [ ] Create `apps/worker/src/index.ts` as the main entrypoint.
- [ ] Create `apps/worker/src/lib/worker.factory.ts` to configure BullMQ Worker instances.
- [ ] Create `apps/worker/src/processors/test.processor.ts` to handle the `TEST_JOB`.

### [API] Setup BullMQ Producer
- [ ] Add `bullmq`, `ioredis`, and `@intellifinance/jobs` to `apps/backend/package.json`.
- [ ] Create `apps/backend/src/lib/queue.service.ts` to encapsulate job creation logic.
- [ ] (CODE-ONLY) Define how `QueueService` will be instantiated and used in the application.
