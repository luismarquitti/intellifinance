# Feature Specification: Smart Document Ingestion

**Feature Branch**: `004-smart-ingestion`
**Created**: 2025-11-28
**Status**: Draft
**Input**: User description: "FEATURE: Smart Document Ingestion (Spec 004) **Context:** We have the Async Infrastructure (Spec 003). Now we need the 'Brain': an AI Agent capable of reading PDF bank statements and extracting structured transactions. **Requirements:** 1. **Data Model (Prisma - packages/database):** - Create `Account` model (Bank Name, Type, User Relation). - Create `Transaction` model (Date, Amount, Description, Category, Account Relation, SourceFileUrl). - Create `IngestionJob` model to track status (PENDING, PROCESSING, COMPLETED, FAILED). 2. **API Layer (apps/backend):** - Mutation `uploadStatement(file: Upload!, accountId: ID!)`: - Save file locally (uploads/ folder for MVP). - Create `IngestionJob` record. - Dispatch job `ingest-pdf` to BullMQ. 3. **Worker Layer (apps/worker):** - Implement `IngestionProcessor`. - **Step 1:** Extract text from PDF (use `pdf-parse`). - **Step 2:** LLM Extraction (LangChain). - Use a Zod Schema to force the LLM to return a list of strict Transaction objects. - *Constraint:* Support a 'Mock Mode' if OpenAI API Key is missing. - **Step 3:** Bulk Insert transactions into Postgres via Prisma. 4. **Shared Types (packages/types):** - Define `ExtractedTransaction` Zod Schema (reused by LLM parser and Backend validation). **Goal:** A fully automated pipeline where a user uploads a PDF and transactions appear in the database asynchronously."

## Clarifications

### Session 2025-11-28
- Q: What is the maximum file size (MB) for an uploaded PDF in the MVP? → A: 5MB
- Q: Must the MVP support scanned (image-only) bank statements? → A: No (Text-based PDFs only)
- Q: How should the system handle extracted descriptions that exceed the database column limit? → A: Truncate description to schema limit and log warning.
- Q: What specific details should be stored in IngestionJob for worker failures? → A: Detailed technical error + user-friendly summary + stack trace.
- Q: What level of logging/metrics is required for worker process tracing and error debugging? → A: Structured logging system (e.g., JSON logs, forwarded to ELK/Grafana).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Upload Bank Statement (Priority: P1)

As a user, I want to upload a PDF bank statement so that my transactions can be automatically imported.

**Why this priority**: This is the entry point for the entire feature. Without uploading, no processing can happen.

**Independent Test**: Can be tested by calling the `uploadStatement` mutation with a valid PDF file.

**Acceptance Scenarios**:

1. **Given** a valid authenticated user and a PDF file, **When** the user calls `uploadStatement`, **Then** the file is saved, an `IngestionJob` is created with status `PENDING`, and the job ID is returned.
2. **Given** an invalid file type (e.g., JPG), **When** the user attempts upload, **Then** the system returns a validation error.
3. **Given** a missing `accountId`, **When** the user attempts upload, **Then** the system returns a validation error.

### User Story 2 - Automated Transaction Extraction (Priority: P1)

As a user, I want my uploaded statement to be processed automatically so that I don't have to manually enter transactions.

**Why this priority**: This is the core value proposition (the "Brain").

**Independent Test**: Can be tested by monitoring the `IngestionJob` status and checking the `Transaction` table after a job completes.

**Acceptance Scenarios**:

1. **Given** a pending ingestion job for a valid PDF, **When** the worker processes it, **Then** the text is extracted, parsed by LLM, and transactions are inserted into the database.
2. **Given** the processing completes successfully, **When** checking the `IngestionJob`, **Then** its status is `COMPLETED`.
3. **Given** a PDF with 5 transactions, **When** processed, **Then** 5 distinct `Transaction` records are created linked to the correct `Account`.

### User Story 3 - Mock Mode Fallback (Priority: P2)

As a developer or system without an OpenAI key, I want the system to use mock data so that I can test the pipeline without incurring costs or errors.

**Why this priority**: Critical for development stability and cost management.

**Independent Test**: Can be tested by unsetting `OPENAI_API_KEY` and triggering a job.

**Acceptance Scenarios**:

1. **Given** the `OPENAI_API_KEY` is missing, **When** a job is processed, **Then** the system uses a predefined mock response instead of calling the LLM.
2. **Given** Mock Mode is active, **When** processing finishes, **Then** the job is marked `COMPLETED` and mock transactions are present in the DB.

### Edge Cases

- **Invalid PDF Content**: What happens if the PDF is not a bank statement? (LLM might fail or return empty. System should handle this gracefully, potentially marking job as FAILED or COMPLETED with 0 transactions).
- **LLM Hallucination**: The Zod schema validation in Step 2 is the primary defense. If LLM output doesn't match schema, the task should fail or retry.
- **Partial Failures**: If one transaction fails validation, should the whole batch fail? (Assumption: Yes, for data integrity).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST define Prisma models for `Account`, `Transaction`, and `IngestionJob`.
- **FR-002**: The system MUST expose a GraphQL mutation `uploadStatement(file: Upload!, accountId: ID!)`.
- **FR-003**: The mutation MUST save the uploaded file to a local `uploads/` directory (MVP).
- FR-004: The mutation MUST create an `IngestionJob` record and dispatch an `ingest-pdf` job to BullMQ.
- **FR-005**: The worker MUST implement an `IngestionProcessor` that extracts text from PDF files using `pdf-parse` (Text-based PDFs only; NO OCR support).
- **FR-006**: The worker MUST use an LLM (via LangChain) to parse extracted text into structured data.
- **FR-007**: The LLM output MUST be validated against a strict Zod schema (`ExtractedTransaction`) defined in `packages/types`.
- **FR-008**: The system MUST support a "Mock Mode" that returns static transaction data if the `OPENAI_API_KEY` is invalid or missing.
- **FR-009**: Validated transactions MUST be bulk-inserted into the PostgreSQL database via Prisma.
- **FR-010**: The `IngestionJob` status MUST be updated to `PROCESSING`, `COMPLETED`, or `FAILED` reflecting the actual state.

### Non-Functional Requirements

- **NFR-001**: The system MUST reject file uploads larger than 5MB.
- **NFR-002**: Extracted transaction descriptions exceeding the database column limit MUST be truncated, and a warning logged for review.
- **NFR-003**: IngestionJob `errorDetails` MUST store a JSON object containing `technicalError` (detailed, possibly with stack trace) and `userFriendlyMessage` fields.
- **NFR-004**: Worker process tracing and error debugging MUST use a structured logging system (e.g., JSON logs, forwarded to ELK/Grafana).

### Key Entities

- **Account**: Represents a bank account. Attributes: `id`, `bankName`, `type`, `userId`.
- **Transaction**: Represents a financial entry. Attributes: `date`, `amount`, `description`, `category`, `accountId`, `sourceFileUrl`.
- **IngestionJob**: Tracks the async process. Attributes: `id`, `status` (ENUM), `fileUrl`, `accountId`, `errorDetails` (JSON or String).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can upload a 1-page PDF and see extracted transactions in the database within 60 seconds.
- **SC-002**: The system successfully handles the absence of AI Service credentials by falling back to mock data without crashing.
- **SC-003**: 100% of created transactions adhere to the defined data validation schema (Date, Amount, Description).
- **SC-004**: The worker process can restart without losing the status of pending jobs.