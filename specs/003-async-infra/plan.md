# PLAN-003: Async Worker Infrastructure Implementation

This plan outlines the steps required to implement the asynchronous worker infrastructure as defined in `spec.md`. The implementation will be phased to ensure a clean, decoupled architecture.

## Phase 1: [PKG-JOBS] - The Shared Contract

The foundation of this architecture is the `packages/jobs` package. It will act as a shared contract, ensuring type safety and consistency between the job producer and the consumer.

1.  **Initialize Package:**
    *   Create the directory `packages/jobs`.
    *   Create a `package.json` with `bullmq` and `zod` as dependencies.
    *   Create a `tsconfig.json` that aligns with the monorepo's compiler settings.

2.  **Define Job Contracts:**
    *   Create `src/index.ts` to export all definitions.
    *   Create `src/queues.ts` to define an enum or object for all queue names (e.g., `MAIN_QUEUE`).
    *   Create `src/jobs/test.job.ts` to define the `TEST_JOB`. This file will contain:
        *   The job name: `export const TEST_JOB = 'TEST_JOB';`
        *   A Zod schema for the job's data payload: `export const TestJobSchema = z.object({ message: z.string() });`
        *   A TypeScript type inferred from the schema: `export type TestJobData = z.infer<typeof TestJobSchema>;`

## Phase 2: [WORKER] - The Consumer

The `apps/worker` application will be a new, standalone service responsible for processing jobs.

1.  **Initialize Application:**
    *   Create the directory `apps/worker`.
    *   Create a `package.json` with dependencies: `bullmq`, `ioredis`, and a workspace dependency on `@intellifinance/jobs`.
    *   Create a `tsconfig.json`.
    *   Create a `.env.example` file specifying `REDIS_URL`.

2.  **Implement Worker Logic:**
    *   Create `src/index.ts` as the main entrypoint. This file will initialize the Redis connection and start the worker.
    *   Create `src/lib/worker.factory.ts`. This will contain a function that takes a queue name and a processor function and returns a configured BullMQ `Worker` instance. The factory will apply the default retry strategy (3 attempts, exponential backoff).
    *   Create `src/processors/test.processor.ts`. This file will contain the actual logic for handling the `TEST_JOB`. It will import the schema from `@intellifinance/jobs` to validate the job data before processing.

## Phase 3: [API] - The Producer

The existing `apps/backend` will be updated to produce jobs.

1.  **Update Dependencies:**
    *   Add `bullmq`, `ioredis`, and `@intellifinance/jobs` to `apps/backend/package.json`.

2.  **Implement Queue Service:**
    *   Create `src/lib/queue.service.ts`. This service will encapsulate all interactions with BullMQ.
    *   It will have a method like `addJob(jobName, data)` that creates a new BullMQ `Queue` instance and adds the job.
    *   The service will be responsible for connecting to Redis via `ioredis` using the `REDIS_URL` from the environment.
    *   It will import job names and schemas from `@intellifinance/jobs` to ensure type-safe job creation.

3.  **Integration (CODE-ONLY):**
    *   Define how the `QueueService` would be instantiated and made available to the application (e.g., in the GraphQL context). For this CODE-ONLY task, we will write the service but not perform the full integration.
    *   Create a placeholder or example of how a resolver would use the service to add a `TEST_JOB`.

## Architectural Constraints

*   **One-Way Dependency:** `apps/backend` and `apps/worker` **MUST** depend on `packages/jobs`. `packages/jobs` **MUST NOT** depend on any app. There must be **NO** direct dependency between `apps/backend` and `apps/worker`.
*   **Environment Configuration:** All Redis connection details will be handled through a `REDIS_URL` environment variable.
*   **CODE-ONLY MODE:** No tests will be run, and no services will be started. The focus is on writing the correct code structure, dependency trees, and configuration files.
