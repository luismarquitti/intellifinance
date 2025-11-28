---
description: "Task list for Feature 002: User Authentication"
---

# Tasks: User Authentication

**Input**: Design documents from `specs/002-user-auth/`
**Prerequisites**: plan.md, spec.md, data-model.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [API] Install backend dependencies: bcrypt, jsonwebtoken, graphql-shield, @types/bcrypt, @types/jsonwebtoken (apps/backend/package.json)
- [x] T002 [WEB] Install frontend dependencies: jwt-decode, react-hook-form, @hookform/resolvers (apps/frontend/package.json)
- [x] T003 [API] Configure environment variables for JWT_SECRET and JWT_REFRESH_SECRET (apps/backend/.env)

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [PKG-DB] Add `User` model to Prisma Schema (packages/database/prisma/schema.prisma)
- [x] T005 [PKG-DB] Run migration to create User table (packages/database)
- [x] T006 [PKG-TYPES] Create shared Zod schemas: `RegisterInputSchema`, `LoginInputSchema` (packages/types/src/auth.ts)
- [x] T007 [PKG-TYPES] Export Zod schemas in index (packages/types/src/index.ts)
- [x] T008 [API] Create `User` and `AuthPayload` GraphQL types (apps/backend/src/graphql/schemas/auth.graphql)
- [x] T009 [API] Setup `AuthService` skeleton (apps/backend/src/services/auth.service.ts)
- [x] T010 [API] Implement `auth.middleware.ts` for token extraction (apps/backend/src/middleware/auth.middleware.ts)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

## Phase 3: User Story 1 - User Registration (Priority: P1) 🎯 MVP

**Goal**: Allow new users to sign up and receive tokens

**Independent Test**: Mutation `register` creates DB record and returns tokens.

### Tests for User Story 1

- [x] T011 [API] [US1] Unit Test: AuthService.register hashes password (apps/backend/tests/unit/auth.service.test.ts)
- [x] T012 [API] [US1] Integration Test: Register mutation success/failure (apps/backend/tests/integration/auth.test.ts)

### Implementation for User Story 1

- [x] T013 [API] [US1] Implement `AuthService.register` (hash password, create user, generate tokens) (apps/backend/src/services/auth.service.ts)
- [x] T014 [API] [US1] Implement `register` resolver (apps/backend/src/graphql/resolvers/auth.resolver.ts)
- [x] T015 [WEB] [US1] Create `RegisterForm` component with Zod validation (apps/frontend/src/components/auth/RegisterForm.tsx)
- [x] T016 [WEB] [US1] Create `RegisterPage` and route (apps/frontend/src/pages/RegisterPage.tsx)
- [x] T017 [WEB] [US1] Connect `RegisterForm` to `register` mutation (apps/frontend/src/graphql/auth.ts)

**Checkpoint**: Users can register via API and Frontend.

## Phase 4: User Story 2 - User Login (Priority: P1)

**Goal**: Allow users to authenticate and receive sessions

**Independent Test**: Mutation `login` returns valid tokens for correct credentials.

### Tests for User Story 2

- [x] T018 [API] [US2] Unit Test: AuthService.login verifies password and returns tokens (apps/backend/tests/unit/auth.service.test.ts)
- [x] T019 [API] [US2] Integration Test: Login mutation success/failure (apps/backend/tests/integration/auth.test.ts)

### Implementation for User Story 2

- [x] T020 [API] [US2] Implement `AuthService.login` (compare hash, generate tokens) (apps/backend/src/services/auth.service.ts)
- [x] T021 [API] [US2] Implement `login` resolver (apps/backend/src/graphql/resolvers/auth.resolver.ts)
- [x] T022 [WEB] [US2] Create `LoginForm` component (apps/frontend/src/components/auth/LoginForm.tsx)
- [x] T023 [WEB] [US2] Create `LoginPage` and route (apps/frontend/src/pages/LoginPage.tsx)
- [x] T024 [WEB] [US2] Implement `AuthProvider` or token storage logic (apps/frontend/src/context/AuthContext.tsx)

**Checkpoint**: Users can login and session is stored.

## Phase 5: Polish & Security (Priority: P2)

**Goal**: Protected routes and session management

- [x] T025 [API] [US4] Implement `me` query resolver (protected) (apps/backend/src/graphql/resolvers/auth.resolver.ts)
- [x] T026 [API] [US3] Implement `refreshToken` mutation (apps/backend/src/services/auth.service.ts)
- [x] T027 [WEB] [US4] Protect dashboard route (require auth) (apps/frontend/src/routes.tsx)
- [x] T028 [WEB] [US4] Display user name from `me` query (apps/frontend/src/components/layout/Header.tsx)
