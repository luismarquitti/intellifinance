# Data Model: Financial Core

## Entities

### Account
Represents a user's financial account.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String (UUID) | Yes | Primary Key |
| name | String | Yes | Account Name (e.g., "Main Checking") |
| type | Enum | Yes | `CHECKING`, `CREDIT_CARD`, `CASH` |
| balance | Decimal | Yes | Current balance |
| userId | String (UUID) | Yes | Foreign Key to User |
| createdAt | DateTime | Yes | Timestamp |
| updatedAt | DateTime | Yes | Timestamp |

### Category
Represents a transaction category.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String (UUID) | Yes | Primary Key |
| name | String | Yes | Category Name (e.g., "Food") |
| icon | String | Yes | Icon identifier (e.g., "fastfood") |
| color | String | Yes | Hex color code (e.g., "#FF0000") |
| type | Enum | Yes | `INCOME`, `EXPENSE` |
| userId | String (UUID) | Yes | Foreign Key to User |
| createdAt | DateTime | Yes | Timestamp |
| updatedAt | DateTime | Yes | Timestamp |

### Transaction
Represents a financial movement.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String (UUID) | Yes | Primary Key |
| amount | Decimal | Yes | Transaction amount |
| description | String | Yes | Description/Note |
| date | DateTime | Yes | Transaction date |
| type | Enum | Yes | `INCOME`, `EXPENSE`, `TRANSFER` |
| status | Enum | Yes | `PENDING`, `COMPLETED` |
| accountId | String (UUID) | Yes | Foreign Key to Account |
| categoryId | String (UUID) | Yes | Foreign Key to Category |
| createdAt | DateTime | Yes | Timestamp |
| updatedAt | DateTime | Yes | Timestamp |

## Relationships

- **User** has many **Accounts**
- **User** has many **Categories**
- **Account** has many **Transactions**
- **Category** has many **Transactions**
