# Tasks: User Authentication

**Input**: Design documents from `/specs/001-user-auth/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The plan includes test tasks as specified in `plan.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the feature.

- [ ] T001 [P] Configure Jest for backend tests in `backend/jest.config.js`
- [ ] T002 [P] Configure Jest and React Testing Library for frontend tests in `frontend/jest.config.js`
- [ ] T003 [P] Add `bcrypt` and `jsonwebtoken` dependencies to `backend/package.json`
- [ ] T004 [P] Add `@types/bcrypt` and `@types/jsonwebtoken` dev dependencies to `backend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [ ] T005 Create `User` model in `backend/src/models/user.ts` based on `data-model.md`
- [ ] T006 Create `RefreshToken` model in `backend/src/models/refreshToken.ts` based on `data-model.md`
- [ ] T007 [P] Create database migration for `users` and `refresh_tokens` tables in `backend/migrations/`
- [ ] T008 Implement authentication middleware in `backend/src/middleware/auth.ts` to verify JWTs.

---

## Phase 3: User Story 1 - New User Registration (Priority: P1) 🎯 MVP

**Goal**: A new user can create an account with their email and password.

**Independent Test**: A new user can register and is immediately logged in. The new user record appears in the database.

### Tests for User Story 1
- [ ] T009 [P] [US1] Write integration test for registration in `backend/tests/auth.test.ts` (should fail initially)
- [ ] T010 [P] [US1] Write unit tests for password hashing service in `backend/src/services/password.test.ts`

### Implementation for User Story 1

- [ ] T011 [US1] Implement password hashing service in `backend/src/services/password.ts`
- [ ] T012 [US1] Implement JWT service in `backend/src/services/token.ts` to issue access and refresh tokens.
- [ ] T013 [US1] Implement `register` mutation resolver in `backend/src/api/auth.ts`
- [ ] T014 [P] [US1] Add backend validation for email format and password strength in `backend/src/api/auth.ts`
- [ ] T015 [P] [US1] Add frontend validation for email format and password strength in `frontend/src/components/RegisterForm.tsx`
- [ ] T016 [US1] Display clear error messages for registration failures in `frontend/src/pages/Register.tsx`
- [ ] T017 [P] [US1] Create registration form component in `frontend/src/components/RegisterForm.tsx`
- [ ] T018 [P] [US1] Create registration page in `frontend/src/pages/Register.tsx`
- [ ] T019 [US1] Implement GraphQL mutation for registration in `frontend/src/services/auth.ts`

---

## Phase 4: User Story 2 - Existing User Login (Priority: P1)

**Goal**: An existing user can log in with their email and password.

**Independent Test**: An existing user can log in and receive a valid JWT.

### Tests for User Story 2
- [ ] T020 [P] [US2] Write integration test for login in `backend/tests/auth.test.ts` (should fail initially)

### Implementation for User Story 2

- [ ] T021 [US2] Implement `login` mutation resolver in `backend/src/api/auth.ts`
- [ ] T022 [P] [US2] Create login form component in `frontend/src/components/LoginForm.tsx`
- [ ] T023 [P] [US2] Create login page in `frontend/src/pages/Login.tsx`
- [ ] T024 [US2] Implement GraphQL mutation for login in `frontend/src/services/auth.ts`

---

## Phase 5: User Story 3 - User Logout (Priority: P2)

**Goal**: A logged-in user can securely end their session.

**Independent Test**: A logged-in user can log out, and their refresh token is invalidated.

### Tests for User Story 3
- [ ] T025 [P] [US3] Write integration test for logout in `backend/tests/auth.test.ts` (should fail initially)

### Implementation for User Story 3

- [ ] T026 [US3] Implement `logout` mutation resolver in `backend/src/api/auth.ts` to invalidate the refresh token.
- [ ] T027 [P] [US3] Create logout button component in `frontend/src/components/LogoutButton.tsx`
- [ ] T028 [US3] Add logout functionality to the application's UI (e.g., in the header).

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [ ] T029 Implement `refreshToken` mutation in `backend/src/api/auth.ts`
- [ ] T030 [P] Implement rate limiting on login and registration endpoints.
- [ ] T031 [P] Add logging for all authentication events.
- [ ] T032 [P] Implement session expiration warning on the frontend.
- [ ] T033 [P] Update `README.md` with instructions on running the new authentication services.
- [ ] T034 Run `quickstart.md` validation against the implemented API.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3-5)**: Depend on Foundational phase completion.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **US1 & US2**: Can be implemented in parallel after the Foundational phase.
- **US3**: Depends on US1 or US2 (a user must be logged in).

### Parallel Opportunities

- Tasks marked with `[P]` can be worked on in parallel.
- Frontend and backend tasks within a user story can often be done in parallel after the GraphQL schema is defined.
- US1 and US2 can be developed in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1) and Phase 4 (US2).
3. Validate that registration and login are working.

### Incremental Delivery

1. Deliver MVP (US1 & US2).
2. Deliver US3 (Logout).
3. Deliver Polish features.
