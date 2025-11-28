# Feature Specification: Async Worker Infrastructure (BullMQ)

**Feature Branch**: `003-async-infra`
**Status**: Draft

## Requirements

### Functional Requirements

- **FR-001**: A new package `packages/jobs` MUST be created to house shared definitions for Queue Names, Job Names, and Zod schemas for job data.
- **FR-002**: The `packages/jobs` package MUST include `bullmq` and `zod` as dependencies.
- **FR-003**: A new standalone Node.js application `apps/worker` MUST be created to consume jobs.
- **FR-004**: The `apps/worker` application MUST contain a `WorkerFactory` for initializing BullMQ workers.
- **FR-005**: The `apps/backend` application MUST include a `QueueService` to produce and enqueue jobs.
- **FR-006**: The system MUST use `bullmq` and `ioredis` for all queueing operations.
- **FR-007**: The Redis connection string MUST be configurable via a `REDIS_URL` environment variable.
- **FR-008**: All jobs MUST have a default retry policy of 3 attempts with exponential backoff.
- **FR-009**: A `TEST_JOB` MUST be implemented to validate the async infrastructure. This job should log a confirmation message.

### Architectural Constraints

- **AC-001**: The `apps/backend` (Producer) MUST import job and queue definitions from `packages/jobs`.
- **AC-002**: There MUST be no circular dependencies between `apps/backend`, `apps/worker`, and `packages/jobs`.
- **AC-003**: The implementation will be CODE-ONLY. No Docker or Redis instances will be available in the development environment.
