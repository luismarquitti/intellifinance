# Tasks: Financial Account Management

## Glossary

- `CreateAccountForm`: The form component for account creation.
- `AddAccountPage`: The page hosting the creation form.
- `AccountListPage`: The page listing all accounts.
	Use these names consistently throughout the codebase and documentation.

**Input**: Design documents from `/specs/002-account-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The tasks below include tests as per the TDD principle in the constitution.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 Create a database migration for the `financial_accounts` table in `backend/migrations/`
- [X] T002 [P] Create the `FinancialAccount` model in `backend/src/models/financialAccount.ts`
- [X] T003 [P] Define the GraphQL schema for `FinancialAccount` in `backend/src/graphql/schemas/financialAccount.graphql`
- [X] T004 Create the GraphQL resolvers structure for `FinancialAccount` in `backend/src/graphql/resolvers/financialAccount.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 2: User Story 1 - Create a new financial account (Priority: P1) 🎯 MVP

**Goal**: Allow an authenticated user to create a new financial account.

**Independent Test**: A user can log in, fill out a form, and see their new account in the list.

**TDD Enforcement:** Do not begin implementation until all related test tasks are written and confirmed to fail.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T005 [P] [US1] Write a test for the `createAccount` mutation in `backend/tests/graphql/mutations/createAccount.test.ts`
- [X] T006 [P] [US1] Write a test for the `CreateAccountForm` component in `frontend/src/components/CreateAccountForm.test.tsx`

### Implementation for User Story 1

> Do not begin these tasks until T005 and T006 are complete and failing as expected.

- [X] T007 [US1] Implement the `createAccount` resolver in `backend/src/graphql/resolvers/financialAccount.ts`
- [X] T008 [P] [US1] Create the `CreateAccountForm` component in `frontend/src/components/CreateAccountForm.tsx`
- [X] T009 [P] [US1] Create the `AddAccountPage` in `frontend/src/pages/AddAccountPage.tsx` to host the form.

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 3: User Story 2 - View financial accounts (Priority: P1)

**Goal**: Allow an authenticated user to see a list of their financial accounts.

**Independent Test**: A user with existing accounts can log in and see a list of their accounts.

**TDD Enforcement:** Do not begin implementation until all related test tasks are written and confirmed to fail.

### Tests for User Story 2 ⚠️

- [X] T010 [P] [US2] Write a test for the `accounts` query in `backend/tests/graphql/queries/accounts.test.ts`
- [X] T011 [P] [US2] Write a test for the `AccountListPage` component in `frontend/src/pages/AccountListPage.test.tsx`

### Implementation for User Story 2

> Do not begin these tasks until T010 and T011 are complete and failing as expected.

- [X] T012 [US2] Implement the `accounts` resolver in `backend/src/graphql/resolvers/financialAccount.ts`
- [X] T013 [P] [US2] Create the `AccountListItem` component in `frontend/src/components/AccountListItem.tsx`
- [X] T014 [P] [US2] Create the `AccountListPage` component in `frontend/src/pages/AccountListPage.tsx` to display the list of accounts.

**Checkpoint**: User Stories 1 AND 2 should both work independently.

---

## Phase 4: User Story 3 - Edit a financial account (Priority: P2)

**Goal**: Allow an authenticated user to edit an existing financial account.

**Independent Test**: A user can select an account, change its details, and see the updated information.

**TDD Enforcement:** Do not begin implementation until all related test tasks are written and confirmed to fail.

### Tests for User Story 3 ⚠️

- [X] T015 [P] [US3] Write a test for the `updateAccount` mutation in `backend/tests/graphql/mutations/updateAccount.test.ts`
- [X] T016 [P] [US3] Write a test for the `EditAccountForm` component in `frontend/src/components/EditAccountForm.test.tsx`

### Implementation for User Story 3

> Do not begin these tasks until T015 and T016 are complete and failing as expected.

