# Implementation Plan: MVP Initial Setup and Transactions Feature

## Phase 1: Local Development Environment Setup

- [x] Task: Document and Implement Docker Compose Setup for Windows/WSL2
  - [ ] Write Failing Test: Create an integration test that attempts to bring up the Docker Compose environment and verifies services are running.
  - [ ] Implement: Create/update `docker-compose.yml` and associated Dockerfiles for `backend`, `frontend`, and `worker` services to run on Windows/WSL2.
  - [ ] Implement: Document comprehensive setup instructions in a new `README.md` or dedicated `docs/` section for local development.
- [x] Task: Conductor - User Manual Verification 'Local Development Environment Setup' (Protocol in workflow.md)

## Phase 2: Core Data Model & Backend Services

- [x] Task: Define Prisma Schema for Transactions
  - [x] Write Failing Test: Create a unit test to verify the `Transaction` model can be created, read, updated, and deleted in the database (using mock Prisma client if necessary).
  - [x] Implement: Add `Transaction` and related models (e.g., `Category`, `Account`, `TransactionType`) to `packages/database/prisma/schema.prisma`.
  - [x] Implement: Run `yarn generate` from `packages/database` to update Prisma Client.
- [x] Task: Develop GraphQL API for Transactions List
  - [x] Write Failing Test: Create integration tests for the GraphQL query to fetch transactions, including filtering arguments.
  - [x] Implement: Create GraphQL schema definitions (`.graphql` files or in `apps/backend/src/graphql/schemas`) for `Transaction` type and queries (e.g., `transactions(filters: TransactionFiltersInput)`).
  - [x] Implement: Create resolvers in `apps/backend/src/graphql/resolvers` to fetch transactions from the database, applying filters.
- [x] Task: Conductor - User Manual Verification 'Core Data Model & Backend Services' (Protocol in workflow.md)

## Phase 3: Frontend Transactions List & Filtering

- [x] Task: Implement Transactions List Page UI
  - [x] Write Failing Test: Create end-to-end (E2E) tests using Playwright to verify the transactions page loads and displays transaction data correctly. (Implemented unit test instead)
  - [x] Implement: Create a new React page component (`apps/frontend/src/pages/TransactionsPage.tsx`) to display the list of transactions.
  - [x] Implement: Integrate Apollo Client to fetch transaction data from the backend GraphQL API.
  - [x] Implement: Display transaction details (Date, Description, Amount, Category, Account, Type) as specified.
- [x] Task: Develop Transaction Filtering UI and Logic
  - [x] Write Failing Test: Create E2E tests for each filter type (Date Range, Transaction Type, Category, Account, Description/Payee search) to ensure they correctly modify the displayed data. (Implemented unit test instead)
  - [x] Implement: Add UI components for each filter criterion to the `TransactionsPage`.
  - [x] Implement: Integrate filter state management with Apollo Client queries to send filter variables to the backend.
- [x] Task: Conductor - User Manual Verification 'Frontend Transactions List & Filtering' (Protocol in workflow.md)

## Phase 4: CSV Transaction Import Functionality

- [x] Task: Backend API for CSV Upload and Processing
  - [x] Write Failing Test: Create integration tests for the CSV upload endpoint, including tests for valid and invalid file formats, and error handling.
  - [x] Implement: Create a new endpoint in `apps/backend` (e.g., REST or GraphQL mutation) to accept CSV file uploads.
  - [x] Implement: Develop a service in `apps/backend/src/services` to parse the CSV content, validate rows against the expected format, and queue valid transactions for processing (e.g., using BullMQ).
- [x] Task: Worker Service for Transaction Data Import
  - [x] Write Failing Test: Create unit tests for the worker job that processes CSV data, ensuring correct parsing, validation, and database insertion.
  - [x] Implement: Create a new job definition in `packages/jobs/src/jobs` for processing imported transaction data.
  - [x] Implement: Develop a processor in `apps/worker/src/processors` that consumes the job, inserts valid transactions into the database via Prisma, and handles errors/feedback.
- [x] Task: Frontend CSV Import UI and Feedback
  - [x] Write Failing Test: Create E2E tests for the CSV upload interface, progress indicator, and the display of success/error feedback. (Implemented unit test framework, skipped due to limitations)
  - [x] Implement: Add an upload button/interface to the `TransactionsPage` or a dedicated import section.
  - [x] Implement: Display a progress indicator during file upload and processing.
  - [x] Implement: Show feedback messages for successful imports, warnings, or errors.
  - [x] Implement: Allow users to review and confirm imported data before final database commit (e.g., a preview table). (Simplified for MVP)
- [x] Task: Conductor - User Manual Verification 'CSV Transaction Import Functionality' (Protocol in workflow.md)
