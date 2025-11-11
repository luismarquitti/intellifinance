---
# Template Metadata
template_type: commit_message
generated_by: Writer Agent
workflow: wf_05_generate_pr

# Commit Standards
format: conventional_commits
scope_required: true
body_required: true
jira_reference: required
---

# Commit Message Template

## Format: Conventional Commits

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## Type

**Choose ONE**:

- `feat`: New feature for the user
- `fix`: Bug fix for the user
- `docs`: Documentation changes only
- `style`: Formatting, missing semicolons, etc. (no code change)
- `refactor`: Refactoring production code (not a fix or feature)
- `perf`: Performance improvement
- `test`: Adding or refactoring tests (no production code change)
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Updating grunt tasks, etc. (no production code change)
- `revert`: Reverts a previous commit

---

## Scope

**Required** - The scope should be the name of the component/module affected:

**Examples**:
- `auth` - Authentication/authorization
- `api` - API layer
- `ui` - User interface components
- `db` - Database layer
- `config` - Configuration
- `deps` - Dependencies
- `tests` - Test suite
- `docs` - Documentation

**Use the component name from your workspace** (auto-detected):
- React: component name (e.g., `UserProfile`, `Dashboard`)
- Services: service name (e.g., `user-service`, `payment-api`)
- Modules: module name (e.g., `authentication`, `reporting`)

---

## Subject

**Rules**:
- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period (.) at the end
- Maximum 50 characters
- Be specific but concise

**Good Examples**:
```
add OAuth2 authentication flow
fix timeout error in data fetch
refactor user profile component for readability
update installation instructions
```

**Bad Examples**:
```
Added new feature (use "add", not "Added")
Fix bug. (no period at end)
Update stuff (too vague)
```

---

## Body

**Required** - Explain WHAT and WHY (not HOW):

**Structure**:
1. **Context**: Why is this change needed?
2. **Solution**: What does this commit do?
3. **Impact**: What changes as a result?

**Guidelines**:
- Wrap at 72 characters per line
- Use bullet points for multiple items
- Separate paragraphs with blank lines
- Reference related issues/PRs if applicable

**Example**:
```
Users were unable to log in when OAuth provider was unavailable,
resulting in complete authentication failure and locked accounts.

This commit implements a fallback authentication mechanism that:
- Attempts OAuth first (primary method)
- Falls back to username/password if OAuth fails
- Logs fallback attempts for monitoring

Impact: Users can now authenticate even during OAuth outages,
improving system reliability and reducing support tickets.
```

---

## Footer

**Required**: Jira reference

**Format**:
```
Jira: HPXAPPS-XXXXX
```

**Optional Additional Footers**:
- `BREAKING CHANGE:` - Incompatible API changes
- `Closes:` - Issue numbers (GitHub/GitLab)
- `Refs:` - Related issues
- `Co-authored-by:` - Co-authors

**Example**:
```
Jira: HPXAPPS-12345
BREAKING CHANGE: Authentication API now requires OAuth2 token
Refs: HPXAPPS-12300, HPXAPPS-12344
```

---

## Complete Examples

### Example 1: Feature Addition
```
feat(auth): add OAuth2 authentication flow

Users previously could only authenticate with username/password,
limiting integration with corporate identity providers and
reducing security posture.

This commit implements OAuth2 authentication with:
- Authorization code flow for web applications
- Token refresh mechanism for long-lived sessions
- Support for multiple OAuth providers (Google, Azure AD)

Impact: Enterprise customers can now integrate with their
existing identity management systems, improving security and
user experience.

Jira: HPXAPPS-12345
```

### Example 2: Bug Fix
```
fix(api): resolve timeout in user data fetch

API requests to /api/users/{id} were timing out after 30 seconds
when user had large amounts of historical data (>10,000 records).
This caused dashboard load failures and poor user experience.

This commit optimizes the query by:
- Adding database index on user_id and created_date
- Implementing pagination for historical data
- Reducing payload size by filtering unnecessary fields

Impact: API response time reduced from 30s to <500ms,
eliminating timeout errors and improving dashboard performance.

Jira: HPXAPPS-12346
```

