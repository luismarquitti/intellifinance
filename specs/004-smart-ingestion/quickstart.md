# Quickstart: Smart Document Ingestion

## Prerequisites

- Docker & Docker Compose running.
- `OPENAI_API_KEY` (Optional). If missing, the system runs in **Mock Mode**.

## Setup

1.  **Prepare Upload Directory**:
    The backend requires a local directory for uploads.
    ```bash
    mkdir -p apps/backend/uploads
    ```

2.  **Environment Variables**:
    Add to `apps/worker/.env`:
    ```env
    OPENAI_API_KEY=sk-... # Optional. Leave empty for Mock Mode.
    ```

## Running the Feature

1.  **Start the Stack**:
    ```bash
    docker-compose up --build
    ```

2.  **Verify Worker Connection**:
    Check logs for `apps/worker` to ensure it connected to Redis:
    ```text
    worker_1 | Worker listening to 'document-ingestion' queue...
    ```

3.  **Test Upload (via GraphQL Playground)**:
    Endpoint: `http://localhost:3000/graphql`

    **Operation**:
    ```graphql
    mutation Upload($file: Upload!, $accountId: ID!) {
      uploadStatement(file: $file, accountId: $accountId) {
        id
        status
      }
    }
    ```
    *Note: You need to select a file variable in the Playground or Postman.*

## Development Tips

- **Mock Mode**: If you don't provide an OpenAI key, the worker will log: `Using Mock LLM Service` and return a fixed set of 3 dummy transactions for every PDF.
- **PDF Parsing**: The system uses `pdf-parse`. If extraction fails, check the worker logs for "PDF Parse Error".
