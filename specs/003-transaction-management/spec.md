# SPEC-003: Transaction Management

**Status:** 📝 Draft
**Priority:** High
**Owner:** Dev Team
**Effort Estimate:** L (3-4h)
**Created:** 2025-11-21

#### Problem Statement

Users need to track their income and expenses to understand their financial situation. Currently, they can only manage accounts but not the transactions within them.

#### Proposed Solution

Implement a transaction management system that allows users to create, read, update, and delete transactions. Each transaction will be linked to a financial account and will include details such as amount, date, description, and category.

#### User Story

As a user, I want to log my financial transactions so that I can keep a detailed record of my spending and income.

#### Functional Requirements

-   **REQ-003-F-001:** The system SHALL allow authenticated users to create a new transaction linked to one of their financial accounts.
-   **REQ-003-F-002:** A transaction SHALL consist of: `accountId`, `amount`, `date`, `description`, `category` (optional), and `type` (income/expense).
-   **REQ-003-F-003:** The system SHALL allow users to view a list of transactions, filterable by account and date range.
-   **REQ-003-F-004:** The system SHALL allow users to update the details of an existing transaction.
-   **REQ-003-F-005:** The system SHALL allow users to delete a transaction.
-   **REQ-003-F-006:** When a transaction is created, updated, or deleted, the balance of the linked financial account SHALL be updated automatically.

#### Acceptance Criteria

**Scenario 1: Create a Transaction**
-   **Given** an authenticated user has a financial account.
-   **When** they add a new transaction (e.g., Expense of $50).
-   **Then** the transaction is saved in the database.
-   **And** the account balance is decreased by $50.

**Scenario 2: View Transactions**
-   **Given** an authenticated user has multiple transactions.
-   **When** they view the transaction list.
-   **Then** they see all transactions sorted by date (newest first).

**Scenario 3: Update Transaction Amount**
-   **Given** an existing transaction of $50.
-   **When** the user updates the amount to $60.
-   **Then** the transaction record is updated.
-   **And** the account balance is adjusted by the difference (-$10).

**Scenario 4: Delete Transaction**
-   **Given** an existing transaction of $50.
-   **When** the user deletes the transaction.
-   **Then** the record is removed.
-   **And** the account balance is restored (+$50).