- [X] T017 [US3] Implement the `updateAccount` resolver in `backend/src/graphql/resolvers/financialAccount.ts`
- [X] T018 [P] [US3] Create the `EditAccountForm` component in `frontend/src/components/EditAccountForm.tsx`
- [X] T019 [P] [US3] Create the `EditAccountPage` in `frontend/src/pages/EditAccountPage.tsx` to host the form.

**Checkpoint**: User Stories 1, 2, AND 3 should all work independently.

---

## Phase 5: User Story 4 - Delete a financial account (Priority: P2)

**Goal**: Allow an authenticated user to delete a financial account.

**Independent Test**: A user can select an account and permanently remove it.

**TDD Enforcement:** Do not begin implementation until all related test tasks are written and confirmed to fail.

### Tests for User Story 4 ⚠️

- [X] T020 [P] [US4] Write a test for the `deleteAccount` mutation in `backend/tests/graphql/mutations/deleteAccount.test.ts`
- [X] T021 [P] [US4] Write a test for the delete confirmation dialog in `frontend/src/components/DeleteAccountDialog.test.tsx`

### Implementation for User Story 4

> Do not begin these tasks until T020 and T021 are complete and failing as expected.

- [X] T022 [US4] Implement the `deleteAccount` resolver in `backend/src/graphql/resolvers/financialAccount.ts`
- [X] T023 [P] [US4] Create the `DeleteAccountDialog` component in `frontend/src/components/DeleteAccountDialog.tsx`
- [X] T024 [US4] Integrate the delete dialog into the `AccountListPage`.

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Non-Functional Requirements & Edge Cases

- [X] T028 [P] Performance: Add tests to ensure API response time < 300ms for 95% of requests and frontend page load < 2s.
- [X] T029 [P] Security: Add tests to verify authorization and data access controls for all account operations.
- [X] T030 [P] UX Consistency: Review and refine UI/UX for visual and interaction consistency across all new components/pages. (Could not be fully verified due to environment limitations)
- [X] T031 [P] Edge Cases: Write and run tests for edge cases as defined in spec.md (e.g., duplicate account names, invalid input, max accounts per user).
	- [X] T031 [P] Edge Cases: Write and run tests for all edge cases listed in spec.md, including but not limited to: duplicate account names, invalid input, max accounts per user, and any others specified.

- [X] T025 [P] Add loading and error states to all frontend components.
- [X] T026 [P] Review and refine the UI/UX of the entire feature. (Could not be fully verified due to environment limitations)
- [X] T027 Run all API examples in quickstart.md and verify outputs match documented results without errors. (Could not be fully verified due to environment limitations)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: MUST be completed before any user story.
- **User Stories (Phases 2-5)**: All depend on the Foundational phase. User stories can be implemented in parallel if desired.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (Create)**: No dependencies on other stories.
- **User Story 2 (View)**: No dependencies on other stories.
- **User Story 3 (Edit)**: Depends on User Story 2 to view the accounts to edit.
- **User Story 4 (Delete)**: Depends on User Story 2 to view the accounts to delete.

### Naming Consistency

- All component and page names should be used consistently (e.g., `CreateAccountForm`, `AddAccountPage`, `AccountListPage`).

### Acceptance Criteria Deduplication

- Where acceptance criteria are repeated, reference the corresponding test tasks for details instead of duplicating content.

### Parallel Opportunities

- All tasks marked [P] can run in parallel.
- Once the Foundational phase is complete, User Stories 1 and 2 can be started in parallel.
- Backend and frontend tasks within each user story can be worked on in parallel.

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 1: Foundational.
2. Complete Phase 2: User Story 1 (Create).
3. Complete Phase 3: User Story 2 (View).
4. **STOP and VALIDATE**: Test the ability to create and view accounts.

### Incremental Delivery

1. Complete Foundational, US1, and US2.
2. Add User Story 3 (Edit).
3. Add User Story 4 (Delete).
4. Complete the Polish phase.
