# Data Model: Monorepo Structure

**Branch**: `001-monorepo-structure` | **Date**: 2025-11-27 | **Spec**: [./spec.md](./spec.md)

This document defines the key structural entities of the IntelliFinance monorepo. The "data model" in this context refers to the file system structure and the relationships between workspaces, not a database schema.

## Core Entities

The monorepo is composed of two primary types of entities: **Applications** and **Packages**.

- **Applications (`apps/`)**: Independently deployable units of the system. They consume Packages but should not contain business logic that is intended for reuse.
- **Packages (`packages/`)**: Reusable modules containing shared logic, types, configurations, or UI components. They are not independently deployable.

## Entity Definitions & Relationships

### `apps/backend`
- **Description**: The main API server, built with Node.js and Express. It will expose a GraphQL endpoint.
- **Relationships**:
  - **Consumes**: `packages/database`, `packages/types`, `packages/config`.
  - **Cannot Consume**: `apps/frontend`, `apps/worker`.

### `apps/frontend`
- **Description**: The user-facing web application, built with React and Vite.
- **Relationships**:
  - **Consumes**: `packages/types`, `packages/config`. (May also consume a future `packages/ui-kit`).
  - **Cannot Consume**: `apps/backend`, `apps/worker`.

### `apps/worker`
- **Description**: A background job processor using BullMQ. It handles asynchronous tasks, such as AI inference, that are too slow for the API event loop.
- **Relationships**:
  - **Consumes**: `packages/database`, `packages/types`, `packages/config`.
  - **Cannot Consume**: `apps/backend`, `apps/frontend`.

### `packages/database`
- **Description**: Contains the Prisma schema (`schema.prisma`) and the auto-generated Prisma Client. This is the single source of truth for the database structure.
- **Consumed By**: `apps/backend`, `apps/worker`.

### `packages/types`
- **Description**: Contains shared data structures, primarily Zod schemas for validation and the inferred TypeScript types.
- **Consumed By**: `apps/backend`, `apps/frontend`, `apps/worker`.

### `packages/config`
- **Description**: Contains shared configuration files, such as `tsconfig.json` bases and ESLint configurations (`.eslintrc.js`), to ensure consistency across all workspaces.
- **Consumed By**: All workspaces in `apps/` and `packages/`.

## Relationship Rules (Constraints)

These rules are enforced by the monorepo tooling and CI pipeline.

- **Rule 1: No App-to-App Imports**: Code in one `apps/` subdirectory **MUST NOT** be imported by another `apps/` subdirectory (FR-006). Communication between applications must occur via APIs.
- **Rule 2: Unidirectional Flow**: `apps` consume `packages`. `packages` should not have explicit dependencies on specific `apps`.
- **Rule 3: Circular Dependency Ban**: A circular dependency between two packages (e.g., `packages/a` depends on `packages/b` and `packages/b` depends on `packages/a`) is strictly forbidden and will fail the linting process.
