# Implementation Plan: Authentication & User Core

**Branch**: `feature/02-auth-user` | **Date**: 2025-05-27 | **Spec**: [specs/02-auth-user.spec.md](./spec.md)
**Input**: Feature specification from `specs/02-auth-user.spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan details the implementation of the core User Authentication system for IntelliFinance. The primary requirement is to enable secure user registration, login, and session management using a Dual Token Strategy (Access + Refresh Tokens). The technical approach involves updating the PostgreSQL database with a `User` model, defining shared Zod validation schemas in `packages/types`, implementing GraphQL resolvers and authentication middleware in `apps/backend` using `bcrypt` and `jsonwebtoken`, and creating the corresponding Auth Context and forms in `apps/frontend`.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**:
- Backend: `bcrypt` (hashing), `jsonwebtoken` (JWT), `@apollo/server`, `express`
- Frontend: `@apollo/client`, `jwt-decode`, `react-hook-form`, `@hookform/resolvers`
- Shared: `zod`
**Storage**: PostgreSQL (Users table)
**Testing**:
- Backend: Vitest (Unit/Integration) with `supertest` or Apollo `executeOperation`
- Frontend: Vitest + React Testing Library
**Target Platform**: Web Application (Monorepo: Frontend + Backend)
**Project Type**: Monorepo
**Performance Goals**: Auth operations should be < 200ms. Token verification must be negligible.
**Constraints**:
- Strict separation of concerns (Backend handles security, Frontend handles state).
- Secure storage of tokens (HttpOnly cookies for refresh token preferred, or secure storage strategy as per current arch).
**Scale/Scope**: Foundation for all user-centric features.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **[X] Principle I (SDD):** Does this feature have a `.spec.md` file? (Yes)
- **[X] Principle II (Typing):** Are Zod schemas planned for all inputs? (Yes, `RegisterInput`, `LoginInput`)
- **[X] Principle III (Async):** Is blocking I/O correctly deferred to a worker? (N/A for synchronous auth, but email notifications would be async in future)
- **[X] Principle IV (Monorepo):** Does the proposed structure respect app/package boundaries? (Yes, types separated, backend/frontend separated)
- **[X] Principle V (AI):** If AI is used, are there fallbacks and structured outputs? (N/A)
- **[X] Testing Strategy:** Does the plan include unit, integration, and E2E tests as required? (Yes)
- **[X] Dev Workflow:** Does the plan account for conventional commits and PR reviews? (Yes)

## Project Structure

### Documentation (this feature)

```text
specs/02-auth-user/
├── plan.md              # This file
```

### Source Code (repository root)

```text
apps/
├── backend/
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── resolvers/
│   │   │   │   └── user.resolver.ts
│   │   │   └── typeDefs/
│   │   │       └── user.graphql
│   │   ├── services/
│   │   │   ├── password.service.ts
│   │   │   ├── token.service.ts
│   │   │   └── user.service.ts
│   │   └── middleware/
│   │       └── auth.middleware.ts
│   └── tests/
│       └── integration/
│           └── auth.test.ts
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   └── features/
│   │       └── auth/
│   │           ├── LoginForm.tsx
│   │           └── RegisterForm.tsx
│   └── tests/
│       └── features/
│           └── auth/
└── packages/
    ├── database/
    │   ├── prisma/
    │   │   └── schema.prisma
    │   └── migrations/
    └── types/
        └── src/
            └── auth.ts
```

**Structure Decision**: Standard monorepo feature addition. Shared types go to `packages/types`. Database changes in `packages/database`. Business logic in `apps/backend`. UI in `apps/frontend`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | (none)     | (none)                              |

---

# Execution Tasks

**Input**: Design documents from `specs/02-auth-user.spec.md`
**Prerequisites**: spec.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: US1 (Register), US2 (Login), US3 (Refresh), US4 (Me)

## Phase 1: Shared & Database (Foundation)

**Purpose**: Define data structures and validation schemas required by both Backend and Frontend.

- [ ] T001 `packages/types`: Create `RegisterInput` Zod schema (email, password, fullName).
- [ ] T002 `packages/types`: Create `LoginInput` Zod schema (email, password).
- [ ] T003 `packages/types`: Export inferred TypeScript types for Auth inputs.
- [ ] T004 `packages/database`: Update `schema.prisma` with `User` model.
- [ ] T005 `packages/database`: Generate and apply Prisma migration for `User` table.

**Checkpoint**: `packages/types` builds, `packages/database` has `User` table.

## Phase 2: Backend Core (Foundation)

**Purpose**: Core security services and middleware. Blocks API implementation.

- [ ] T006 `apps/backend`: Install dependencies (`bcrypt`, `jsonwebtoken`, types).
- [ ] T007 `apps/backend`: Implement `PasswordService` (hash, compare).
- [ ] T008 `apps/backend`: Implement `TokenService` (sign access/refresh tokens, verify).
- [ ] T009 `apps/backend`: Implement `AuthMiddleware` (extract token, verify, attach user to context).

**Checkpoint**: Services exist with unit tests.

## Phase 3: Backend Features (User Stories)

**Purpose**: Implement GraphQL API endpoints.

- [ ] T010 [US1] `apps/backend`: Create `register` mutation resolver (uses PasswordService, DB).
- [ ] T011 [US1] `apps/backend`: Integration test for `register` mutation.
- [ ] T012 [US2] `apps/backend`: Create `login` mutation resolver (uses PasswordService, TokenService).
- [ ] T013 [US2] `apps/backend`: Integration test for `login` mutation.
- [ ] T014 [US3] `apps/backend`: Create `refreshToken` mutation resolver.
- [ ] T015 [US3] `apps/backend`: Integration test for `refreshToken`.
- [ ] T016 [US4] `apps/backend`: Create `me` query resolver (protected by middleware).
- [ ] T017 [US4] `apps/backend`: Integration test for `me` query (auth required).

**Checkpoint**: Backend API is fully functional and tested.

## Phase 4: Frontend Integration (User Stories)

**Purpose**: Connect UI to the Authentication API.

- [ ] T018 `apps/frontend`: Install `jwt-decode` and auth-related dependencies.
- [ ] T019 `apps/frontend`: Implement `AuthProvider` context (store tokens, manage session).
- [ ] T020 [US1] `apps/frontend`: Create `RegisterForm` component using `packages/types` schema.
- [ ] T021 [US1] `apps/frontend`: Connect `RegisterForm` to `register` mutation.
- [ ] T022 [US2] `apps/frontend`: Create `LoginForm` component using `packages/types` schema.
- [ ] T023 [US2] `apps/frontend`: Connect `LoginForm` to `login` mutation.
- [ ] T024 [US4] `apps/frontend`: Implement Protected Route wrapper using `AuthContext`.

**Checkpoint**: Users can register and login via UI.
