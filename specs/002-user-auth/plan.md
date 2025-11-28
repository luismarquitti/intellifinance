# Implementation Plan: Authentication & User Core

**Branch**: `002-user-auth` | **Date**: 2025-02-18 | **Spec**: [specs/002-user-auth/spec.md](spec.md)
**Input**: Feature specification from `specs/002-user-auth/spec.md`

## Summary

Implementation of the Core Authentication system using a Dual Token Strategy (Access + Refresh JWTs).
This includes setting up the User model in Postgres (Prisma), exposing GraphQL mutations for `register`, `login`, and `refreshToken`, and protecting resources with a `me` query.
Password security will use `bcrypt`. Validation schemas will be shared via `packages/types` to ensure frontend-backend consistency.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**:
- **Backend**: `bcrypt` (hashing), `jsonwebtoken` (JWT), `graphql`, `@apollo/server`.
- **Frontend**: `@apollo/client` (API), `react-hook-form` + `zod` (Forms).
- **Shared**: `zod` (Validation).
**Storage**: PostgreSQL (via Prisma ORM).
**Testing**: Jest (Backend Logic), Vitest (Shared Types), React Testing Library (Frontend Components).
**Target Platform**: Node.js (Backend), Web Browser (Frontend).
**Project Type**: Monorepo (Web Application).
**Security Constraints**: Passwords must never be logged or returned in API. Tokens must have strict expiration (15m/7d).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **[x] Principle I (SDD):** Does this feature have a `.spec.md` file? (Yes, `specs/002-user-auth/spec.md`)
- **[x] Principle II (Typing):** Are Zod schemas planned for all inputs? (Yes, `RegisterInput`, `LoginInput`)
- **[x] Principle III (Async):** Is blocking I/O correctly deferred to a worker? (Auth is lightweight, standard async DB calls are sufficient. No heavy compute.)
- **[x] Principle IV (Monorepo):** Does the proposed structure respect app/package boundaries? (Yes, types in `packages/types`, DB in `packages/database`)
- **[x] Principle V (AI):** If AI is used, are there fallbacks and structured outputs? (N/A)
- **[x] Testing Strategy:** Does the plan include unit, integration, and E2E tests as required? (Yes, unit for logic, integration for resolvers)
- **[x] Dev Workflow:** Does the plan account for conventional commits and PR reviews? (Yes)

## Project Structure

### Documentation (this feature)

```text
specs/002-user-auth/
├── plan.md              # This file
├── spec.md              # Input Specification
├── tasks.md             # To be created by speckit.tasks
```

### Source Code (repository root)

```text
packages/
├── database/
│   └── schema.prisma           # [UPDATE] Add User model
├── types/
│   └── src/
│       └── auth.ts             # [NEW] Shared Zod schemas (Register, Login)

apps/backend/
├── src/
│   ├── graphql/
│   │   ├── schemas/
│   │   │   └── auth.graphql    # [NEW] GraphQL TypeDefs
│   │   └── resolvers/
│   │       └── auth.resolver.ts # [NEW] Resolvers
│   ├── services/
│   │   └── auth.service.ts     # [NEW] Business logic (Hash, Sign, Verify)
│   └── middleware/
│       └── auth.middleware.ts  # [NEW] Context & Shield
└── tests/
    └── integration/
        └── auth.test.ts        # [NEW] API Tests

apps/frontend/
├── src/
│   ├── components/
│   │   └── auth/
│   │       ├── LoginForm.tsx    # [NEW]
│   │       └── RegisterForm.tsx # [NEW]
│   ├── pages/
│   │   ├── LoginPage.tsx        # [NEW]
│   │   └── RegisterPage.tsx     # [NEW]
│   └── graphql/
│       └── auth.ts              # [NEW] Apollo hooks/queries
```

## Phase 0: Research

**Status: Resolved**

- **Auth Strategy**: Dual Token (JWT).
  - Access Token: 15 minutes, stateless, contains `userId` and `email`.
  - Refresh Token: 7 days, stateless (signed), contains `userId` and `tokenVersion` (optional for revocation, but simple signed JWT is MVP compliant).
- **Password Hashing**: `bcrypt` with salt rounds (standard 10).
- **Validation**: `zod` is already established in the project.

## Phase 1: Design & Contracts

### 1. Data Model (Prisma)

**File**: `packages/database/schema.prisma`

```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  fullName     String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations (Placeholders as per spec)
  // transactions Transaction[]
  // categories   Category[]
}
```

### 2. Shared Types & Validation (Zod)

**File**: `packages/types/src/auth.ts`

```typescript
import { z } from 'zod';

export const RegisterInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
});

export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>;
export type LoginInput = z.infer<typeof LoginInputSchema>;
```

### 3. API Contract (GraphQL)

**File**: `apps/backend/src/graphql/schemas/auth.graphql`

```graphql
type User {
  id: ID!
  email: String!
  fullName: String!
  createdAt: String!
  updatedAt: String!
}

type AuthPayload {
  token: String!        # Access Token
  refreshToken: String! # Refresh Token
  user: User!
}

input RegisterInput {
  email: String!
  password: String!
  fullName: String!
}

input LoginInput {
  email: String!
  password: String!
}

type Mutation {
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  refreshToken(token: String!): AuthPayload!
}

type Query {
  me: User!
}
```

### 4. Implementation Strategy (Backend)

1.  **Dependencies**: Install `bcrypt`, `jsonwebtoken`, `zod`, `@types/bcrypt`, `@types/jsonwebtoken` in Backend.
2.  **Service Layer**: `AuthService` handles `hashPassword`, `comparePassword`, `generateTokens`, `verifyToken`.
3.  **Resolvers**: Delegate to `AuthService`.
4.  **Context**: `context.ts` decodes the Bearer token and places `user` (or `userId`) into the context.
5.  **Shield**: Ensure `me` requires authentication.

### 5. Implementation Strategy (Frontend)

1.  **Forms**: Use `react-hook-form` with `zodResolver`.
2.  **State**: Store tokens in `localStorage` (or `httpOnly` cookies if possible, but MVP often uses localStorage for simplicity unless specified. *Note: Spec doesn't specify storage, standard JWT often implies header/localStorage for simple setups, but HttpOnly is safer. I'll stick to localStorage for MVP ease unless instructed otherwise, or use an `AuthProvider` context.*).
3.  **Apollo**: `ApolloProvider` must attach `Authorization: Bearer <token>` to requests.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
