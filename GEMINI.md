# GEMINI.md - IntelliFinance Project

This document provides a comprehensive overview of the IntelliFinance project, its architecture, and development practices to be used as a context for AI-assisted development.

## 1. Project Overview

IntelliFinance is a proactive personal financial advisor powered by AI agents. It's a full-stack application built with a microservices architecture, designed to automate financial data management and provide users with intelligent insights into their spending habits.

The core technologies are:

*   **Frontend:** React, TypeScript, Apollo Client
*   **Backend (API):** Node.js, Express, GraphQL (Apollo Server), TypeScript
*   **AI Agents (Worker):** Python, BullMQ (for job queuing)
*   **Database:** PostgreSQL (for relational data), pgvector (for AI memory/RAG)
*   **Infrastructure:** Redis (for job queue), Docker, Docker Compose

The system is designed to be asynchronous. The frontend communicates with the backend API, which enqueues jobs for the AI agents. The agents then process the data, interacting with the database and external services as needed.

## 2. Building and Running the Project

The project is set up as a monorepo with three main components: `frontend`, `backend`, and `worker`. Docker is used to manage the database and Redis services.

### Prerequisites

*   Git
*   Node.js (v18.x or higher)
*   Docker and Docker Compose
*   Python 3

### Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd intellifinance
    ```

2.  **Configure Environment Variables:**
    Create `.env` files in the `backend` and `worker` directories by copying the `.env.example` files. Fill in the required variables, such as database credentials, Redis URL, and API keys for AI services.

3.  **Start Infrastructure Services:**
    ```bash
    docker-compose up -d
    ```
    This command starts PostgreSQL and Redis in Docker containers.

4.  **Run the Backend (API):**
    ```bash
    cd backend
    npm install
    npm run db:migrate
    npm run dev
    ```
    The backend server will be running at `http://localhost:4000`.

5.  **Run the Worker (AI Agents):**
    ```bash
    cd worker
    npm install
    npm run dev
    ```
    The worker will start listening for jobs from the Redis queue.

6.  **Run the Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend application will be accessible at `http://localhost:3000`.

## 3. Development Conventions

*   **Code Style:** The project uses Prettier and ESLint for code formatting and linting. Refer to the `.prettierrc` and `.eslintrc` files in each sub-project for specific rules.
*   **Version Control:** The project follows the GitFlow branching model. All new features should be developed in feature branches and merged into the `develop` branch via pull requests.
*   **Testing:** (TODO: Add details about the testing strategy, frameworks, and commands once they are established.)
*   **Commit Messages:** Commit messages should follow the Conventional Commits specification.
*   **API:** The backend exposes a GraphQL API. All data interactions should go through this API.
