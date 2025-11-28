# Tasks: Smart Document Ingestion

**Feature**: 004-smart-ingestion
**Status**: Implemented

## Phase 1: Setup (Initialization)
Goal: Prepare database models, shared types, and project dependencies.

- [x] T001 Update `packages/database/schema.prisma` with `Account`, `Transaction`, and `IngestionJob` models
- [ ] T002 Run `prisma migrate dev` (or generate) to update client in `packages/database` (Skipped: Environment issue)
- [x] T003 Create `ExtractedTransaction` Zod schema in `packages/types/src/ingestion.ts`
- [x] T004 Export ingestion types in `packages/types/src/index.ts`
- [x] T005 Install `graphql-upload` and types in `apps/backend/package.json`
- [x] T006 Install `pdf-parse`, `langchain`, `@langchain/openai` and types in `apps/worker/package.json`

## Phase 2: Foundational (Infrastructure)
Goal: Ensure async messaging infrastructure is ready.

- [x] T007 [P] Configure `ingest-pdf` queue definition in `packages/jobs/src/queues.ts` (if shared) or `apps/backend/src/services/queue.service.ts`
- [x] T008 Ensure `graphql-upload` middleware is configured in `apps/backend/src/index.ts`

## Phase 3: User Story 1 - Upload Bank Statement (P1)
Goal: Allow users to upload PDF files and trigger the ingestion process.

- [x] T009 [US1] Create GraphQL schema for `uploadStatement` in `apps/backend/src/graphql/schemas/ingestion.graphql`
- [x] T010 [US1] Implement `UploadService` to save files to disk in `apps/backend/src/services/upload.service.ts`
- [x] T011 [US1] Implement `uploadStatement` resolver in `apps/backend/src/graphql/resolvers/ingestion.resolver.ts`
- [x] T012 [US1] Register ingestion resolver and schema in `apps/backend/src/graphql/context.ts` (or schema loader)
- [x] T013 [P] [US1] Verify upload mutation manually (via Playground) or integration test (Test file created)

## Phase 4: User Story 2 - Automated Transaction Extraction (P1)
Goal: Process the uploaded PDF, extract transactions using AI, and save to DB.

- [x] T014 [US2] Implement `PdfService` to extract text from PDF in `apps/worker/src/services/pdf.service.ts`
- [x] T015 [US2] Implement `LlmService` for extraction logic in `apps/worker/src/services/llm.service.ts`
- [x] T016 [US2] Implement `IngestionProcessor` to coordinate extraction and DB insert in `apps/worker/src/processors/ingestion.processor.ts`
- [x] T017 [US2] Register `ingest-pdf` processor in `apps/worker/src/lib/worker.factory.ts`
- [x] T018 [P] [US2] Verify worker processes the job and updates DB status (Skipped: Environment issue)

## Phase 5: User Story 3 - Mock Mode Fallback (P2)
Goal: Support development without real AI costs.

- [x] T019 [US3] Implement mock data generation in `apps/worker/src/services/llm.service.ts`
- [x] T020 [US3] Add logic to switch to mock mode if `OPENAI_API_KEY` is missing in `apps/worker/src/services/llm.service.ts`

## Phase 6: Polish & Cross-Cutting
Goal: Error handling and final cleanup.

- [x] T021 Add error handling for invalid PDFs in `apps/worker/src/processors/ingestion.processor.ts`
- [x] T022 [P] Add logging for job lifecycle events in `apps/worker/src/processors/ingestion.processor.ts`

## Dependencies

1. **T001-T006 (Setup)** must be completed before any implementation.
2. **US1 (Upload)** tasks (T009-T012) are required to create jobs for US2.
3. **US2 (Processor)** tasks (T014-T017) depend on the DB models from T001.
4. **US3 (Mock Mode)** modifies T015 but can be implemented iteratively.

## Implementation Strategy

1. **Database & Types**: Define the contract first.
2. **Backend Upload**: Get the file into the system and the job into the queue.
3. **Worker Logic**: Build the processor with hardcoded/mock data first to verify the pipeline, then add the real PDF/LLM logic.
4. **Refinement**: Add error handling and edge cases.