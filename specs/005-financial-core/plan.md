# Implementation Plan: Financial Core & Transactions List MVP

**Branch**: `005-financial-core` | **Date**: 2025-11-30 | **Spec**: [005-financial-core.spec.md](file:///f:/workspace/intellifinance/specs/005-financial-core/spec.md)
**Input**: Feature specification from `/specs/005-financial-core/spec.md`

## Summary

Implement the core banking domain (Accounts, Categories, Transactions) and the main transactions list UI. This involves creating Prisma models, GraphQL resolvers, and a Material UI frontend page with filtering capabilities.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Prisma, Apollo Server, Apollo Client, Material UI v5
**Storage**: PostgreSQL
**Testing**: Vitest (Backend), Playwright (E2E)
**Target Platform**: Web (React)
**Project Type**: Monorepo (Yarn Workspaces)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **[x] Principle I (SDD):** Does this feature have a `.spec.md` file?
- **[x] Principle II (Typing):** Are Zod schemas planned for all inputs?
- **[x] Principle III (Async):** Is blocking I/O correctly deferred to a worker? (N/A for this MVP)
- **[x] Principle IV (Monorepo):** Does the proposed structure respect app/package boundaries?
- **[x] Principle V (AI):** If AI is used, are there fallbacks and structured outputs? (N/A)
- **[x] Testing Strategy:** Does the plan include unit, integration, and E2E tests as required?
- **[x] Dev Workflow:** Does the plan account for conventional commits and PR reviews?

## Project Structure

### Documentation (this feature)

```text
specs/005-financial-core/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── schema.graphql
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
packages/database/
├── prisma/
│   ├── schema.prisma    # [MODIFY] Add Account, Category, Transaction models
│   ├── seed.ts          # [MODIFY] Add seed logic using seed-data.json
│   └── seed-data.json   # [NEW] Raw transaction data

apps/backend/
├── src/
│   ├── modules/
│   │   ├── financial/   # [NEW]
│   │   │   ├── resolvers.ts
│   │   │   ├── services.ts
│   │   │   └── types.ts
│   └── schema.ts        # [MODIFY] Merge new schemas

apps/frontend/
├── src/
│   ├── pages/
│   │   └── TransactionsPage.tsx # [NEW]
│   ├── components/
│   │   ├── financial/   # [NEW]
│   │   │   ├── TransactionList.tsx
│   │   │   ├── TransactionTable.tsx # [NEW]
│   │   │   ├── SummaryCards.tsx
│   │   │   ├── FilterSection.tsx
│   │   │   └── ActiveFilters.tsx    # [NEW]
│   │   ├── common/      # [NEW]
│   │   │   └── Pagination.tsx       # [NEW]
│   └── theme/           # [MODIFY] Ensure tokens are applied
```

**Structure Decision**: Standard monorepo structure. Shared logic in `packages`, API in `apps/backend`, UI in `apps/frontend`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
