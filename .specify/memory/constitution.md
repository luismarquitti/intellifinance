<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- New principles added:
  - I. Spec-Driven Development (SDD)
  - II. Strong Typing & Contracts
  - III. Asynchronous Decoupling
  - IV. Monorepo Boundaries
  - V. Probabilistic Containment (AI Policy)
- New sections added:
  - Testing Strategy
  - Development Workflow
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# IntelliFinance Constitution

## Core Principles

### I. Spec-Driven Development (SDD)
**"The Spec is the Single Source of Truth."**
No code is written without a pre-existing, validated Markdown Specification (`.spec.md`). The code is merely a compilation artifact of the documentation.
* **Workflow:** Draft Spec → Review Logic → Implement Code → Verify against Spec.
* **Docs-First:** If the implementation diverges from the Spec, the implementation is wrong, or the Spec must be amended first.

### II. Strong Typing & Contracts
**"Trust Nothing, Validate Everything."**
The system relies on strict contracts between boundaries. `any` type is strictly forbidden.
* **Validation:** All inputs (API, CLI, Environment) must be validated using **Zod** schemas at the entry point.
* **Database:** Prisma Schema is the canonical definition of data structure.
* **Sharing:** Types are defined in `packages/types` and consumed by both Backend, Frontend, and Workers to ensure consistency.

### III. Asynchronous Decoupling
**"Blocking is Failure."**
Heavy processing, especially AI inference, must never block the user interface or the API event loop.
* **Pattern:** API accepts request → Enqueues Job (BullMQ) → Returns ID immediately.
* **Workers:** Dedicated microservices process jobs and update state in the database.
* **State:** The frontend must handle asynchronous state (Polling/Websockets) gracefully.

### IV. Monorepo Boundaries
**"Modular by Design."**
We utilize a Yarn Workspaces Monorepo to maintain code cohesion without coupling.
* **Apps (`/apps`):** Deployable units (Backend, Frontend, Worker). Should contain minimal business logic.
* **Packages (`/packages`):** Reusable logic, UI kits, Database clients, and configs.
* **Constraint:** Apps cannot import from other apps. They must communicate via API or shared Packages.

### V. Probabilistic Containment (AI Policy)
**"AI is a Tool, Not a Magician."**
AI Agents are non-deterministic components wrapped in deterministic code.
* **Structure:** AI outputs must be coerced into structured JSON (using Zod) before being used by the system.
* **Fallbacks:** Every AI interaction must have a defined failure state or human-in-the-loop fallback.
* **Cost:** Agents must be optimized for token usage; context windows should be lean.

## Testing Strategy

**"Quality is Built-In, Not Inspected."**
* **Unit Tests (Vitest):** Mandatory for all Business Logic in `packages/`.
* **Integration Tests:** Mandatory for API Endpoints (Happy & Unhappy paths).
* **AI Mocking:** Tests involving LLMs must support a "Mock Mode" to run without incurring costs or latency during CI.
* **Visual Regression:** Critical frontend flows must be covered by E2E tests (Playwright).

## Development Workflow

**"Clean History, Clear Intent."**
* **Commits:** Must follow [Conventional Commits](https://www.conventionalcommits.org/) (feat, fix, chore, docs).
* **Branching:** Feature branches (`feat/x`) merged into `main` via Pull Request.
* **Review:** No PR is merged without passing CI (Lint + Test) and at least one approval.
* **Agent Guidelines:** AI coding assistants must respect the `.github/copilot-instructions.md` and never hallucinate dependencies not present in `package.json`.

## Governance

This Constitution supersedes all other project documentation. Amendments to these principles require a version bump and a "Migration Plan" for existing code.

**Governance Rules:**
1.  **Complexity:** Any architectural deviation (e.g., adding a new database) requires a written RFC (Request for Comments).
2.  **Deprecation:** Breaking changes to the API Contract must support the previous version for at least one release cycle.
3.  **Compliance:** The "Architect Agent" is authorized to reject code that violates Principle I or II.

**Version**: 1.0.0 | **Ratified**: 2025-11-27 | **Last Amended**: 2025-11-27