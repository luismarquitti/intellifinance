Reference Project Report: IntelliFinance
Version: 1.0
Date: November 1, 2025
Purpose: This document serves as a complete summary and a source of truth for the development team. It consolidates all features, architectural decisions, and development plans discussed for the AI-powered financial management platform.
 * Application Features and Specifications
   This section details the business functionalities (the "what") and the implementation specifications (the "how").
1.1. Application Overview
IntelliFinance is a full-stack web application (React, Node.js, GraphQL, PostgreSQL) designed to evolve from a passive financial manager to a proactive "Personal Financial Advisor." The application's core is an AI Agent system that automates data entry and provides actionable insights.
1.2. User Features (AI Agents)
The system will be a multi-agent system (MAS) architecture, where each agent has a specialty:
| Agent (Function) | Feature Description | Technical Requirements / Tools |
|---|---|---|
| IngestionAgent | Processes bank statements and invoices (e.g., PDF, CSV, OFX) and converts them into structured transactions in the database. | PDFTextExtractor, OCRExtractor, TransactionExtractor (LLM), GraphQLMutator |
| CategorizerAgent | Automatically categorizes new expenses and revenues. The agent must "learn" from user corrections. | RAG (Retrieval-Augmented Generation) tool querying the vector database (pgvector) to find previous categorizations. |
| AnalyzerAgent | Extracts financial insights from user data, identifies spending patterns, and generates natural language summaries. | GraphQLQuery (to read data from PG), InsightGenerator (LLM) |
| RecurrenceAgent | Analyzes transactions to identify recurring payments (e.g., Netflix, Spotify) and monitors if they were paid, scheduled, or are missing. | GraphQLQuery, RecurrenceDetector |
| AdvisorAgent | Acts as a financial planner, helping the user create budgets and simulate future scenarios. | BudgetManager (API), FinancialSimulator (calculations), MarketDataAPI (investment data) |
| CreditCardAgent | Manages and monitors credit card statements, differentiating future entries from consolidated payments. | (Combination of IngestionAgent and AnalyzerAgent tools) |
1.3. Architecture and Platform Specifications
The following technical specifications were defined to support the features above:
 * Core Application Stack:
 * Frontend: React (with TypeScript)
 * Backend (API): Node.js (with TypeScript), Express, Apollo Server (GraphQL)
 * Database: PostgreSQL
 * AI Pipeline Architecture (Asynchronous):
 * Purpose: Ensure that slow AI operations (e.g., PDF processing) do not block the user interface.
 * Flow:
   * React uploads a file to a REST endpoint in Express.
   * Express does NOT process the file. It adds a "Job" to a Redis queue and returns a JobId immediately.
   * A Worker (separate Node.js process) "listens" to the Redis queue (using BullMQ).
   * The Worker picks up the Job, executes the AI Agent pipeline (reading the file, calling the LLM, etc.).
   * The Agent uses the GraphQL API to save the results to PostgreSQL.
   * React uses the JobId to receive status updates (via WebSockets or Polling).
 * Supporting Technologies:
   * Job Queue: Redis as the backend.
   * Queue Library: BullMQ (chosen for being modern, in TypeScript, and reusing Redis which will also be used for caching).
   * Alternatives (Discussed and Discarded): RabbitMQ (infra complexity), SQS/PubSub (vendor lock-in), Bull (replaced by BullMQ).
 * Relational Data Architecture (The "Source of Truth"):
 * Database: PostgreSQL (version 15+).
 * Model: UTM (Universal Transaction Model) to normalize all data sources.
 * Key Decision: Monetary values (money) must be stored as BIGINT (representing cents) to avoid floating-point rounding errors.
 * Main Tables:
   * users, accounts (bank accounts, cards, etc.)
   * categories (default and user-defined categories, with subcategory support)
   * import_batches: Crucial table for Data Lineage. Each import (e.g., a PDF) creates a batch. This allows tracking the origin of each transaction and supports a future "Undo Import" feature.
   * transactions: The central table, containing description_original, description_clean (cleaned by AI), amount (BIGINT), transaction_date, status ('POSTED', 'PENDING'), import_batch_id (FK), and metadata (JSONB for extra data like OFX fitid or ai_confidence).
 * Vector Data Architecture (The "AI Memory"):
 * Database: PGVector (a PostgreSQL extension).
 * Purpose: Store the Agent's long-term "memory," mainly for the intelligent categorization feature.
 * Rationale for Choice: Stack efficiency. Avoids adding a new database (e.g., ChromaDB, Pinecone). Allows hybrid queries (relational + vector) in a single database.
 * Main Table:
   * agent_memories: Stores the user_id, the "key" text (e.g., "UBER TRIP"), the embedding (vector), and metadata (JSONB) containing the "answer" (e.g., { "category_id": "uuid-of-transport-category" }).
 * ETL (Extract, Transform, Load) Pipeline:
 * Sources: OFX (easy), CSV (difficult, anarchic), PDF (very difficult, requires AI), APIs (future).
 * Process:
   * Extraction: Agent reads the file.
   * Transformation: AI Agent maps columns (CSV), extracts entities (PDF), cleans data (e.g., "R$ 10,50" -> 1050), and enriches data (using RAG/PGVector to suggest categories).
   * Validation: Duplicate checking (using fitid for OFX or a date+value+description hash for CSV/PDF).
   * Load: Data inserted into the transactions and import_batches tables.
 * Development Roadmap
   Development will be divided into clear phases, prioritizing the data foundation and the main value proposition (automated ingestion).
