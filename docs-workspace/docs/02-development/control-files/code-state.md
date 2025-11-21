---
sidebar_position: 3
title: "Code State Snapshot"
description: 'Current architecture and implementation status of the IntelliFinance system.'
custom_metadata:
  type: "control-file"
  category: "technical"
  status: "active"
  version: "1.0.0"
created: 2025-11-12T00:00:00Z
last_updated: 2025-11-12T00:00:00Z
---

# Code State Snapshot

**Version:** 1.0.1
**Last Updated:** November 21, 2025
**Status:** ✅ Account Management feature operational.

---

## Overview

### Purpose

IntelliFinance is a full-stack personal finance advisor powered by AI agents. It's designed with a microservices-friendly architecture, though currently operates as a monolith. The system aims to automate financial data management and provide users with intelligent insights into their spending habits.

### Current State Summary

The project is a monorepo containing a `backend` API and a `frontend` web application.

-   **Backend:** A Node.js application using Express and Apollo Server to provide a GraphQL API. It connects directly to a PostgreSQL database for data persistence.
-   **Frontend:** A React application built with TypeScript. It uses Apollo Client to communicate with the backend's GraphQL API. A key architectural pattern is the use of a service layer to abstract API calls, rather than using GraphQL hooks directly in components.
-   **Database:** PostgreSQL is used for relational data, with migrations managed by `db-migrate`. The core data models are `users` and `financial_accounts`.

---

## Technology Stack

### Core Technologies

-   **Frontend:** React, TypeScript, Apollo Client, React Router
-   **Backend:** Node.js, Express, GraphQL (Apollo Server), TypeScript
-   **Database:** PostgreSQL
-   **Build Tools:** esbuild (for frontend), tsc (for backend)
-   **Package Manager:** yarn

### Key Dependencies

| Service  | Package              | Version | Purpose                               |
| :------- | :------------------- | :------ | :------------------------------------ |
| Frontend | `react`              | ^18.2.0 | UI Framework                          |
| Frontend | `@apollo/client`     | ^3.7.17 | GraphQL Client                        |
| Frontend | `react-router-dom`   | ^6.14.2 | Routing                               |
| Backend  | `express`            | ^4.17.1 | Web Server                            |
| Backend  | `@apollo/server`     | ^4.9.1  | GraphQL Server                        |
| Backend  | `pg`                 | ^8.7.1  | PostgreSQL Driver                     |
| Backend  | `typescript`         | ^4.5.2  | Language                              |
| Backend  | `db-migrate`         | ^0.11.13| Database Migrations                   |

---

## Project Structure

```
intellifinance/
├── backend/
│   ├── migrations/         # SQL database migrations
│   ├── src/
│   │   ├── api/            # GraphQL resolvers by feature
│   │   ├── graphql/        # GraphQL schemas
│   │   ├── models/         # Data access layer
│   │   ├── services/       # Business logic services
│   │   ├── db.ts           # Database connection setup
│   │   └── server.ts       # Express and Apollo server setup
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Top-level page components
│   │   ├── services/       # Service layer for API abstraction
│   │   ├── index.tsx       # Application entry point
│   │   └── setupTests.ts
│   ├── package.json
│   └── tsconfig.json
│
└── specs/
    ├── 001-user-auth/      # Specifications for User Authentication
    └── 002-account-management/ # Specifications for Account Management
```

---

## Architecture Overview

### High-Level Architecture

The system follows a classic client-server model. The React frontend is a single-page application that communicates with the backend via a GraphQL API. The backend services requests by interacting directly with the PostgreSQL database.

```mermaid
graph TD
    subgraph "Frontend (React)"
        A[UI Components] --> B[Service Layer];
        B --> C[Apollo Client];
    end

    subgraph "Backend (Node.js)"
        D[Apollo Server (GraphQL)] --> E[API Resolvers];
        E --> F[Database Models];
    end

    subgraph "Database"
        G[PostgreSQL]
    end

    C -- HTTP Request --> D;
    F -- SQL Query --> G;
```

### Key Architectural Patterns

-   **Frontend Service Layer:** The frontend abstracts all GraphQL API interactions within a `services` directory. For example, `frontend/src/services/auth.ts` handles all authentication-related queries and mutations. This keeps the UI components clean of data-fetching logic and centralizes API communication.

-   **Direct Database Access:** The backend resolvers in `backend/src/api/` interact directly with the database via models defined in `backend/src/models/`. This is a simple and direct approach suitable for the current scale of the application.

### Data Models

The core data models are defined by the SQL migrations in `backend/migrations/`:

1.  **Users (`20231102091700_create_users_and_refresh_tokens.sql`)**
    -   `id`: UUID, Primary Key
    -   `email`: VARCHAR, Unique
    -   `password_hash`: VARCHAR
    -   `created_at`, `updated_at`: TIMESTAMPS

2.  **Refresh Tokens (`20231102091700_create_users_and_refresh_tokens.sql`)**
    -   `id`: UUID, Primary Key
    -   `user_id`: UUID, Foreign Key to `users`
    -   `token`: VARCHAR
    -   `expires_at`: TIMESTAMP
    -   `is_revoked`: BOOLEAN

3.  **Financial Accounts (`20251102132300_create_financial_accounts.sql`)**
    -   `id`: UUID, Primary Key
    -   `user_id`: UUID, Foreign Key to `users`
    -   `name`: VARCHAR
    -   `type`: VARCHAR (e.g., 'checking', 'savings')
    -   `balance`: NUMERIC
    -   `created_at`, `updated_at`: TIMESTAMPS

4.  **Transactions (`20251121090000_create_transactions.sql`)**
    -   `id`: UUID, Primary Key
    -   `account_id`: UUID, Foreign Key to `financial_accounts`
    -   `user_id`: UUID, Foreign Key to `users`
    -   `amount`: DECIMAL(12, 2)
    -   `type`: VARCHAR ('INCOME', 'EXPENSE')
    -   `date`: DATE
    -   `description`: TEXT
    -   `category`: VARCHAR
    -   `created_at`, `updated_at`: TIMESTAMPS

---

## Known Issues & Technical Debt

-   **Refresh Token Implementation Mismatch:** The database schema includes a `refresh_tokens` table, suggesting a persistent token store. However, the current implementation in `backend/src/api/auth.ts` uses a simple in-memory array (`invalidatedTokens`) for token invalidation. This is not a scalable or persistent solution and should be updated to use the database table.

---

## Development Environment

### Prerequisites

-   Node.js (v18.x or higher)
-   Yarn
-   Docker and Docker Compose (for PostgreSQL and Redis)

### Setup Commands

1.  **Start Infrastructure:**
    ```bash
    docker-compose up -d
    ```

2.  **Run Backend:**
    ```bash
    cd backend
    yarn install
    yarn db:migrate
    yarn dev
    ```

3.  **Run Frontend:**
    ```bash
    cd frontend
    yarn install
    yarn dev
    ```