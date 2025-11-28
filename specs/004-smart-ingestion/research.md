# Research & Decisions: Smart Document Ingestion

**Feature**: Smart Document Ingestion (Spec 004)
**Date**: 2025-11-28

## 1. AI/LLM Integration Strategy

**Decision**: Use `langchain` with OpenAI (GPT-3.5/4) for extraction, enforced by Zod schema.
**Rationale**:
- **LangChain**: Provides a unified interface for LLMs and easy switching between models (or mocks).
- **Structured Output**: We will use "Function Calling" or structured output parsing to ensure the LLM returns valid JSON matching our `ExtractedTransaction` schema.
- **Mock Mode**: Essential for development and testing without costs. We will implement a wrapper service that checks for `OPENAI_API_KEY` and returns static data if missing.

**Implementation Details**:
- **Package**: `langchain`, `@langchain/openai`, `@langchain/core`.
- **Prompting**: "Extract all financial transactions from the following text. Return a JSON array where each object has date, amount, description, and category."

## 2. PDF Parsing

**Decision**: Use `pdf-parse`.
**Rationale**:
- **Simplicity**: The spec explicitly requested `pdf-parse`. It is a lightweight, pure JS library that extracts raw text.
- **Limitations**: It ignores layout. For bank statements, this is usually acceptable as long as the text stream is continuous.
- **Alternatives**: `pdf2json` (more structure but complex), `tesseract` (OCR, overkill for digital PDFs).

## 3. File Upload Handling (GraphQL)

**Decision**: Use `graphql-upload` (v16+ for ESM/TS).
**Rationale**:
- Standard solution for GraphQL multipart requests.
- Works well with Apollo Server (requires disabling built-in CSRF for uploads in some versions, or specific config).
- **Storage**: Local filesystem (`uploads/` directory) as requested for MVP. Must be excluded from Git.

## 4. Data & Type Sharing

**Decision**: Define Zod schemas in `packages/types` and import them in both Backend (for API validation if needed) and Worker (for LLM validation).
**Rationale**:
- Single Source of Truth (DRY).
- Ensures the LLM output exactly matches what the database expects (mostly).

## 5. Async Workflow (BullMQ)

**Decision**:
- **Producer**: `apps/backend` adds job `ingest-pdf` to queue `document-ingestion`.
- **Consumer**: `apps/worker` defines a processor for `document-ingestion`.
- **Job Data**: `{ filePath: string, accountId: string, jobId: string }`.
- **Status Tracking**: The `IngestionJob` ID is returned to the client immediately. The client can poll `ingestionJob(id: ID!)` to see status updates.

## 6. Database Schema (Prisma)

**Decision**:
- Use `Decimal` for amounts (never Float for money).
- `IngestionJob` needs a `result` or `error` field to store summary info (e.g., "5 transactions extracted").
