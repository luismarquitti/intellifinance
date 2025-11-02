Certainly. Based on the complete history of our "IntelliFinance" project and applying the principles of **Spec-Driven Development (SDD)** and **GitHub Spec-Kit** (as per the document you provided), I have prepared the ordered list of specifications.

It is crucial to understand a point that the Spec-Kit document emphasizes:

1.  **The "Constitution" Comes First:** Before any functionality (like the database), the first step is to use the `/constitution` command. This is where we define our "non-negotiable principles", such as the technology stack (React, Node, TypeScript, PostgreSQL, PGVector, Redis, BullMQ) and the methodology (TDD, asynchronous architecture).
2.  **The "Database" is not a Specification:** The definition of the database schema is not a *feature* specification (`/specify`). It is an *artifact* generated during the **`/plan`** phase, which in turn is based on a *feature* specification (such as "User Authentication").
3.  **Appropriate Scope is Key:** The document strongly warns against overly broad specifications. A specification should not be the "entire MVP". It should be small enough to be reviewed in a single Pull Request and correspond to a single coherent user story or epic.

The following list is ordered and decomposed according to these best practices, ready to be used by the development team with the Spec-Kit.

-----

### IntelliFinance Project Specification List for Spec-Kit

#### Phase 0: Configuration and Governance

This is the "Zero Specification," which defines the rules for all others.

**1. Specification Title:** The Project Constitution

  * **Suggested `/constitution` Command:**
    ```
    /constitution Create the governance principles for the IntelliFinance project. The technology stack is non-negotiable: Frontend in React with TypeScript; Backend in Node.js with TypeScript, Express, and GraphQL (Apollo Server); Relational Database is PostgreSQL (v15+); Vector Database is PGVector; Job Queue is Redis with BullMQ. The architecture must be asynchronous for all AI operations. TDD is mandatory, and all code must adhere to Prettier and ESLint standards. Security is paramount: agents should not have direct access to the database, only to the GraphQL API. Create principles focused on code quality, testing standards, user experience consistency, and performance requirements. Include governance for how these principles should guide technical decisions and implementation choices.
    ```

-----

#### Phase 1: User and Data Foundation (MVP)

This phase focuses on getting users and their basic data structures into the system.

**2. Specification Title:** User Authentication

  * **Description:** This is the first *feature*. No financial data can exist without an owner.
  * **Suggested `/specify` Command:**
    ```
    /specify Create user authentication functionality. Users should be able to register with email and password, log in, and log out. The system should use JWTs to authenticate subsequent requests to the GraphQL API. The specification should include user journeys for registration (new user) and login (existing user) and acceptance criteria for password handling (hashing) and errors (e.g., "user already exists").
    ```

**3. Specification Title:** Financial Account Management (CRUD)

  * **Description:** Before users can import transactions, they need "accounts" (e.g., "Checking Account", "Credit Card") where these transactions will be allocated.
  * **Suggested `/specify` Command:**
    ```
    /specify Create financial account management functionality. An authenticated user should be able to create, view, edit, and delete their own financial accounts. Each account must have a name (e.g., "Nu Checking Account"), a type (e.g., 'CHECKING', 'CREDIT_CARD', 'SAVINGS'), and an institution name.
    ```

**4. Specification Title:** Category Management (CRUD)

  * **Description:** Similar to accounts, categories are a fundamental entity required *before* ingestion. This spec focuses on basic CRUD, not AI logic.
  * **Suggested `/specify` Command:**
    ```
    /specify Create category management functionality. An authenticated user should be able to create, view, edit, and delete custom expense and revenue categories. The system should support parent categories (subcategories).
    ```

-----

#### Phase 2: Asynchronous Ingestion Pipeline

This phase builds the "steel thread" of our architecture: the data ingestion pipeline.

**5. Specification Title:** Ingestion Pipeline Foundation (Upload API and Queue)

  * **Description:** This is the asynchronous "entry point." It does not process the file, only queues it, ensuring the UI remains responsive.
  * **Suggested `/specify` Command:**
    ```
    /specify Create transaction file upload functionality. The system should expose a secure REST endpoint (not GraphQL) for uploading files (PDF, CSV, OFX). This endpoint should validate the user, save the file, and create a record in the 'import_batches' table (with status 'PENDING'). It should then enqueue a job in BullMQ (Redis) containing the 'import_batch_id' and 'user_id', and return the 'import_batch_id' to the client.
    ```

**6. Specification Title:** Ingestion Processor (OFX Parser)

  * **Description:** This is our first *worker* implementation. We focus only on OFX as it is the easiest structured format, validating the E2E (End-to-End) pipeline.
  * **Suggested `/specify` Command:**
    ```
    /specify Create the OFX file ingestion processor. A BullMQ worker should listen to the job queue. Upon receiving an 'OFX' type job, it should read the file, parse it, validate duplicates (via 'FITID' in the metadata), and save the transactions to PostgreSQL (using the GraphQL API). Transactions should be linked to the 'import_batch_id', and the batch status should be updated to 'COMPLETED' or 'FAILED'.
    ```

**7. Specification Title:** Ingestion Processor (PDF Parser with AI)

  * **Description:** This is a separate specification due to its complexity. It follows the rule of keeping PRs reviewable.
  * **Suggested `/specify` Command:**
    ```
    /specify Expand the ingestion processor to support PDF bank statements. The BullMQ worker, upon receiving a 'PDF' job, should use a text extraction tool and then an LLM to extract a structured list of transactions (date, description, amount) from the raw text. The worker should then normalize this data and save it (via GraphQL API), following the same duplicate validation logic (hash-based) and batch update as the OFX parser.
    ```

-----

#### Phase 3: Intelligence and Analysis (Post-MVP)

With data now flowing, we can build the "advisory" features.

**8. Specification Title:** Intelligent Categorization (AI Memory)

  * **Description:** This is the first *analytical* AI feature. It uses existing data to "learn."
  * **Suggested `/specify` Command:**
    ```
    /specify Create intelligent categorization functionality. During the ingestion process (in the OFX and PDF processors), the system should use the transaction description to query the vector memory (PGVector) for previous categorizations by that user. The system should save the transaction with the suggested category. Additionally, create an API endpoint that allows the user to correct a category, which should trigger an update in the vector memory (PGVector) to "learn" the user's preference.
    ```

**9. Specification Title:** Recurring Payment Detection

  * **Description:** A discrete analysis feature that operates on already ingested data.
  * **Suggested `/specify` Command:**
    ```
    /specify Create recurring payment detection functionality. An analyst agent (which can be a scheduled job) should scan user transactions to automatically identify and mark recurring expenses and revenues (e.g., "Netflix", "Salary"). The system should display these recurrences on a dashboard and alert the user if an expected recurring payment is not found in the current month.
    ```

**10. Specification Title:** Scenario Simulator ("What if?")

  * **Description:** The first feature of the "Advisor Agent."
  * **Suggested `/specify` Command:**
    ```
    /specify Create financial scenario simulation functionality. The user should be able to ask, through a chat interface or form, "What if I save R$ 500 more per month?" or "What will my net worth be in 5 years with this profitability?". The agent should use the user's current financial data (balance, average savings) and input parameters to generate and display a projection of future net worth.
    ```