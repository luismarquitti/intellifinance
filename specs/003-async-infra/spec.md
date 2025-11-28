# SPEC-003: Async Worker Infrastructure (BullMQ)

## 1. Overview

This specification outlines the requirements for establishing a robust asynchronous task processing system using BullMQ and Redis. This is a foundational infrastructure component that will enable future features requiring background processing, such as AI-driven analysis, report generation, and notifications.

## 2. Technical Requirements

### A. Monorepo Structure

1.  **New Package: `packages/jobs`**
    *   **Purpose:** To serve as the single source of truth for shared definitions related to asynchronous jobs. This includes Queue Names, Job Names, and importantly, Zod Schemas for validating job data payloads.
    *   **Dependencies:** `bullmq`, `zod`.
    *   **Rationale:** By centralizing these definitions, we enforce a strict contract between job producers (like the backend API) and consumers (the worker), ensuring type safety and preventing runtime errors.

2.  **New Application: `apps/worker`**
    *   **Purpose:** A dedicated, standalone Node.js process responsible for consuming and processing jobs from the Redis queue.
    *   **Architecture:** It should contain a `WorkerFactory` or similar mechanism that can dynamically initialize BullMQ `Worker` instances based on the job definitions imported from `packages/jobs`.

3.  **Updated Application: `apps/backend`**
    *   **Purpose:** To act as a job producer.
    *   **Architecture:** It will include a `QueueService` (or a similar abstraction) responsible for adding new jobs to the Redis queue. This service will use the definitions from `packages/jobs` to ensure the jobs it creates are valid.

### B. Architecture Details

1.  **Core Library:** The project will standardize on `bullmq` for all queueing-related functionalities.
2.  **Redis Connection:**
    *   The `ioredis` library will be used for all connections to the Redis instance.
    *   The connection string must be configurable via an environment variable: `REDIS_URL`.
3.  **Job Reliability:**
    *   A default retry policy must be established for all jobs.
    *   **Policy:** 3 attempts with an exponential backoff delay between retries. This provides a balance between resilience and system load.
4.  **Proof-of-Concept Job:**
    *   To verify the end-to-end plumbing, a simple "dummy" job must be created.
    *   **Name:** `TEST_JOB`
    *   **Functionality:** Upon processing, the job should simply log a confirmation message to the console (e.g., "TEST_JOB processed successfully with data: ..."). This validates that the producer, queue, and consumer are all connected and functioning correctly.

## 3. Acceptance Criteria

*   [x] A new `packages/jobs` directory exists with a valid `package.json` and `tsconfig.json`.
*   [x] The `packages/jobs` package exports queue names and a Zod schema for `TEST_JOB`.
*   [x] A new `apps/worker` directory exists with a runnable entrypoint (`src/index.ts`).
*   [x] The worker application successfully connects to Redis using the `REDIS_URL` environment variable.
*   [x] The worker application can process the `TEST_JOB`.
*   [x] The `apps/backend` application is updated with a `QueueService`.
*   [x] The `QueueService` can successfully add a `TEST_JOB` to the queue.
*   [x] There are no circular dependencies between `apps/backend`, `apps/worker`, and `packages/jobs`. `apps/backend` and `apps/worker` must only import from `packages/jobs`.
