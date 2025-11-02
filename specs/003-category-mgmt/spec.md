# Feature Specification: Category Management (CRUD)

**Feature Branch**: `003-category-mgmt`  
**Created**: 2025-11-02  
**Status**: Draft  
**Input**: User description: "Create category management functionality. An authenticated user should be able to create, view, edit, and delete custom expense and revenue categories. The system should support parent categories (subcategories)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Category (Priority: P1)

As an authenticated user, I want to create a new expense or revenue category (optionally as a subcategory), so I can organize my transactions according to my needs.

**Why this priority**: Creating categories is fundamental for personalizing financial management and is a prerequisite for other category operations.

**Independent Test**: Can be fully tested by creating a new category and verifying it appears in the user's category list.

**Acceptance Scenarios**:

1. **Given** the user is authenticated, **When** they submit a new category name, **Then** the category is created and visible in their list.
2. **Given** the user is creating a subcategory, **When** they select a parent category, **Then** the new category is nested under the selected parent.

---

### User Story 2 - Edit Category (Priority: P2)

As an authenticated user, I want to edit the name or parent of an existing category, so I can keep my categories organized as my needs change.

**Why this priority**: Editing allows users to correct mistakes or reorganize their categories, improving long-term usability.

**Independent Test**: Can be fully tested by editing a category and verifying the changes are reflected in the category list.

**Acceptance Scenarios**:

1. **Given** a category exists, **When** the user edits its name, **Then** the updated name is saved and displayed.
2. **Given** a category exists, **When** the user changes its parent, **Then** the category is moved under the new parent.

---

### User Story 3 - Delete Category (Priority: P3)

As an authenticated user, I want to delete a category (or subcategory), so I can remove unused or unwanted categories from my account.

**Why this priority**: Deleting categories helps users keep their category list relevant and uncluttered.

**Independent Test**: Can be fully tested by deleting a category and verifying it no longer appears in the user's list.

**Acceptance Scenarios**:

1. **Given** a category exists, **When** the user deletes it, **Then** the category is removed from their list.
2. **Given** a category with subcategories is deleted, **When** the user confirms deletion, **Then** all subcategories are reassigned to the root level (no parent).

---

### User Story 4 - View Categories (Priority: P4)

As an authenticated user, I want to view all my categories (including subcategories), so I can select them when categorizing transactions.

**Why this priority**: Viewing categories is essential for all category-related operations and for transaction management.

**Independent Test**: Can be fully tested by retrieving the category list and verifying all categories and subcategories are present and correctly nested.

**Acceptance Scenarios**:

1. **Given** the user has categories and subcategories, **When** they view their category list, **Then** all categories are displayed in a hierarchical structure.

### Edge Cases

- How does the system handle deleting a parent category with subcategories? Subcategories are reassigned to the root level (no parent).


## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow authenticated users to create custom expense and revenue categories.
- **FR-002**: System MUST allow users to create subcategories by selecting a parent category.
- **FR-003**: System MUST allow users to edit the name and parent of existing categories.
- **FR-005**: System MUST prevent users from creating duplicate category names within the same parent.

- **FR-004**: System MUST allow users to delete categories and, on delete, MUST reassign any subcategories to the root level (no parent).

- **FR-006**: System MUST display all categories and subcategories in a hierarchical structure.
- **FR-007**: System MUST prevent a category from being its own parent or creating circular references.
- **FR-008**: System MUST ensure categories are only accessible and modifiable by their owner.

### Key Entities *(include if feature involves data)*

- **Category**: Represents a user-defined expense or revenue category. Attributes: id, user_id, name, type (expense/revenue), parent_id (nullable), created_at, updated_at.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create, edit, and delete categories without errors in 95% of attempts.
- **SC-002**: 100% of categories are displayed in the correct hierarchical structure.
- **SC-003**: No duplicate category names exist within the same parent for any user.
- **SC-004**: 90% of users report satisfaction with category management in user surveys.
- **SC-005**: All category operations are restricted to the authenticated user who owns them.

## Assumptions

- Users will have a reasonable number of categories (under 100).
- Category names are unique within the same parent for each user.
- Deleting a user will cascade and delete all their categories.