Phase 0: Infrastructure Foundation (Sprint 0)
 * Objective: Create the project "skeleton" and the development environment. No user features will be delivered, but the setup for Sprint 1 will be completed.
 * Deliverables (Epic 0):
   * Story 0.1: Configuration of the local docker-compose.yml with PostgreSQL (including pgvector) and Redis.
   * Story 0.2: Creation of migration scripts (e.g., Knex, Prisma) for the relational schema (users, accounts, transactions, import_batches, etc.).
   * Story 0.3: Creation of the migration script for the vector schema (activating pgvector and creating the agent_memories table).
   * Story 0.4: Configuration of the Backend (API) and Worker connection to the DB and Redis via environment variables.
Phase 1: MVP - Data Ingestion (The "Steel Thread")
 * Objective: Deliver the main value proposition: the user's ability to import data without manual entry.
 * Key Milestone (Sprint 1 Goal): "Build the asynchronous E2E pipeline (REST -> Queue -> Worker -> GraphQL) and implement OFX import (the simplest parser) to validate the flow."
 * Epics:
   * Epic 1 (Pipeline Foundation): Implement import_batches, the upload API, queueing in BullMQ, and the basic worker.
   * Epic 2 (OFX Parser): Implement the parser for OFX files (the structured "happy path").
   * Epic 3 (AI PDF/CSV Parser): Implement the complex parsers using LLMs.
   * Epic 4 (Categorization with Memory): Implement the CategorizerAgent feature using RAG and the agent_memories table (PGVector).
Phase 2: Analysis and Insights (V1)
 * Objective: Use the ingested data to provide proactive value to the user.
 * Epics:
   * Epic 5 (Recurrence Monitoring): Implement the RecurrenceAgent to detect and alert on payments.
   * Epic 6 (Actionable Insights): Implement the AnalyzerAgent to generate summaries on the dashboard.
   * Epic 7 (Human Review): Implement an "Import Review" (Staging) screen where the user approves transactions and corrects categories before the final load (as discussed in the ETL pipeline).
Phase 3: Advisory and Planning (V2)
 * Objective: Expand the application from an analysis tool to a planning advisor.
 * Epics:
   * Epic 8 (Scenario Simulation): Implement the AdvisorAgent with the "What if?" functionality (financial simulator).
   * Epic 9 (Investment Advisor): Integrate with market APIs (MarketDataAPI) to provide basic portfolio analysis.
 * Development Plan (Agile Methodologies)
   The conversation established a clear agile working framework, focused on governance and technical clarity.
3.1. Roles and Structure
 * Roles: The conversation was conducted assuming the roles of:
   * Product Owner (PO): Focused on the product vision, backlog prioritization, and definition of Epics/User Stories.
   * Technical Program Manager (TPM): Focused on high-level architecture, system integration, and NFRs (Non-Functional Requirements).
   * Solutions / DB Architect: Focused on technology decisions, database schemas, and implementation tradeoffs (e.g., BullMQ vs RabbitMQ).
   * Scrum Master (SM): Focused on the process, removing impediments, and facilitating ceremonies (e.g., defining Sprint 0).
 * Team Structure: One or more agile development teams (Alpha, Beta) that consume the defined backlog.
