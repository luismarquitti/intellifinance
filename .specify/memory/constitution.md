# IntelliFinance Constitution
<!-- 
**Sync Impact Report**
- **Version change**: 0.0.0 -> 1.0.0
- **Added sections**:
  - Core Principles
  - Technology Stack
  - Asynchronous Architecture
  - Test-Driven Development (TDD)
  - Code Standards
  - Security
  - Code Quality
  - Testing Standards
  - User Experience Consistency
  - Performance Requirements
  - Development Workflow
  - Governance
- **Templates requiring updates**:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
-->

## Core Principles

### I. Technology Stack (NON-NEGOTIABLE)
The technology stack is non-negotiable to ensure consistency and maintainability across the project.
- **Frontend:** React with TypeScript
- **Backend:** Node.js with TypeScript, Express, and GraphQL (Apollo Server)
- **Relational Database:** PostgreSQL (v15+)
- **Vector Database:** PGVector
- **Job Queue:** Redis with BullMQ

### II. Asynchronous Architecture
All AI operations MUST be asynchronous to ensure the system remains responsive and scalable. This applies to data ingestion, processing, and any communication with AI models.

### III. Test-Driven Development (TDD) (NON-NEGOTIABLE)
TDD is mandatory for all new features and bug fixes. The Red-Green-Refactor cycle must be strictly enforced. All code must be accompanied by meaningful tests.

### IV. Code Standards
All code MUST adhere to Prettier and ESLint standards to maintain a consistent and readable codebase. Automated checks will be enforced in the CI/CD pipeline.

### V. Security
Security is paramount. Agents MUST NOT have direct access to the database. All data access MUST go through the GraphQL API, which is responsible for authentication and authorization.

### VI. Code Quality
Code should be well-documented, modular, and easy to understand. Avoid overly complex solutions and premature optimizations. Follow the SOLID principles.

### VII. Testing Standards
In addition to TDD, the following testing standards must be met:
- Unit tests for all individual components.
- Integration tests for interactions between components.
- End-to-end tests for critical user flows.
- A high level of test coverage is expected and will be measured.

### VIII. User Experience Consistency
The user interface should be consistent in its design and behavior. Follow established UI/UX patterns and component libraries.

### IX. Performance Requirements
The application must be performant. API responses should be fast, and the frontend should be responsive. Performance testing should be part of the development lifecycle.

## Development Workflow

All new features and bug fixes must go through the following workflow:
1.  Create a new feature branch from `develop`.
2.  Write tests and implement the feature following TDD.
3.  Open a pull request to merge the feature branch into `develop`.
4.  The pull request must be reviewed and approved by at least one other team member.
5.  All CI/CD checks must pass.
6.  Once merged, the feature will be deployed to a staging environment for further testing before being released to production.

## Governance

This constitution is the single source of truth for all development practices in the IntelliFinance project. All team members are expected to adhere to these principles.

Amendments to this constitution require a formal proposal, a review by the team, and a migration plan if the changes are breaking. All pull requests must verify compliance with this constitution.

**Version**: 1.0.0 | **Ratified**: 2025-11-02 | **Last Amended**: 2025-11-02