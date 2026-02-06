# IntelliFinance Technology Stack

This document outlines the core technologies and architectural patterns employed in the IntelliFinance platform.

## 1. Overview

IntelliFinance is built as a scalable, monorepo-based application, leveraging modern JavaScript ecosystems for both frontend and backend development. It incorporates a microservices-ready architecture with dedicated workers for asynchronous processing.

## 2. Core Technologies

### 2.1. Programming Languages & Runtimes

-   **TypeScript:** Primary language for all application layers, ensuring type safety and improving developer experience.
-   **Node.js:** Server-side JavaScript runtime for both backend API and worker services.

### 2.2. Frontend

-   **React:** A declarative, component-based JavaScript library for building user interfaces.
-   **Vite:** A fast, opinionated build tool for modern web projects, used for rapid frontend development.

### 2.3. Backend

-   **Express:** A minimal and flexible Node.js web application framework, providing a robust set of features for web and mobile applications.
-   **GraphQL (Apollo/Shield):** Used for API development, providing an efficient, powerful, and flexible approach to developing web APIs. Apollo Server and Shield are utilized for implementation and security.

### 2.4. Data Management

-   **PostgreSQL:** A powerful, open-source object-relational database system known for its reliability, feature robustness, and performance.
-   **Prisma ORM:** A next-generation ORM that simplifies database access and provides type-safe queries.

### 2.5. Asynchronous Processing & Messaging

-   **Redis:** An in-memory data structure store, used as a message broker and cache.
-   **BullMQ:** A robust, Redis-backed queueing system for Node.js, enabling reliable background job processing and asynchronous task handling.

## 3. Architecture & Project Structure

-   **Monorepo (Yarn Workspaces):** The project is structured as a monorepo using Yarn Workspaces, facilitating code sharing, dependency management, and atomic deployments across different application components (backend, frontend, worker, shared packages).
-   **Microservices-Ready:** The application design supports a microservices-oriented architecture, with clear separation of concerns between the backend API and dedicated worker services.