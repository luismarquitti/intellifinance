# Data Model: Financial Account

This document describes the data model for the `FinancialAccount` entity.

*   **Entity**: `FinancialAccount`
*   **Description**: Represents a user's financial account.

| Field | Type | Description | Constraints |
|---|---|---|---|
| `id` | `UUID` | The unique identifier for the account. | Primary Key |
| `userId` | `UUID` | The ID of the user who owns the account. | Foreign Key to `User` |
| `name` | `String` | The name of the account. | Required, max 255 characters |
| `type` | `Enum` | The type of the account. | Required, one of: `CHECKING`, `SAVINGS`, `CREDIT_CARD`, `INVESTMENT`, `LOAN`, `MORTGAGE` |
| `institution` | `String` | The name of the financial institution. | Required, max 255 characters |
| `createdAt` | `Timestamp` | The date and time the account was created. | |
| `updatedAt` | `Timestamp` | The date and time the account was last updated. | |
