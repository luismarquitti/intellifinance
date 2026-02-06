# Track: MVP Initial Setup and Transactions Feature

## 1. Overview
This track aims to establish a Minimum Viable Product (MVP) for IntelliFinance. The primary goal is to enable local execution of the entire application via Docker Compose on Windows/WSL2, and to implement a core 'Transactions' feature. This feature will allow users to view a list of financial transactions, filter them, and import new transactions from CSV files.

## 2. Functional Requirements

### 2.1. Local Development Environment Setup
*   The entire project, including backend, frontend, and worker services, shall be runnable locally using `docker-compose` on **Windows (with Docker Desktop and WSL2 for Linux containers)**.
*   Setup instructions shall be clear and comprehensive, allowing a developer to get the environment running with minimal effort.

### 2.2. Transactions List Page
*   The frontend application shall include a dedicated "Transactions List Page".
*   Each transaction displayed on this page shall include the following key information:
    *   Transaction Date
    *   Description/Payee
    *   Amount
    *   Category
    *   Account
    *   Transaction Type (Debit/Credit)
*   The transactions list shall be interactable, allowing users to browse their transaction data.

### 2.3. Transactions Filtering
*   Users shall be able to apply filters to the transactions list to visualize data of interest.
*   The following filter criteria shall be available:
    *   Date Range
    *   Transaction Type (Debit/Credit)
    *   Category
    *   Account
    *   Search by Description/Payee

### 2.4. CSV Transaction Import
*   The application shall provide functionality to import transactions from CSV files into the database.
*   Key requirements for the CSV import functionality include:
    *   A dedicated upload button/interface shall be available on the transactions page or a related section.
    *   The import process shall support a specific CSV file format (e.g., predefined headers for 'Date', 'Description', 'Amount', 'Category', 'Account', 'Transaction Type').
    *   A progress indicator shall be displayed to the user during the import process.
    *   The system shall provide clear feedback on successful imports or errors (e.g., invalid rows, format mismatches).
    *   Users shall have the option to review and confirm imported data before it is permanently saved to the database.

## 3. Non-Functional Requirements
*   **Performance:** The transactions list and filtering should be responsive for a reasonable number of transactions (e.g., up to 10,000 records).
*   **Usability:** The filtering interface and CSV import process should be intuitive and user-friendly.
*   **Maintainability:** Code should adhere to established project conventions and best practices.

## 4. Acceptance Criteria
*   The `docker-compose` setup successfully builds and runs all services on a Windows machine with WSL2.
*   The "Transactions List Page" renders correctly and displays all specified transaction details.
*   All specified filter options function as expected, accurately narrowing down the displayed transactions.
*   Users can successfully upload a CSV file, see a progress indicator, receive feedback, and review/confirm data before it's saved.
*   Imported transactions are correctly persisted in the database and appear on the transactions list.

## 5. Out of Scope
*   Advanced user authentication beyond basic local setup.
*   Complex reporting features.
*   Editing or deleting individual transactions through the UI in this MVP.
*   Support for file formats other than CSV for import in this MVP.
*   Backend APIs for creating/updating categories, accounts, or transaction types via UI. These are assumed to be pre-seeded or managed through other means for the MVP.