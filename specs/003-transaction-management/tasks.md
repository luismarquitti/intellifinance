# Tasks: Transaction Management

**Prerequisites**: spec.md, plan.md

## Phase 1: Backend Foundation

- [ ] T001 Create migration for `transactions` table <!-- id: 0 -->
- [ ] T002 Create `Transaction` model in `backend/src/models/transaction.ts` <!-- id: 1 -->
- [ ] T003 Define GraphQL schema in `backend/src/graphql/schemas/transaction.graphql` <!-- id: 2 -->
- [ ] T004 Create resolver structure in `backend/src/graphql/resolvers/transaction.ts` <!-- id: 3 -->

## Phase 2: Backend Logic (TDD)

- [ ] T005 [TEST] Write tests for `createTransaction` (verifying balance update) <!-- id: 4 -->
- [ ] T006 Implement `createTransaction` resolver <!-- id: 5 -->
- [ ] T007 [TEST] Write tests for `updateTransaction` (verifying balance adjustment) <!-- id: 6 -->
- [ ] T008 Implement `updateTransaction` resolver <!-- id: 7 -->
- [ ] T009 [TEST] Write tests for `deleteTransaction` (verifying balance restoration) <!-- id: 8 -->
- [ ] T010 Implement `deleteTransaction` resolver <!-- id: 9 -->
- [ ] T011 [TEST] Write tests for `transactions` query (filtering) <!-- id: 10 -->
- [ ] T012 Implement `transactions` query resolver <!-- id: 11 -->

## Phase 3: Frontend Implementation

- [ ] T013 Create `TransactionList` component <!-- id: 12 -->
- [ ] T014 Create `AddTransactionForm` component <!-- id: 13 -->
- [ ] T015 Create `EditTransactionForm` component <!-- id: 14 -->
- [ ] T016 Integrate Transaction management into `AccountDetailsPage` <!-- id: 15 -->
