# Specification: Robust Transaction Data Ingestion

**Track:** Implement robust transaction data ingestion and validation for diverse financial sources.

## 1. Overview

This specification outlines the requirements for enhancing IntelliFinance's data ingestion capabilities. The primary goal is to create a flexible and resilient system for importing transaction data from various sources (e.g., CSV files, bank APIs) and ensuring data integrity through robust validation.

## 2. Key Features

### 2.1. Data Source Abstraction

-   **Source Adapter Interface:** Define a generic `IDataSourceAdapter` interface that standardizes how data is read from different sources. This interface will abstract the underlying implementation details of each source type.
-   **CSV Adapter:** Implement a `CsvDataSourceAdapter` that conforms to the `IDataSourceAdapter` interface. This adapter will be responsible for parsing transaction data from CSV files with configurable column mappings.
-   **API Adapter (Future):** The architecture should allow for the future implementation of adapters for different bank APIs (e.g., Plaid) without requiring significant changes to the core ingestion logic.

### 2.2. Data Validation and Enrichment

-   **Zod-based Validation:** Utilize Zod schemas to define the expected data structure and validation rules for a canonical `Transaction` model. This ensures that all incoming data is validated against a single source of truth.
-   **Data Transformation:** Implement transformation logic within the adapters to map data from the source format to the canonical `Transaction` model.
-   **Error Handling:** Provide detailed error reporting for validation failures, including row numbers and specific validation errors to facilitate debugging.

### 2.3. Asynchronous Processing

-   **BullMQ Integration:** The ingestion process will be handled asynchronously by a dedicated BullMQ worker. The backend API will be responsible for receiving the initial upload request and dispatching a job to the ingestion queue.
-   **Job Status Tracking:** The system will provide a mechanism to track the status of ingestion jobs (e.g., `pending`, `in_progress`, `completed`, `failed`).

## 3. Technical Requirements

-   **Canonical Transaction Model:** Define a `Transaction` model in `packages/types/src/financial.ts` that will serve as the single source of truth for transaction data across the application.
-   **Ingestion Processor:** The `ingestion.processor.ts` in the `worker` app will be updated to use the new data source adapters and validation logic.
-   **API Endpoint:** The backend will expose a secure GraphQL mutation for initiating the data ingestion process.