### Example 3: Refactoring
```
refactor(ui): simplify UserProfile component structure

UserProfile component had grown to 800 lines with mixed concerns,
making it difficult to maintain and test. Component re-renders
were causing performance issues on profile page.

This commit refactors the component by:
- Extracting sub-components (ProfileHeader, ProfileDetails, ProfileSettings)
- Moving business logic to custom hooks (useUserData, useProfileUpdate)
- Implementing React.memo to prevent unnecessary re-renders

Impact: Code is more maintainable (3 files of ~200 lines each),
test coverage improved from 45% to 85%, and page render time
reduced by 40%.

Jira: HPXAPPS-12347
```

### Example 4: Breaking Change
```
feat(api): update authentication endpoint structure

Current authentication API is inconsistent with REST standards
and lacks support for modern auth flows (OAuth, JWT refresh).
This blocks integration with third-party services.

This commit redesigns the authentication API:
- POST /auth/login now returns { access_token, refresh_token }
- New endpoint POST /auth/refresh for token renewal
- Removed deprecated /login endpoint
- Updated response codes to follow REST conventions

BREAKING CHANGE: /login endpoint removed, use /auth/login instead.
Response structure changed from { token } to { access_token, refresh_token }.
Clients must update to new endpoint and handle new response format.

Migration guide: docs/auth-migration.md

Jira: HPXAPPS-12348
Refs: HPXAPPS-12200
```

### Example 5: Documentation
```
docs(readme): update installation instructions

Installation steps were outdated after migration to Docker-based
development environment. New developers were experiencing setup
failures and inconsistent environments.

This commit updates installation documentation with:
- Docker Compose setup instructions
- Environment variable configuration guide
- Troubleshooting section for common issues
- Removed outdated manual installation steps

Impact: New developer onboarding time reduced from 4 hours to 1 hour.

Jira: HPXAPPS-12349
```

### Example 6: Test Addition
```
test(user-service): add unit tests for user creation

User creation functionality lacked test coverage (0%), making
refactoring risky and causing production bugs to slip through.

This commit adds comprehensive test coverage for user creation:
- Happy path: successful user creation
- Edge cases: duplicate email, invalid data, missing fields
- Error handling: database failures, validation errors
- Mocking: database, email service, external APIs

Impact: Test coverage for UserService increased from 0% to 92%,
preventing regression bugs during future refactoring.

Jira: HPXAPPS-12350
```

---

## 🚨 Approval Required Before Commit

**User must review and approve**:
- [ ] Commit message type is correct
- [ ] Scope accurately reflects affected component
- [ ] Subject line is clear and follows rules
- [ ] Body explains WHAT and WHY adequately
- [ ] Jira reference is correct
- [ ] User explicitly states: **"Commit these changes"** or **"Approve commit"**

**Only after explicit approval will the commit be executed.**

---

## Validation Checklist

Before committing, verify:

- [ ] Type is one of the allowed types
- [ ] Scope is present and meaningful
- [ ] Subject is imperative mood, lowercase, no period, ≤50 chars
- [ ] Body is present and explains WHAT/WHY
- [ ] Body lines wrap at 72 characters
- [ ] Footer includes Jira reference
- [ ] Breaking changes are marked with `BREAKING CHANGE:`
- [ ] All staged files are related to this commit message
- [ ] Tests pass locally
- [ ] No debugging code or commented-out code included

---

## Anti-Patterns to Avoid

**❌ Too Vague**:
```
fix: fix bug
feat: add stuff
refactor: update code
```

**❌ No Body**:
```
fix(api): resolve timeout
```

**❌ Missing Jira**:
```
feat(auth): add OAuth2 authentication

Complete OAuth2 implementation with token refresh.
```

**❌ Past Tense**:
```
fix(api): fixed timeout issue
```

**❌ Subject Too Long**:
```
feat(api): add new authentication endpoint that supports OAuth2 and JWT refresh tokens
```

**✅ Good Example**:
```
feat(auth): add OAuth2 authentication flow

Current authentication only supports username/password, limiting
enterprise integration and security options.

This commit implements OAuth2 with authorization code flow,
token refresh, and support for multiple providers.

Impact: Enterprise customers can now use corporate identity
providers, improving security and user experience.

Jira: HPXAPPS-12345
```

---

**Generated by**: Writer Agent  
**Workflow**: Phase 5 - PR Generation  
**Template Version**: 1.0  
**Standard**: Conventional Commits 1.0.0
