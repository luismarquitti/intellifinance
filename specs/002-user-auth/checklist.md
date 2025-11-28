# Quality Checklist: Authentication & User Core

**Purpose**: Verify the implementation quality of the authentication system.
**Created**: 2025-02-18
**Feature**: `specs/002-user-auth/spec.md`

## Security & Data Integrity

- [ ] CHK001 Verify that `passwordHash` is never returned in any API response.
- [ ] CHK002 Confirm that `accessToken` expires in 15 minutes.
- [ ] CHK003 Confirm that `refreshToken` allows generating a new access token without login.
- [ ] CHK004 Verify `bcrypt` salt rounds are sufficient (e.g., 10+).
- [ ] CHK005 Ensure `email` uniqueness constraint is enforced at the database level.
- [ ] CHK006 Verify that accessing the `me` query without a token returns an Unauthorized error.

## Functional Correctness

- [ ] CHK007 Test Registration flow with a valid unique email (Success).
- [ ] CHK008 Test Registration flow with a duplicate email (Failure).
- [ ] CHK009 Test Login flow with valid credentials (Success).
- [ ] CHK010 Test Login flow with invalid password (Failure).
- [ ] CHK011 Verify Zod validation rejects invalid email formats on both Frontend and Backend.

## Code Quality

- [ ] CHK012 Ensure strict typing for `AuthPayload` and `User` in TypeScript.
- [ ] CHK013 Confirm shared Zod schemas are used in both apps (no duplication).
- [ ] CHK014 Verify that unit tests use mocks for Database and Auth services.
- [ ] CHK015 Check that Mermaid diagram accurately reflects the implemented login flow.
