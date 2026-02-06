# IntelliFinance

> **IntelliFinance** is a scalable, monorepo-based financial management platform designed to provide intelligent insights and robust data processing.

Built with a modern tech stack including **TypeScript**, **Node.js**, **React**, and **GraphQL**, it leverages a microservices-ready architecture with dedicated workers for asynchronous processing.

---

## 🚀 Features

- **Monorepo Architecture**: Structured using Yarn Workspaces for efficient code sharing and dependency management.
- **Robust Authentication**: Secure user authentication system with dual-token strategy (Access & Refresh tokens).
- **Asynchronous Processing**: Scalable background job processing using **BullMQ** and **Redis**.
- **Type Safety**: End-to-end type safety with **TypeScript** and shared **Zod** schemas.
- **Containerized Environment**: Full Docker support for consistent development and deployment.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Languages**: TypeScript
- **Frontend**: React (Vite)
- **Backend**: Express, GraphQL (Apollo/Shield)
- **Database**: PostgreSQL (via Prisma ORM)
- **Queue**: Redis, BullMQ
- **Tooling**: Docker, ESLint, Prettier

## 📂 Project Structure

The project follows a strict monorepo structure:

```text
intellifinance/
├── apps/
│   ├── backend/    # Node.js/GraphQL API server
│   ├── frontend/   # React/Vite user interface
│   └── worker/     # Background job processor
├── packages/
│   ├── config/     # Shared configurations (ESLint, TSConfig)
│   ├── database/   # Prisma schema and client
│   ├── jobs/       # Shared job definitions and queues
│   └── types/      # Shared TypeScript types and Zod schemas
├── specs/          # Feature specifications and documentation
└── docker-compose.yml
```

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [Docker](https://www.docker.com/) & Docker Compose
- [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd intellifinance
    ```bash
    git clone <repository-url>
    cd intellifinance
    ```

2. **Quick Setup**:

    - **Windows (PowerShell)**:

        ```powershell
        .\setup.ps1
        ```

    - **WSL / Linux / Mac**:

        ```bash
        chmod +x setup.sh
        ./setup.sh
        ```

    *Alternatively, follow the manual steps below:*

3. **Install dependencies**:

    ```bash
    yarn install
    ```

4. **Environment Setup**:
    Create `.env` files in the respective `apps/` directories if needed (refer to `spec` files for configuration details).

### Running the Application

The easiest way to run the entire stack is via Docker Compose:

```bash
docker-compose up --build
```

This will start:

- **PostgreSQL** (Database)
- **Redis** (Message Broker)
- **Backend API** (<http://localhost:3000>)
- **Frontend** (<http://localhost:5173>)
- **Worker** (Background process)

> [!NOTE]
> Ensure ports `3000`, `5173`, `5432`, and `6379` are free on your machine.

## 🧑‍💻 Development

### Database Migrations

To apply database migrations (run from `packages/database`):

```bash
cd packages/database
npx prisma migrate dev
```

### Linting & Formatting

Maintain code quality using the configured scripts:

```bash
# Run linting
yarn lint

# Format code
yarn format
```

## 📚 Documentation

Detailed feature specifications and architecture decisions can be found in the `specs/` directory:

- [Monorepo Structure](specs/001-monorepo-structure/spec.md)
- [User Authentication](specs/002-user-auth/spec.md)
- [Async Infrastructure](specs/003-async-infra/spec.md)
