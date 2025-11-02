# Research: Category Management (CRUD)

## Decision: Technology Stack
- Chosen: Node.js (Express, GraphQL), React, PostgreSQL, PGVector, Redis, BullMQ
- Rationale: Aligns with project constitution and async job pattern; supports scalable, testable, and maintainable architecture.
- Alternatives considered: Python (FastAPI), Django, MongoDB, RabbitMQ

## Decision: Data Model
- Chosen: Category entity with id, user_id, name, type (expense/revenue), parent_id (nullable), created_at, updated_at
- Rationale: Supports hierarchical categories, user ownership, and CRUD operations.
- Alternatives considered: Flat category list, denormalized parent/child structure

## Decision: Subcategory Deletion
- Chosen: Reassign subcategories to root level when parent is deleted
- Rationale: Prevents accidental data loss, keeps user data accessible
- Alternatives considered: Cascade delete, prompt user for action

## Decision: API Pattern
- Chosen: GraphQL for all category CRUD operations
- Rationale: Consistent with backend architecture, flexible for frontend queries
- Alternatives considered: REST endpoints

## Decision: Validation Rules
- Chosen: Unique category names per parent/user, prevent circular references
- Rationale: Ensures data integrity and usability
- Alternatives considered: Allow duplicates, no parent validation

## Decision: Testing
- Chosen: Jest (backend/frontend), TDD for all new features
- Rationale: Project constitution mandates TDD and code quality
- Alternatives considered: Mocha, AVA, manual testing
