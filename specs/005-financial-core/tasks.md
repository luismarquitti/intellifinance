# Tasks: Financial Core & Transactions List MVP

**Feature**: `005-financial-core`
**Status**: Draft

## Phase 1: Setup

- [x] T001 [P] Create feature directory structure in `apps/backend/src/modules/financial`
- [x] T002 [P] Create feature directory structure in `apps/frontend/src/components/financial`
- [x] T003 [P] Create feature directory structure in `apps/frontend/src/components/common`

## Phase 2: Foundational (Blocking)

**Goal**: Establish data model and core API structure.

- [x] T004 Define `Account`, `Category`, `Transaction` models in `packages/database/prisma/schema.prisma`
- [x] T005 Run `yarn db:generate` and `yarn db:migrate` to update database
- [x] T006 Implement seed script in `packages/database/prisma/seed.ts` to import `seed-data.json`, transform data (Date parsing, Status mapping), and populate Categories/Transactions
- [x] T007 Run `yarn db:seed` to populate initial data
- [x] T008 Define GraphQL types (Account, Category, Transaction) in `apps/backend/src/modules/financial/types.ts`
- [x] T009 Define Zod schemas for inputs in `packages/types/src/financial.ts`
- [x] T010 Configure MUI Theme (Colors, Shapes) in `apps/frontend/src/theme/index.ts` (or equivalent)

## Phase 3: User Story 1 - View Transactions (P1)

**Goal**: Users can view a list of transactions.
**Independent Test**: Verify `/transactions` page loads and displays data from DB.

- [x] T011 [US1] Implement `accounts` resolver in `apps/backend/src/modules/financial/resolvers.ts`
- [x] T012 [US1] Implement `categories` resolver in `apps/backend/src/modules/financial/resolvers.ts`
- [x] T013 [US1] Implement `transactions` resolver (basic list) in `apps/backend/src/modules/financial/resolvers.ts`
- [x] T014 [US1] Create `TransactionTable` component in `apps/frontend/src/components/financial/TransactionTable.tsx`
- [x] T015 [US1] Create `TransactionList` container component in `apps/frontend/src/components/financial/TransactionList.tsx`
- [x] T016 [US1] Create `FloatingActionButton` component in `apps/frontend/src/components/common/FloatingActionButton.tsx` (or inline)
- [x] T017 [US1] Create `TransactionsPage` in `apps/frontend/src/pages/TransactionsPage.tsx`
- [x] T018 [US1] Integrate `transactions` query in `TransactionsPage` and pass data to list

## Phase 4: User Story 2 - Filter Transactions (P2)

**Goal**: Users can filter by Account and Date.
**Independent Test**: Verify list updates when filters are applied.

- [x] T019 [US2] Update `transactions` resolver to handle `filter` arguments in `apps/backend/src/modules/financial/resolvers.ts`
- [x] T020 [US2] Create `FilterSection` component in `apps/frontend/src/components/financial/FilterSection.tsx`
- [x] T021 [US2] Create `ActiveFilters` component in `apps/frontend/src/components/financial/ActiveFilters.tsx`
- [x] T022 [US2] Integrate filter state and query refetching in `TransactionsPage.tsx`

## Phase 5: User Story 3 - View Financial Summary (P2)

**Goal**: Users see financial summary cards.
**Independent Test**: Verify cards show correct totals.

- [x] T023 [US3] Implement logic to calculate/fetch summary data (Balance, Income, Expense) in `apps/backend/src/modules/financial/services.ts`
- [x] T024 [US3] Create `SummaryCards` component in `apps/frontend/src/components/financial/SummaryCards.tsx`
- [x] T025 [US3] Integrate summary data into `TransactionsPage.tsx`

## Phase 6: Polish

- [x] T026 Verify responsive layout (Mobile/Desktop) for Table and Filters
- [x] T027 Ensure all colors match strict design tokens (Success Green, Error Red)

## Dependencies

1. Phase 1 & 2 MUST be completed before Phase 3.
2. Phase 3 (List) is a prerequisite for Phase 4 (Filters) and Phase 5 (Summary).
3. Phase 4 and 5 can be executed in parallel.

## Implementation Strategy

1. **MVP**: Complete Phases 1, 2, and 3. This gives a working list.
2. **Enhancement**: Add Phase 4 (Filters) and Phase 5 (Summary).
