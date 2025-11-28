# Feature Specification: Financial Core & Transactions List MVP

**Feature Branch**: `005-financial-mvp`
**Created**: 2024-05-24
**Status**: Draft
**Input**: User description: "Financial Core & Transactions List MVP (Spec 005)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Transactions List (Priority: P1)

As a user, I want to view a list of my financial transactions so that I can track my spending and income.

**Why this priority**: This is the core value proposition of the MVP. Without seeing transactions, the application has no utility.

**Independent Test**: Can be fully tested by seeding the database with demo transactions and verifying they appear in the list with correct details (amount, description, date, category).

**Acceptance Scenarios**:

1. **Given** a user with seeded transactions, **When** they navigate to `/transactions`, **Then** they see a list of transactions ordered by date.
2. **Given** a transaction in the list, **When** viewed, **Then** it displays an icon, description, category badge, date, and amount (green for income, red for expense).
3. **Given** a user with no transactions, **When** they navigate to `/transactions`, **Then** they see an empty state message.

---

### User Story 2 - Filter Transactions (Priority: P2)

As a user, I want to filter my transactions by account, category, or date so that I can analyze specific subsets of my finances.

**Why this priority**: Filtering adds significant usability, allowing users to find specific information amidst a large list of transactions.

**Independent Test**: Can be tested by applying filters and verifying the list updates to show only matching transactions.

**Acceptance Scenarios**:

1. **Given** a list of transactions from multiple accounts, **When** the user selects "Credit Card" from the account filter, **Then** only transactions linked to that account are displayed.
2. **Given** a list of transactions, **When** the user selects a specific date range, **Then** only transactions within that range are displayed.

---

### User Story 3 - View Account Summary (Priority: P3)

As a user, I want to see a summary of my financial status (Total Balance, Income, Expense) so that I can get a quick overview of my financial health.

**Why this priority**: Provides immediate context and high-level insight before diving into details.

**Independent Test**: Can be tested by verifying the numbers in the summary cards match the sum of the visible transactions.

**Acceptance Scenarios**:

1. **Given** the transactions page, **When** the page loads, **Then** three summary cards are visible: "Total Balance", "Income", and "Expense".
2. **Given** a filter is applied, **When** the transaction list updates, **Then** the summary cards recalculate based on the visible transactions.

### Edge Cases

- What happens when a user has no accounts? (Should prompt to create one or show empty state)
- How does the system handle transactions with deleted categories? (Should show "Uncategorized" or preserve old category name)
- What happens if the database connection fails while loading transactions? (Should show a friendly error message)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support `Account` entity with types: CHECKING, CREDIT_CARD, CASH.
- **FR-002**: System MUST support `Category` entity with types: INCOME, EXPENSE, and visual attributes (icon, color).
- **FR-003**: System MUST support `Transaction` entity linked to Account and Category.
- **FR-004**: Database MUST be seeded with default categories (Food, Transport, Salary) and a demo account with transactions.
- **FR-005**: API MUST provide a `transactions` query with support for pagination and filtering by Date Range, Account, and Category.
- **FR-006**: API MUST provide `accounts` and `categories` queries to support UI dropdowns.
- **FR-007**: Frontend MUST implement an Authenticated Layout with a Top Bar (User Menu, Theme Toggle).
- **FR-008**: Frontend MUST implement a `TransactionsPage` at `/transactions`.
- **FR-009**: Frontend MUST display a `TransactionList` with specific visual cues (Green for Income, Red for Expense).
- **FR-010**: Frontend MUST provide a `FilterSection` for filtering by Account, Category, and Date.
- **FR-011**: Frontend MUST display `SummaryCards` for "Total Balance", "Income", and "Expense".
- **FR-012**: UI MUST be responsive (Mobile First) and use TailwindCSS.

### Key Entities *(include if feature involves data)*

- **Account**: Represents a financial source (e.g., Bank Account, Wallet). Fields: `id`, `name`, `type`, `balance`, `userId`.
- **Category**: Classifies transactions. Fields: `id`, `name`, `icon`, `color`, `type`, `userId`.
- **Transaction**: A financial record. Fields: `id`, `amount`, `description`, `date`, `type`, `accountId`, `categoryId`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User can see a list of demo transactions seeded in the DB.
- **SC-002**: User can filter by "Credit Card" and see only those transactions.
- **SC-003**: UI matches the provided design guidelines (Responsive, TailwindCSS).
- **SC-004**: Backend API returns transactions within 200ms for standard page sizes.
