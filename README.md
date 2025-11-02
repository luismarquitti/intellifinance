# 🤖💰 IntelliFinance

[![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR-USER/YOUR-REPO/ci.yml?branch=main)](https://github.com/YOUR-USER/YOUR-REPO/actions)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](/package.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

A proactive personal financial advisor, powered by AI Agents, built with React, Node.js, GraphQL, and PostgreSQL.

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [High-Level Architecture](#-high-level-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started (Local Environment)](#-getting-started-local-environment)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Repository Structure](#-repository-structure)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 About The Project

**IntelliFinance** is a full-stack financial management platform that goes beyond passive data logging. The goal is to transform the user experience, shifting from an application where *you work for it* (entering data) to an application that *works for you* (providing automation and insights).

We use a modern AI Agent architecture to automate the most tedious tasks (like reading PDF invoices) and provide proactive analysis, helping users understand their financial health and make smarter decisions.

## ✨ Key Features

* **Automated Data Ingestion:** Agents that read, interpret, and extract transactions from complex sources like **PDF** statements, credit card bills, **CSV** files, and **OFX** files.
* **Intelligent Categorization (with Memory):** An agent that learns from user habits. If you correct a category (e.g., "Uber" from "Transport" to "Work"), it will remember (via RAG/PGVector) for next time.
* **Proactive Analysis and Insights:** Agents that monitor spending patterns and generate insights in natural language (e.g., "Your spending on 'Restaurants' increased by 25% this month compared to your average").
* **Recurring Payment Monitoring:** Automatic detection of recurring payments (e.g., Netflix, Spotify) and alerts about failures or pending payments.
* **Planning and Simulation:** An "Advisor" agent that can simulate future scenarios (e.g., "What if I save an extra $100 per month?") and analyze investment portfolios.
* **Secure and Scalable API:** A robust GraphQL API that serves as the central source of truth for the frontend and the agents.

## 🏛️ High-Level Architecture

The architecture is designed to be **asynchronous** and **scalable**, ensuring that AI operations (which are slow) do not block the user interface.

1.  The **Frontend (React)** sends a request to the **API (Node/Express)**.
2.  The API does **NOT** process the task. It creates a "Job" in the **Redis (BullMQ)** queue and immediately returns a `jobId` to the user.
3.  A **Worker (Agent Microservice)**, listening to the Redis queue, picks up the Job.
4.  The Worker executes the AI Agent pipeline. The Agent uses **PGVector** as "memory" (RAG) and communicates with the **GraphQL API** to read/write data to **PostgreSQL**.
5.  The Frontend uses the `jobId` to listen (via WebSocket or Polling) for the task's status and notifies the user upon completion.

```mermaid
graph TD
    subgraph "User's Browser"
        React[React Frontend]
    end

    subgraph "API Server (Node.js)"
        API[REST/GraphQL API (Express)]
    end

    subgraph "Async Job Infrastructure"
        Queue[Redis (BullMQ) Job Queue]
    end

    subgraph "Agent Service (Worker)"
        Worker[AI Agent Worker]
        Agent[OrchestratorAgent]
        Tools[Tools (PDF, RAG, etc.)]
    end

    subgraph "Database"
        DB[(PostgreSQL Source of Truth)]
        VectorDB[(PGVector AI Memory)]
    end

    React -- 1. Upload PDF (HTTP) --> API
    API -- 2. Enqueue Job --> Queue
    API -- 3. Return JobID (Fast) --> React
    Worker -- 4. Dequeue Job --> Queue
    Worker --> Agent
    Agent --> Tools
    Tools -- 5. Fetch Memory (RAG) --> VectorDB
    Tools -- 6. Call API (GraphQL) --> API
    API -- 7. Save Data (ACID) --> DB
    React -- 8. Poll Status (Polling/WS) --> API
``` 

## 💻 Tech Stack
| Area | Technology | Purpose |
|---|---|---|
| Frontend | React (with Hooks) | User Interface. |
|  | TypeScript | Static typing for UI and Logic. |
|  | Apollo Client | State management and GraphQL client. |
| Backend | Node.js | Runtime environment. |
|  | Express | Framework for REST (uploads) and GraphQL API. |
|  | GraphQL (Apollo Server) | API for data querying and mutation. |
|  | TypeScript | Static typing for business logic. |
| Database | PostgreSQL | Relational database (Source of Truth). |
|  | PGVector | Postgres extension for "AI Memory" (RAG). |
| Infra & Agents | Redis | In-memory database. |
|  | BullMQ | Job Queue (Asynchronous AI processing). |
|  | Agent Framework | (Agnostic) AI Agent orchestration. |
| DevOps | Docker | Containerization (local and production). |
|  | Docker Compose | Local dev environment orchestration. |

## 🚀 Getting Started (Local Environment)
Follow these steps to set up and run the project on your local machine.
### Prerequisites
You will need to have the following tools installed:
 * Git
 * Node.js (v18.x or higher)
 * Docker and Docker Compose (to run Postgres and Redis)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USER/YOUR-REPO.git
cd YOUR-REPO
```

2. Configure Environment Variables:
Create a `.env` file in the `backend` directory.

```bash
cp backend/.env.example backend/.env
```

Edit the `backend/.env` file and fill in the following variables:
 * `ACCESS_TOKEN_SECRET`: A long, random string for signing access tokens.
 * `REFRESH_TOKEN_SECRET`: A long, random string for signing refresh tokens.

3. Start Infra Services (Postgres & Redis):
This command will use `docker-compose.yml` to start the database and Redis in containers.

```bash
docker-compose up -d
```

4. Install and Run the Backend (API):
Terminal 1 - Backend

```bash
cd backend
npm install
npm run db:migrate  # Applies database migrations
npm start         # Starts the server at http://localhost:4000
```

5. Install and Run the Frontend (React):
Terminal 2 - Frontend

```bash
cd frontend
npm install
npm start         # Starts the React app at http://localhost:8000
```

Done! The application will be accessible at http://localhost:8000. You can navigate to `/register` to create an account and `/login` to log in.

## 📁 Repository Structure
The project is organized as a "monorepo" (or "multirepo") to separate concerns:
/
├── 📄 .gitignore
├── 📄 docker-compose.yml   # Orchestrates Postgres and Redis for dev
├── 📄 README.md            # This file
│
├── 📁 backend/             # Node.js API (Express + GraphQL)
│   ├── src/
│   ├── package.json
│   └── .env.example
│
├── 📁 frontend/            # React Application
│   ├── src/
│   ├── package.json
│   └── .env.example

## 🤝 Contributing
Contributions are welcome! Please read our CONTRIBUTING.md (to be created) to learn how to open Pull Requests and report Issues.

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for more details.
