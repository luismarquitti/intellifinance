# Data Model: Smart Document Ingestion

**Feature**: Spec 004
**Source**: `packages/database/schema.prisma`

## Enums

### `IngestionStatus`
Tracks the lifecycle of a document processing job.
- `PENDING`: Job created, file uploaded, waiting in queue.
- `PROCESSING`: Worker has picked up the job.
- `COMPLETED`: Transactions successfully extracted and saved.
- `FAILED`: Processing failed (PDF parse error, LLM error, etc.).

## Models

### `Account`
Represents a real-world bank account or credit card.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| `id` | String | `@id @default(uuid())` | Unique identifier. |
| `userId` | String | | The owner of the account (link to Auth system). |
| `bankName` | String | | E.g., "Chase", "Wells Fargo". |
| `type` | String | | E.g., "CHECKING", "SAVINGS", "CREDIT_CARD". |
| `createdAt` | DateTime | `@default(now())` | |
| `updatedAt` | DateTime | `@updatedAt` | |
| `transactions` | Transaction[] | | Relation to transactions. |
| `ingestionJobs` | IngestionJob[] | | Relation to ingestion history. |

### `Transaction`
A single financial event extracted from a statement.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| `id` | String | `@id @default(uuid())` | Unique identifier. |
| `accountId` | String | | Foreign Key to `Account`. |
| `date` | DateTime | | Transaction date. |
| `amount` | Decimal | | Transaction amount (positive for deposits, negative for expenses usually, or normalized). |
| `description` | String | | Original description text. |
| `category` | String? | | Inferred category (e.g., "Groceries"). |
| `sourceFileUrl` | String? | | Reference to the source PDF (for audit). |
| `createdAt` | DateTime | `@default(now())` | |

### `IngestionJob`
Audit log and status tracker for async processing.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| `id` | String | `@id @default(uuid())` | Job ID (returned to client). |
| `accountId` | String | | The account this statement belongs to. |
| `status` | IngestionStatus | `@default(PENDING)` | Current state. |
| `fileUrl` | String | | Path to the uploaded file. |
| `resultSummary` | String? | | Optional JSON or text summary (e.g., "5 txs found"). |
| `createdAt` | DateTime | `@default(now())` | |
| `completedAt` | DateTime? | | When processing finished. |
