# Quickstart Guide: Monorepo Setup

**Branch**: `001-monorepo-structure` | **Date**: 2025-11-27 | **Spec**: [./spec.md](./spec.md)

This guide provides the steps for a new developer to clone the repository, install dependencies, and run the full local development environment. It is based on the "Developer Onboarding" user story in the feature specification.

## Prerequisites

- Git
- Node.js (version specified in `.nvmrc` or `package.json` engines)
- Yarn (v1.22.x or as specified in `package.json` engines)
- Docker and Docker Compose

## 1. Clone the Repository

Clone the project to your local machine.

```bash
git clone <repository_url>
cd intellifinance
```

## 2. Install Dependencies

Install all dependencies for all workspaces using a single command from the root of the repository. Yarn Workspaces will handle the linking of all `apps` and `packages`.

```bash
yarn install
```
This command maps to **Acceptance Scenario 1.1** from the spec.

## 3. Configure Environment Variables

The monorepo uses `.env` files for managing environment variables. A template file, `.env.example`, should be present at the root.

1.  Copy the example file:
    ```bash
    cp .env.example .env
    ```
2.  Review the variables in `.env` and adjust if necessary for your local setup. The default values should be sufficient for the initial Docker-based environment.

## 4. Run the Development Environment

Start all services (Postgres, Redis, backend, frontend, worker) using Docker Compose.

```bash
docker-compose up -d --build
```
- The `-d` flag runs the containers in detached mode.
- `--build` forces a rebuild of the images if the Dockerfile or context has changed.

After the command completes, the following services will be available:
- **Backend API**: `http://localhost:3000` (or as configured in `.env`)
- **Frontend App**: `http://localhost:5173` (or as configured by Vite)
- **Database (Postgres)**: Port `5432`
- **Cache (Redis)**: Port `6379`

This fulfills **Success Criterion SC-001**.

## 5. Verify the Setup

- **Navigate the code**: Open the project in your IDE and verify you see the `apps/` and `packages/` directories as described in **Acceptance Scenario 1.2**.
- **Make a commit**: Create a new file, add it, and commit it. The pre-commit hooks defined in `package.json` and managed by Husky should run automatically (linting, formatting), fulfilling **Acceptance Scenario 1.3**.
- **Test cross-workspace imports**: As a test, try creating a new type in `packages/types` and importing it into `apps/backend` to confirm that TypeScript and the build system recognize the shared dependency, as described in **User Story 2**.
