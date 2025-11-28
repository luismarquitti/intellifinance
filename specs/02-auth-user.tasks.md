# Task List: Authentication & User Core

**Spec**: [specs/02-auth-user.spec.md](./02-auth-user.spec.md)
**Plan**: [specs/02-auth-user.plan.md](./02-auth-user.plan.md)

## Phase 1: Shared & Database (Foundation)

- [ ] **1. [PKG-TYPES] Define Auth Zod Schemas and Types**
    - **Type**: `feat`
    - **Description**: Create Zod schemas for `RegisterInput` and `LoginInput`. Export inferred TypeScript types.
    - **Acceptance Criteria**:
        - `RegisterInput` schema includes `email` (email format), `password` (min length), `fullName`.
        - `LoginInput` schema includes `email`, `password`.
        - Types are exported from `packages/types`.
    - **Dependencies**: None

- [ ] **2. [PKG-DB] Implement User Model and Migration**
    - **Type**: `feat`
    - **Description**: Update `schema.prisma` with `User` model and apply migration.
    - **Acceptance Criteria**:
        - `User` model exists with `id` (UUID), `email` (unique), `passwordHash`, `fullName`, `createdAt`, `updatedAt`.
        - Migration is generated and applied.
        - Client is regenerated.
    - **Dependencies**: None

## Phase 2: Backend Core (Foundation)

- [ ] **3. [API] Install Auth Dependencies**
    - **Type**: `chore`
    - **Description**: Install `bcrypt`, `jsonwebtoken`, and their types in `apps/backend`.
    - **Acceptance Criteria**: Dependencies are listed in `package.json` and `node_modules`.
    - **Dependencies**: None

- [ ] **4. [API] Implement PasswordService**
    - **Type**: `feat`
    - **Description**: Create `PasswordService` to handle password hashing and comparison using `bcrypt`.
    - **Acceptance Criteria**:
        - `hash(password)` returns hashed string.
        - `compare(plain, hash)` returns boolean.
        - Unit tests cover both methods.
    - **Dependencies**: 3

- [ ] **5. [API] Implement TokenService**
    - **Type**: `feat`
    - **Description**: Create `TokenService` to handle JWT signing and verification for access and refresh tokens.
    - **Acceptance Criteria**:
        - `signAccessToken(payload)` returns JWT (15m).
        - `signRefreshToken(payload)` returns JWT (7d).
        - `verifyToken(token)` returns payload or throws.
        - Unit tests cover signing and verification.
    - **Dependencies**: 3

- [ ] **6. [API] Implement AuthMiddleware**
    - **Type**: `feat`
    - **Description**: Create middleware to extract token from headers, verify it, and attach user to context.
    - **Acceptance Criteria**:
        - Extracts Bearer token from `Authorization` header.
        - Verifies token using `TokenService`.
        - Attaches user payload to request context.
        - Handles missing or invalid tokens gracefully (or throws if strict).
    - **Dependencies**: 5

## Phase 3: Backend Features (User Stories)

- [ ] **7. [API] Implement Register Mutation**
    - **Type**: `feat`
    - **Description**: Implement `register` mutation resolver using `PasswordService` and DB.
    - **Acceptance Criteria**:
        - Hashes password.
        - Creates user in DB.
        - Returns `AuthPayload` (tokens + user).
        - Fails if email exists.
        - Integration test verifies success and error cases.
    - **Dependencies**: 1, 2, 4, 5

- [ ] **8. [API] Implement Login Mutation**
    - **Type**: `feat`
    - **Description**: Implement `login` mutation resolver.
    - **Acceptance Criteria**:
        - Finds user by email.
        - Verifies password using `PasswordService`.
        - Returns `AuthPayload`.
        - Integration test verifies success and error cases.
    - **Dependencies**: 1, 2, 4, 5

- [ ] **9. [API] Implement RefreshToken Mutation**
    - **Type**: `feat`
    - **Description**: Implement `refreshToken` mutation.
    - **Acceptance Criteria**:
        - Verifies refresh token.
        - Returns new `accessToken` and `refreshToken`.
        - Integration test verifies success and invalid token cases.
    - **Dependencies**: 5

- [ ] **10. [API] Implement Me Query**
    - **Type**: `feat`
    - **Description**: Implement `me` query resolver.
    - **Acceptance Criteria**:
        - Protected by `AuthMiddleware`.
        - Returns current user details.
        - Integration test verifies access with valid token and rejection without.
    - **Dependencies**: 6

## Phase 4: Frontend Integration (User Stories)

- [ ] **11. [WEB] Install Auth Dependencies**
    - **Type**: `chore`
    - **Description**: Install `jwt-decode` and other auth deps in `apps/frontend`.
    - **Acceptance Criteria**: Dependencies installed.
    - **Dependencies**: None

- [ ] **12. [WEB] Implement AuthProvider**
    - **Type**: `feat`
    - **Description**: Create `AuthContext` and `AuthProvider` to manage session state (tokens, user).
    - **Acceptance Criteria**:
        - Stores tokens in memory/storage.
        - Provides `login`, `logout`, `register` methods.
        - Decodes token to get user info.
    - **Dependencies**: 11

- [ ] **13. [WEB] Implement Register Feature**
    - **Type**: `feat`
    - **Description**: Create `RegisterForm` component and connect to `register` mutation.
    - **Acceptance Criteria**:
        - Uses `RegisterInput` schema for validation.
        - Calls `register` mutation.
        - Updates AuthContext on success.
        - Displays errors.
    - **Dependencies**: 1, 7, 12

- [ ] **14. [WEB] Implement Login Feature**
    - **Type**: `feat`
    - **Description**: Create `LoginForm` component and connect to `login` mutation.
    - **Acceptance Criteria**:
        - Uses `LoginInput` schema for validation.
        - Calls `login` mutation.
        - Updates AuthContext on success.
        - Displays errors.
    - **Dependencies**: 1, 8, 12

- [ ] **15. [WEB] Implement Protected Routes**
    - **Type**: `feat`
    - **Description**: Create a wrapper component for protected routes.
    - **Acceptance Criteria**:
        - Redirects unauthenticated users to login.
        - Renders children for authenticated users.
    - **Dependencies**: 12
