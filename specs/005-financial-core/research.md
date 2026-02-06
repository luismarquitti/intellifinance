# Research & Clarifications: Financial Core & Transactions List MVP

**Feature**: `005-financial-core`
**Date**: 2025-11-30

## Decisions & Rationale

### 1. Database Schema (Prisma)
- **Decision**: Use `Decimal` for monetary values (`amount`, `balance`).
- **Rationale**: Floating point arithmetic is imprecise for financial calculations. `Decimal` ensures accuracy.
- **Alternatives**: `Float` (rejected due to precision issues), `Int` (cents) (rejected as `Decimal` is more explicit in Prisma/Postgres).

### 2. Frontend State Management
- **Decision**: Use Apollo Client Cache.
- **Rationale**: Sufficient for MVP requirements (list, filter, create). Avoids complexity of Redux/Zustand for now.
- **Alternatives**: Redux (overkill), Context API (less efficient for data fetching).

### 3. Filtering Logic
- **Decision**: Implement filtering at the database level (Prisma `where` clause).
- **Rationale**: Performance and scalability. Fetching all records and filtering on client is inefficient.

### 4. Design System
- **Decision**: Material UI v5 with custom ThemeProvider.
- **Rationale**: Mandated by requirements. Provides robust component library.
- **Alternatives**: TailwindCSS (Explicitly FORBIDDEN by spec).

## Clarifications Resolved

- **Seed Data**: Spec requires "Food, Transport, Salary" categories. Will implement a seed script in `packages/database/prisma/seed.ts`.
- **Date Handling**: Will use ISO 8601 strings for API communication and `Date` objects in frontend/backend logic.
- **Pagination**: Spec mentions "List with pagination". Will use standard offset/limit or cursor-based pagination (Prisma supports both, offset is simpler for MVP). *Decision: Offset-based for MVP simplicity.*

## Unknowns & Risks

- **Risk**: Large number of transactions could slow down the list view.
- **Mitigation**: Pagination is required and will be implemented.