3.2. Methodology
 * Framework: Scrum, evidenced by the discussion of Sprints (Sprint 0, Sprint 1), roles (PO, SM), and artifacts (Backlog).
 * Mentioned Ceremonies:
   * Backlog Refinement: Explicitly mentioned as the next step to break down Epics into Stories and technical Tasks.
   * Sprint Planning: Implied in the definition of the "Sprint 1 Goal."
3.3. Development Environment and Tools
 * Repository: A monorepo (or multirepo) with a clear folder structure: backend/, frontend/, worker/.
 * Local Dev Environment:
   * Docker Compose: Defined as the mandatory tool for local orchestration.
   * docker-compose.yml file: Must contain the services: postgres-db (using the pgvector/pgvector:pg15 image), redis (using redis:7-alpine), backend (API), and frontend (React).
   * Objective: Ensure a one-command developer setup (docker-compose up) and full parity with infra services.
3.4. Project Artifacts and Governance
To maintain clarity and alignment, the following documentation files were defined as essential:
 * README.md (Root): The project's entry point. Details the product vision, tech stack, and setup instructions (As generated in previous steps).
 * LICENSE (Root): Defines the usage license (e.g., MIT).
 * .gitignore (Root): Essential for ignoring node_modules, .env, etc.
 * .nvmrc (Root): Defines the single Node.js version for the entire project.
 * .env.example (In each service): Environment variable template for backend, frontend, and worker.
 * docs/ (Documentation Folder):
   * docs/ARCHITECTURE.md: Contains architecture diagrams (Mermaid) and the detailed database schema.
   * docs/ROADMAP.md: Details the PO's vision (the Epics and Phases from this report).
   * docs/CONTRIBUTING.md: Defines contribution rules, branching standards, and the Pull Request (PR) process.
   * docs/adr/ (Architectural Decision Records): The most critical artifact for recording the "why" behind decisions.
     * 001-choice-of-bullmq-redis.md
     * 002-choice-of-pgvector-for-ai-memory.md
3.5. Non-Functional Requirements (NFRs) / Acceptance Criteria
 * Security: Direct access to PostgreSQL is prohibited. All services (including the worker) must communicate exclusively through the GraphQL API, which manages authentication and authorization.
 * Privacy: PII (Personally Identifiable Information) data must be sanitized or anonymized before being sent to third-party LLM APIs.
 * Performance (Initial Goals):
   * API (REST): < 200ms (just to enqueue the job).
   * PDF Job (E2E): < 60 seconds (for 1 page).
 * Observability: The job queue (BullMQ) must be monitored for status, failures, and execution time.
 Contém os diagramas de arquitetura (Mermaid) e o esquema de banco de dados detalhado.
   * docs/ROADMAP.md: Detalha a visão do PO (os Épicos e Fases deste relatório).
   * docs/CONTRIBUTING.md: Define as regras de contribuição, padrões de branch e processo de Pull Request (PR).
   * docs/adr/ (Architectural Decision Records): O artefato mais crítico para registrar o "porquê" das decisões.
     * 001-escolha-do-bullmq-redis.md
     * 002-escolha-do-pgvector-para-memoria-ia.md
3.5. Requisitos Não-Funcionais (NFRs) / Critérios de Aceitação
 * Segurança: O acesso direto ao PostgreSQL é proibido. Todos os serviços (incluindo o worker) devem se comunicar exclusivamente através da API GraphQL, que gerencia autenticação e autorização.
 * Privacidade: Dados PII (Informações Pessoais Identificáveis) devem ser sanitizados ou anonimizados antes de serem enviados para APIs de LLM de terceiros.
 * Performance (Metas Iniciais):
   * API (REST): < 200ms (apenas para enfileirar o job).
   * Job de PDF (E2E): < 60 segundos (para 1 página).
 * Observabilidade: A fila de jobs (BullMQ) deve ser monitorada para status, falhas e tempo de execução.
