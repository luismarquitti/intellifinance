# Plan: Transaction Management

**Phase:** 4
**Status:** 📝 Draft
**Spec:** [SPEC-003](./spec.md)

## Technical Design

### Data Model

**Transactions Table (`transactions`)**
- `id`: UUID (PK)
- `account_id`: UUID (FK -> financial_accounts.id)
- `user_id`: UUID (FK -> users.id) - *Denormalized for easier querying/security*
- `amount`: DECIMAL(12, 2)
- `type`: VARCHAR ('INCOME', 'EXPENSE')
- `date`: DATE
- `description`: TEXT
- `category`: VARCHAR (nullable for now)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### API Design (GraphQL)

**Queries**
- `transactions(accountId: ID, startDate: String, endDate: String): [Transaction!]!`
- `transaction(id: ID!): Transaction`

**Mutations**
- `createTransaction(input: CreateTransactionInput!): Transaction!`
- `updateTransaction(id: ID!, input: UpdateTransactionInput!): Transaction!`
- `deleteTransaction(id: ID!): Boolean!`

### Logic & Side Effects

- **Balance Updates:**
    - `createTransaction`: Update `financial_accounts.balance`.
    - `updateTransaction`: Calculate difference and update `financial_accounts.balance`.
    - `deleteTransaction`: Reverse the effect on `financial_accounts.balance`.
    - *Note:* Use database transactions (ACID) to ensure data integrity between transaction records and account balances.

## Implementation Phases

### Phase 1: Database & Backend Core
1. Create migration for `transactions` table.
2. Create `Transaction` model.
3. Implement `Transaction` GraphQL schema.

### Phase 2: Resolvers & Business Logic
1. Implement `createTransaction` with balance update logic.
2. Implement `updateTransaction` with balance adjustment logic.
3. Implement `deleteTransaction` with balance restoration logic.
4. Implement `transactions` query with filtering.

### Phase 3: Frontend UI
1. Create `TransactionList` component.
2. Create `AddTransactionForm` component.
3. Create `EditTransactionForm` component.
4. Integrate into `AccountDetailsPage` (or similar).

## Verification Plan

### Automated Tests
- **Backend:** Integration tests for all resolvers, specifically verifying that account balances change correctly.
- **Frontend:** Component tests for forms and lists.

### Manual Verification
- Create an account with $0 balance.
- Add income of $100 -> Verify balance is $100.
- Add expense of $20 -> Verify balance is $80.
- Edit expense to $30 -> Verify balance is $70.
- Delete expense -> Verify balance is $100.
