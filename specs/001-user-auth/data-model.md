# Data Model: User Authentication

This document outlines the data models for the User Authentication feature, based on the entities defined in the feature specification.

## Entities

### User

Represents an individual with access to the system.

-   **Fields**:
    -   `id`: `UUID` (Primary Key)
    -   `email`: `String` (Unique, Indexed)
    -   `password`: `String` (Hashed)
    -   `createdAt`: `Timestamp`
    -   `updatedAt`: `Timestamp`
-   **Validation Rules**:
    -   `email` must be a valid email format.
    -   `password` must meet the defined strength requirements.

### Refresh Token

Represents a credential used to obtain new access tokens.

-   **Fields**:
    -   `id`: `UUID` (Primary Key)
    -   `userId`: `UUID` (Foreign Key to User, Indexed)
    -   `token`: `String` (Hashed)
    -   `expiresAt`: `Timestamp`
-   **Relationships**:
    -   Belongs to a `User`.
