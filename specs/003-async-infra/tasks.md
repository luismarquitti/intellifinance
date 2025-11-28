# Task Checklist: Async Worker Infrastructure

This checklist breaks down the implementation of the async worker infrastructure. Tasks are ordered by dependency.

## Phase 1: [PKG-JOBS] Setup shared jobs package

- [x] Create directory `packages/jobs`.
- [x] Create `packages/jobs/package.json` with `name: "@my-app/jobs"`, and dependencies: `bullmq`, `zod`.
- [x] Create `packages/jobs/tsconfig.json` extending from the root config.
- [x] Create `packages/jobs/src/queues.ts` to define and export queue names (e.g., `export const MAIN_QUEUE = 'main-queue';`).
- [x] Create `packages/jobs/src/schemas.ts` to define and export the `TEST_JOB` name and its Zod schema.
- [x] Create `packages/jobs/src/index.ts` to export all definitions from `queues.ts` and `schemas.ts`.

## Phase 2: [WORKER] Setup BullMQ Consumer

- [x] Create directory `apps/worker`.
- [x] Create `apps/worker/package.json` with dependencies: `bullmq`, `ioredis`, `dotenv`, and a workspace dependency on `@my-app/jobs`.
- [x] Create `apps/worker/tsconfig.json` extending from the root config.
- [x] Create `apps/worker/.env.example` with the `REDIS_URL` variable.
- [x] Create `apps/worker/src/connection.ts` to initialize and export a reusable `ioredis` connection instance.
- [x] Create `apps/worker/src/processors/test-job-processor.ts` which contains the async function that will process the `TEST_JOB`. It should log a confirmation message.
- [x] Create `apps/worker/src/index.ts` to initialize the BullMQ `Worker`, connect it to the main queue, and attach the test job processor.

## Phase 3: [API] Setup BullMQ Producer

- [x] Update `apps/backend/package.json` to add the workspace dependency `@my-app/jobs`.
- [x] Create `apps/backend/src/services/QueueService.ts`. This service will encapsulate the logic for adding jobs to the queue.
- [x] Implement a method `addTestJob` within `QueueService.ts` that takes job data, validates it with the Zod schema from `@my-app/jobs`, and adds it to the `MAIN_QUEUE`.
- [x] Add `bullmq` and `ioredis` to `apps/backend` dependencies.
- [x] Create `apps/backend/src/lib/redis.ts` to manage the redis connection, similar to the worker.
- [x] Update `apps/backend/.env.example` to include the `REDIS_URL` variable.
