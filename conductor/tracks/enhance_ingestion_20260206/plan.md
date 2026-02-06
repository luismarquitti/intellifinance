# Implementation Plan: Robust Transaction Data Ingestion

**Track:** Implement robust transaction data ingestion and validation for diverse financial sources.

This plan outlines the steps to implement a robust and scalable data ingestion pipeline. The work is divided into distinct phases, each focusing on a specific part of the functionality.

---

## Phase 1: Core Data Models and Interfaces [checkpoint: 8bb7807]

This phase focuses on establishing the foundational data structures and contracts for the ingestion system.

- [x] **Task:** Define the canonical `Transaction` model and related types. [66a2d94]
    - [ ] In `packages/types/src/financial.ts`, define a Zod schema and TypeScript type for a `Transaction`. This model will be the single source of truth for transaction data throughout the application. It should include fields like `id`, `date`, `description`, `amount`, `currency`, `category`, etc.
- [x] **Task:** Define the `IDataSourceAdapter` interface. [38ab768]
- [x] **Task:** Implement a root-level test script. [cd83622]
    - [ ] **Task:** Install necessary testing libraries (e.g., `jest`, `ts-jest`).
    - [ ] **Task:** Configure Jest to work with TypeScript and the monorepo structure.
    - [ ] **Task:** Create a `test` script in the root `package.json` that runs all tests in the monorepo.
- [ ] **Task:** Conductor - User Manual Verification 'Core Data Models and Interfaces' (Protocol in workflow.md)

## Phase 2: CSV Adapter Implementation [checkpoint: ]

This phase focuses on implementing the logic to parse and validate data from CSV files.

- [x] **Task:** Implement the `CsvDataSourceAdapter`. [53afbc4]
    - [x] **Task:** Write Tests for `CsvDataSourceAdapter`.
    - [x] **Task:** Implement `CsvDataSourceAdapter`.
- [ ] **Task:** Conductor - User Manual Verification 'CSV Adapter Implementation' (Protocol in workflow.md)

## Phase 3: Asynchronous Ingestion Processor [checkpoint: ]

This phase integrates the new adapter with the existing BullMQ worker to process ingestions asynchronously.

- [ ] **Task:** Update the Ingestion Processor.
    - [ ] **Task:** Write Tests for the updated Ingestion Processor.
        - [ ] In `apps/worker/tests/integration/ingestion.processor.test.ts`, add tests to verify that the processor correctly uses the `CsvDataSourceAdapter` to process a job.
    - [ ] **Task:** Update `ingestion.processor.ts`.
        - [ ] In `apps/worker/src/processors/ingestion.processor.ts`, modify the job handler to instantiate and use the `CsvDataSourceAdapter`.
        - [ ] The processor should receive a file path or data buffer in the job payload, pass it to the adapter, and then process the returned transactions (e.g., save them to the database).
- [ ] **Task:** Conductor - User Manual Verification 'Asynchronous Ingestion Processor' (Protocol in workflow.md)

## Phase 4: API Integration [checkpoint: ]

This phase exposes the ingestion functionality through a secure GraphQL mutation.

- [ ] **Task:** Create the GraphQL mutation for data ingestion.
    - [ ] **Task:** Write Tests for the ingestion mutation.
        - [ ] In `apps/backend/tests/integration/ingestion.test.ts`, write an integration test that simulates a file upload and verifies that a job is correctly added to the BullMQ queue.
    - [ ] **Task:** Implement the ingestion mutation.
        - [ ] In `apps/backend/src/modules/financial/`, define a new GraphQL mutation for file upload.
        - [ ] The resolver for this mutation will handle the file upload (e.g., using `graphql-upload`), save the file temporarily, and then dispatch a job to the ingestion queue with the file path.
- [ ] **Task:** Conductor - User Manual Verification 'API Integration' (Protocol in workflow.md)
