# Data Model: Category Management (CRUD)

## Entity: Category
- id: UUID (primary key)
- user_id: UUID (foreign key to User)
- name: string (required, unique per parent/user)
- type: enum ('expense', 'revenue')
- parent_id: UUID (nullable, self-referencing)
- created_at: timestamp
- updated_at: timestamp

## Relationships
- Each category belongs to one user
- Categories can have a parent (for subcategories)
- Deleting a parent reassigns subcategories to root (parent_id = null)

## Validation Rules
- Category names must be unique within the same parent for each user
- No circular parent relationships allowed
- Only the owner can access/modify categories
