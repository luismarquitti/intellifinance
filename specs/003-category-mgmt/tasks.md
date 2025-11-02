---
description: "Task list for Category Management (CRUD) feature"
---

# Tasks: Category Management (CRUD)

**Input**: Design documents from `/specs/003-category-mgmt/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/category.graphql

**Tests**: TDD is required (see research.md and plan.md). Contract and integration tests are included for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create category management folder structure in backend/src/models/, backend/src/services/, backend/src/api/, frontend/src/pages/, frontend/src/components/
- [ ] T002 Initialize backend and frontend dependencies for category management (backend/package.json, frontend/package.json)
- [ ] T003 [P] Configure linting and formatting tools in backend/ and frontend/

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T004 Setup category table and relationships in backend/migrations/ (see data-model.md)
- [ ] T005 [P] Implement authentication/authorization middleware in backend/src/middleware/auth.ts
- [ ] T006 [P] Setup GraphQL schema for category in backend/src/api/schema/category.graphql
- [ ] T007 Create Category entity/model in backend/src/models/category.ts
- [ ] T008 Configure error handling and logging for category operations in backend/src/logger.ts
- [ ] T009 Setup environment variable validation for category feature in backend/.env.example

---

## Phase 3: User Story 1 - Create Category (Priority: P1) 🎯 MVP

**Goal**: Allow authenticated users to create new categories (including subcategories).

**Independent Test**: Create a new category and verify it appears in the user's category list.

### Tests for User Story 1

- [ ] T010 [P] [US1] Contract test for createCategory mutation in backend/tests/contract/category.test.ts
- [ ] T011 [P] [US1] Integration test for category creation in backend/tests/integration/category-create.test.ts

- [ ] T011a [P] [US1] End-to-end test for category creation in backend/tests/e2e/category-e2e.test.ts
- [ ] T011b [P] [US1] Validation test for duplicate category name prevention in backend/tests/integration/category-duplicate.test.ts
- [ ] T011c [P] [US1] Ownership enforcement test for createCategory in backend/tests/integration/category-ownership.test.ts

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement createCategory resolver in backend/src/api/resolvers/category.ts
- [ ] T013 [P] [US1] Implement CategoryService.create in backend/src/services/CategoryService.ts
- [ ] T014 [P] [US1] Add category creation form in frontend/src/pages/CategoriesPage.tsx
- [ ] T015 [US1] Add category creation UI component in frontend/src/components/CategoryForm.tsx
- [ ] T016 [US1] Add validation and error handling for category creation in backend/src/services/categoryService.ts
- [ ] T017 [US1] Add logging for category creation in backend/src/logger.ts

---

## Phase 4: User Story 2 - Edit Category (Priority: P2)

**Goal**: Allow users to edit the name or parent of an existing category.

**Independent Test**: Edit a category and verify the changes are reflected in the category list.

### Tests for User Story 2

- [ ] T018 [P] [US2] Contract test for updateCategory mutation in backend/tests/contract/category.test.ts
- [ ] T019 [P] [US2] Integration test for category editing in backend/tests/integration/category-edit.test.ts

- [ ] T019a [P] [US2] End-to-end test for category editing in backend/tests/e2e/category-e2e.test.ts
- [ ] T019b [P] [US2] Validation test for circular parent assignment prevention in backend/tests/integration/category-circular.test.ts
- [ ] T019c [P] [US2] Ownership enforcement test for updateCategory in backend/tests/integration/category-ownership.test.ts

### Implementation for User Story 2

- [ ] T020 [P] [US2] Implement updateCategory resolver in backend/src/api/resolvers/category.ts
- [ ] T021 [P] [US2] Implement CategoryService.update in backend/src/services/CategoryService.ts
- [ ] T022 [P] [US2] Add category editing form in frontend/src/pages/CategoriesPage.tsx
- [ ] T023 [US2] Add category editing UI component in frontend/src/components/CategoryForm.tsx
- [ ] T024 [US2] Add validation and error handling for category editing in backend/src/services/categoryService.ts
- [ ] T025 [US2] Add logging for category editing in backend/src/logger.ts

---

## Phase 5: User Story 3 - Delete Category (Priority: P3)

**Goal**: Allow users to delete a category or subcategory, reassigning subcategories to root if needed.

**Independent Test**: Delete a category and verify it no longer appears in the user's list; subcategories are reassigned to root.

### Tests for User Story 3

- [ ] T026 [P] [US3] Contract test for deleteCategory mutation in backend/tests/contract/category.test.ts
- [ ] T027 [P] [US3] Integration test for category deletion in backend/tests/integration/category-delete.test.ts

- [ ] T027a [P] [US3] End-to-end test for category deletion in backend/tests/e2e/category-e2e.test.ts
- [ ] T027b [P] [US3] Ownership enforcement test for deleteCategory in backend/tests/integration/category-ownership.test.ts

### Implementation for User Story 3

- [ ] T028 [P] [US3] Implement deleteCategory resolver in backend/src/api/resolvers/category.ts
- [ ] T029 [P] [US3] Implement CategoryService.delete in backend/src/services/CategoryService.ts
- [ ] T030 [P] [US3] Add category deletion UI in frontend/src/pages/CategoriesPage.tsx
- [ ] T031 [US3] Add validation and error handling for category deletion in backend/src/services/categoryService.ts
- [ ] T032 [US3] Add logging for category deletion in backend/src/logger.ts

---

## Phase 6: User Story 4 - View Categories (Priority: P4)

**Goal**: Allow users to view all their categories (including subcategories).

**Independent Test**: View categories and verify all categories and subcategories are displayed correctly.

### Tests for User Story 4

- [ ] T033 [P] [US4] Contract test for categories query in backend/tests/contract/category.test.ts
- [ ] T034 [P] [US4] Integration test for category viewing in backend/tests/integration/category-view.test.ts

- [ ] T034a [P] [US4] End-to-end test for category viewing in backend/tests/e2e/category-e2e.test.ts
- [ ] T034b [P] [US4] Ownership enforcement test for categories query in backend/tests/integration/category-ownership.test.ts

### Implementation for User Story 4

- [ ] T035 [P] [US4] Implement categories and category resolvers in backend/src/api/resolvers/category.ts
- [ ] T036 [P] [US4] Implement CategoryService.list in backend/src/services/CategoryService.ts
- [ ] T037 [P] [US4] Add category list UI in frontend/src/pages/CategoriesPage.tsx
- [ ] T038 [US4] Add category tree display in frontend/src/components/CategoryTree.tsx
- [ ] T039 [US4] Add validation and error handling for category viewing in backend/src/services/categoryService.ts
- [ ] T040 [US4] Add logging for category viewing in backend/src/logger.ts

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T041 [P] Documentation updates for category management in Executive_Summary.md and README.md
- [ ] T042 Code cleanup and refactoring in backend/src/services/categoryService.ts and frontend/src/components/
- [ ] T043 Performance optimization for category queries in backend/src/services/categoryService.ts
- [ ] T044 [P] Additional unit tests for category logic in backend/tests/unit/category.test.ts
- [ ] T045 Security hardening for category endpoints in backend/src/api/resolvers/category.ts
- [ ] T046 Run quickstart.md validation for category management

- [ ] T047 [P] Test for SC-003: No duplicate category names within same parent in backend/tests/integration/category-duplicate.test.ts
- [ ] T048 [P] Test for circular reference prevention in backend/tests/integration/category-circular.test.ts

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies
- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story
- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities
- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Contract test for createCategory mutation in backend/tests/contract/category.test.ts"
Task: "Integration test for category creation in backend/tests/integration/category-create.test.ts"

# Launch all models/services for User Story 1 together:
Task: "Implement createCategory resolver in backend/src/api/resolvers/category.ts"
Task: "Implement CategoryService.create in backend/src/services/categoryService.ts"
Task: "Add category creation form in frontend/src/pages/CategoriesPage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery
1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy
With multiple developers:
1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes
- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
