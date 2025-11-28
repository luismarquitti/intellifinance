# Actionable Tasks: Monorepo Structure & Project Foundation

**Branch**: `001-monorepo-structure` | **Date**: 2025-11-27 | **Spec**: [./spec.md](./spec.md)

This document breaks down the implementation of the Monorepo Structure into a series of actionable, dependency-ordered tasks.

## Phase 1: Project Initialization & Setup

*Core infrastructure setup at the repository root.*

- [X] T001 Initialize Yarn project and create root `package.json`
- [X] T002 Configure Yarn Workspaces in `package.json` to include `apps/*` and `packages/*`
- [X] T003 Create root `.gitignore` file with standard Node.js, OS, and editor ignores
- [X] T004 [P] Create `docker-compose.yml` with service definitions for `postgres`, `redis`, `backend`, `frontend`, and `worker`
- [X] T005 [P] Create root `tsconfig.json` to serve as a base for all workspace configurations

## Phase 2: Foundational Workspace Scaffolding

*Creating the directory structure and base configuration for all workspaces.*

- [X] T006 Create directories for `apps` and `packages`
- [X] T007 [P] Create application directories: `apps/backend`, `apps/frontend`, `apps/worker`
- [X] T008 [P] Create package directories: `packages/config`, `packages/database`, `packages/types`
- [X] T009 [P] Create `package.json` for each application in `apps/`
- [X] T010 [P] Create `package.json` for each library in `packages/`
- [X] T011 [P] Create shared ESLint configuration in `packages/config/eslint-preset.js`
- [X] T012 [P] Create shared TypeScript configuration in `packages/config/tsconfig.base.json`
- [X] T013 Create `.github/CODEOWNERS` file to define ownership for protected directories

## Phase 3: User Story 1 - Developer Onboarding

*Goal: A new developer can clone, install, and run the project. Pre-commit hooks are enforced.*

**Independent Test**: A new developer can run a single command to install dependencies, and pre-commit hooks will run automatically on commit.

- [X] T014 [US1] Install and configure `husky` in the root `package.json` for pre-commit hooks
- [X] T015 [US1] Add `lint-staged` to `husky` pre-commit hook
- [X] T016 [US1] Define `lint` and `format` scripts in the root `package.json`
- [X] T017 [P] [US1] Create placeholder `src/index.ts` in `apps/backend`
- [X] T018 [P] [US1] Create placeholder `src/index.ts` in `apps/frontend`
- [X] T019 [P] [US1] Create placeholder `src/index.ts` in `apps/worker`
- [X] T020 [US1] Create `.env.example` file at the repository root with variables for all services
- [X] T021 [P] [US1] Create a `Dockerfile` for `apps/backend`
- [X] T022 [P] [US1] Create a `Dockerfile` for `apps/frontend`
- [X] T023 [P] [US1] Create a `Dockerfile` for `apps/worker`
- [X] T024 [US1] Implement startup script in `apps/backend/src/index.ts` to check for database and cache connections, exiting on failure
- [X] T025 [US1] Implement startup script in `apps/worker/src/index.ts` to check for database and cache connections, exiting on failure

## Phase 4: User Story 2 - Cross-Workspace Imports

*Goal: Code can be shared from `packages/*` to `apps/*`, and this is verified by the build process.*

**Independent Test**: A type from `packages/types` can be imported and used in `apps/backend`, and the project builds successfully.

- [X] T026 [US2] Define a sample Zod schema in `packages/types/src/index.ts` (e.g., `UserSchema`)
- [X] T027 [US2] Import and reference `UserSchema` in `apps/backend/src/index.ts`
- [X] T028 [P] [US2] Define the initial Prisma schema in `packages/database/schema.prisma`
- [X] T029 [US2] Add a `build` script to `apps/backend/package.json` that runs `tsc`
- [X] T030 [US2] Add a lint rule to `packages/config/eslint-preset.js` to forbid imports between `apps/*` workspaces

## Phase 5: Polish & Finalization

*Final documentation and cleanup.*

- [X] T031 [P] Add a `README.md` to `apps/backend`
- [X] T032 [P] Add a `README.md` to `apps/frontend`
- [X] T033 [P] Add a `README.md` to `apps/worker`
- [X] T034 [P] Add a `README.md` to `packages/database`
- [X] T035 [P] Add a `README.md` to `packages/types`
- [X] T036 [P] Add a `README.md` to `packages/config`
- [X] T037 Review all configurations and ensure they align with the `spec.md`

## Phase 6: Continuous Integration Setup

*Goal: Establish a basic CI pipeline to automate validation and checks.*

- [X] T038 Create initial GitHub Actions workflow file at `.github/workflows/ci.yml`
- [X] T039 [P] In `ci.yml`, add a job to run `yarn install` and a build command to demonstrate dependency-aware builds (addresses SC-003)
- [X] T040 [P] In `ci.yml`, add a script step to check for the existence of protected directories (`.gemini`, `.github`, `.specify`) and fail the job if they are missing (addresses FR-010)

## Dependencies

- **US1 depends on Phase 2**: User Story 1 cannot be completed until the foundational workspace scaffolding is in place.
- **US2 depends on US1**: Cross-workspace imports can only be tested once the workspaces are minimally configured and buildable.

## Parallel Execution

- Within each phase, tasks marked with **[P]** can be executed in parallel.
- **Phase 3 (US1)** and **Phase 4 (US2)** have some parallelizable setup tasks, but the core implementation should follow the dependency order. For example, you can create Dockerfiles [P] while setting up Husky.

## Implementation Strategy

The project will be implemented by completing each phase in sequence (1 → 2 → 3 → 4 → 5). This ensures that the foundational layers are stable before building story-specific features on top. This aligns with the **MVP scope**, which is to deliver a fully functional and verifiable monorepo structure (covering both User Story 1 and User Story 2).
