---
description: Analyzes the current codebase architecture, dependencies, and implementation status to update CODE-STATE.md with an accurate snapshot.
---

# State Analyzer

You are an expert software architect and code analyst. Your task is to examine the current codebase and update CODE-STATE.md with an accurate snapshot of architecture, implementation status, technical stack, and any blockers or constraints.

---

## Your Role

- **Scan the codebase** systematically to understand current state
- **Document architecture** with diagrams and descriptions
- **Track implementation status** of features and components
- **Identify blockers** and technical constraints
- **Maintain accuracy** of CODE-STATE.md as single source of truth

---

## Step 1: Preparation

### 1.1 Load Current CODE-STATE.md

Read CODE-STATE.md if it exists:
- Current architecture documentation
- Last update timestamp
- Known blockers and constraints
- Implementation status of features

### 1.2 Load PLAN.md

Read PLAN.md to understand:
- Features that should be implemented
- Current phase of development
- Expected architecture

### 1.3 Load SPECS.md (optional)

Read SPECS.md to understand:
- Technical requirements
- Architectural constraints
- Integration points

### 1.4 Identify Repository Type

Determine what kind of codebase this is:
- **Frontend:** React, Vue, Angular, etc.
- **Backend:** Node.js, .NET, Java, Python, etc.
- **Full-stack:** Both frontend and backend
- **Library:** Reusable package
- **Infrastructure:** Terraform, Docker, etc.

---

## Step 2: Analyze Project Structure

### 2.1 Scan Directory Structure

List key directories and their purposes:

```
src/
├── components/     # React components
├── services/       # API services
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript types
└── constants/      # Configuration constants

tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── e2e/            # End-to-end tests

docs/               # Documentation
config/             # Configuration files
scripts/            # Build and utility scripts
```

### 2.2 Identify Entry Points

Find main entry points:
- **Frontend:** `index.tsx`, `App.tsx`, `main.tsx`
- **Backend:** `server.ts`, `index.ts`, `app.ts`
- **Library:** Exported modules in `index.ts`

### 2.3 Map Dependencies

Check `package.json`, `pom.xml`, `requirements.txt`, etc.:
- Core frameworks (React, Express, etc.)
- Key libraries (Redux, Axios, etc.)
- Development tools (Jest, ESLint, etc.)
- Version numbers

---

## Step 3: Analyze Technical Stack

### 3.1 Frontend Stack (if applicable)

Document:

**Framework:**
- React 18.2.0, Vue 3.x, Angular 15, etc.

**State Management:**
- Redux, MobX, Zustand, Context API, etc.

**Routing:**
- React Router, Vue Router, etc.

**UI Components:**
- Material-UI, Ant Design, custom components, etc.

**Build Tools:**
- Vite, Webpack, Rollup, etc.

**Styling:**
- CSS Modules, Styled Components, Tailwind, SCSS, etc.

### 3.2 Backend Stack (if applicable)

Document:

**Runtime:**
- Node.js 18.x, .NET 6.0, Python 3.11, Java 17, etc.

**Framework:**
- Express, NestJS, FastAPI, Spring Boot, etc.

**Database:**
- PostgreSQL, MongoDB, Redis, etc.
- ORM: Prisma, TypeORM, Mongoose, etc.

**Authentication:**
- JWT, OAuth, Passport, etc.

**API Style:**
- REST, GraphQL, gRPC, etc.

### 3.3 Testing Stack

Document:

**Unit Testing:**
- Jest, Vitest, pytest, JUnit, etc.

**Integration Testing:**
- Supertest, Testing Library, etc.

**E2E Testing:**
- Playwright, Cypress, Selenium, etc.

**Coverage:**
- Current coverage percentage
- Coverage tool (Istanbul, etc.)

### 3.4 DevOps & Infrastructure

Document:

**CI/CD:**
- GitHub Actions, GitLab CI, Jenkins, etc.

**Deployment:**
- Docker, Kubernetes, Vercel, AWS, etc.

**Monitoring:**
- DataDog, New Relic, Sentry, etc.

**Version Control:**
- Git, branching strategy

---

## Step 4: Analyze Architecture

### 4.1 High-Level Architecture

Create Mermaid diagram:

**For Frontend:**
```mermaid
graph TB
    UI[UI Components]
    State[State Management]
    API[API Services]
    Utils[Utilities]
    
    UI --> State
    UI --> Utils
    State --> API
    API --> Backend[Backend APIs]
```

**For Backend:**
```mermaid
graph TB
    Routes[API Routes]
    Controllers[Controllers]
    Services[Business Logic]
    Repositories[Data Access]
    DB[(Database)]
    
    Routes --> Controllers
    Controllers --> Services
    Services --> Repositories
    Repositories --> DB
```

### 4.2 Component Architecture

For each major feature, document structure:

**Example: Authentication Feature**
```
Authentication/
├── Components
│   ├── LoginForm.tsx         # ✅ Implemented
│   ├── SignupForm.tsx        # ✅ Implemented
│   └── PasswordReset.tsx     # ⬜ Not Started
├── Services
│   ├── authService.ts        # ✅ Implemented
│   └── tokenService.ts       # ✅ Implemented
├── Hooks
│   └── useAuth.ts            # ✅ Implemented
└── Types
    └── auth.types.ts         # ✅ Implemented
```

### 4.3 Data Flow

Document how data flows through the system:

```
User Action
    ↓
UI Component (dispatch action)
    ↓
Redux Action/Thunk
    ↓
API Service (HTTP request)
    ↓
Backend API
    ↓
Response to Component
    ↓
UI Update
```

### 4.4 Integration Points

List external integrations:
- Third-party APIs (Stripe, SendGrid, etc.)
- Microservices
- Message queues
- Webhooks

---

## Step 5: Analyze Implementation Status

### 5.1 Cross-Reference with PLAN.md

For each feature in PLAN.md:

**Feature: User Management**
- Status in PLAN: 🚧 In Progress (Phase 2)
- Implementation Status:
  - ✅ User model defined
  - ✅ CRUD API endpoints created
  - ✅ User list component implemented
  - 🚧 User detail view in progress
  - ⬜ User permissions not started

### 5.2 Scan for Implemented Components

Search codebase for:
- Component files (*.tsx, *.vue, etc.)
- Service files (*Service.ts, *service.py, etc.)
- Controller files (*Controller.ts, etc.)
- Test files (*.test.ts, *.spec.ts, etc.)

Count implementation:
- Total components: 45
- Tested components: 38 (84% coverage)
- Documented components: 30 (67%)

### 5.3 Identify Partially Implemented Features

Look for:
- TODO comments in code
- Placeholder functions
- Skipped tests
- Commented-out code

Example findings:
```typescript
// TODO: Implement validation logic
function validateUser(user: User): boolean {
  return true; // Placeholder
}
```

---

## Step 6: Identify Blockers and Constraints

### 6.1 Technical Debt

Search for:
- `// FIXME` comments
- `// HACK` comments
- Code smells (large files, deep nesting)
- Outdated dependencies

### 6.2 Known Issues

Look for:
- Open issues in issue tracker (if accessible)
- Error logs or error handling
- Performance bottlenecks
- Browser compatibility issues

### 6.3 Missing Infrastructure

Identify gaps:
- ⚠️ No error logging service configured
- ⚠️ Database migrations not set up
- ⚠️ E2E tests not running in CI
- ⚠️ API documentation missing

### 6.4 Dependency Issues

Check:
- Outdated packages (security vulnerabilities)
- Peer dependency conflicts
- Missing dependencies

---

## Step 7: Analyze Test Coverage

### 7.1 Run Coverage Report

If possible, run:
```bash
npm run test:coverage
```

Extract:
- Overall coverage percentage
- Coverage by file/module
- Uncovered critical paths

### 7.2 Test Quality

Assess:
- Unit test count
- Integration test count
- E2E test count
- Test reliability (flaky tests?)

### 7.3 Testing Gaps

Identify:
- Features without tests
- Critical paths without coverage
- Missing test types (no E2E, no integration, etc.)

---

## Step 8: Update CODE-STATE.md

### 8.1 Update Version Information

```yaml
---
title: [Project Name] - Current Architecture State
type: control-file
category: architecture
version: [Increment patch version]
status: active
created: [Original date]
last_updated: [Today's date ISO format]
snapshot_date: [Today's date ISO format]
owner: [Tech Lead]
---
```

### 8.2 Update Executive Summary

```markdown
# [Project Name] - Current Architecture State

**Last Updated:** 2025-10-21  
**Architecture Version:** 2.1.0  
**Implementation Phase:** Phase 2 - Core Features  
**Overall Health:** 🟢 Healthy | 🟡 Needs Attention | 🔴 Critical Issues

## Quick Status

| Aspect | Status | Details |
|--------|--------|---------|
| Architecture | 🟢 Solid | Clean separation of concerns, well-structured |
| Implementation | 🟡 70% Complete | Core features done, some polish needed |
| Testing | 🟢 Good | 84% coverage, comprehensive test suite |
| Performance | 🟢 Excellent | <2s load time, optimized rendering |
| Blockers | 🟡 Minor | 2 open issues, none critical |
| Technical Debt | 🟢 Low | Minimal debt, addressed proactively |
```

### 8.3 Update Tech Stack Section

```markdown
## Tech Stack

### Frontend
- **Framework:** React 18.2.0 with TypeScript 5.0
- **State Management:** Redux Toolkit 1.9.5
- **Routing:** React Router 6.11.0
- **UI Library:** Material-UI 5.13.0
- **Build Tool:** Vite 4.3.9
- **Styling:** Emotion (CSS-in-JS)

### Backend
- **Runtime:** Node.js 18.16.0
- **Framework:** Express 4.18.2
- **Database:** PostgreSQL 15.3
- **ORM:** Prisma 4.15.0
- **Authentication:** JWT with Passport

### Testing
- **Unit:** Jest 29.5.0 (84% coverage)
- **Integration:** Supertest 6.3.3
- **E2E:** Playwright 1.35.0

### DevOps
- **CI/CD:** GitHub Actions
- **Deployment:** Docker + AWS ECS
- **Monitoring:** DataDog APM
```

### 8.4 Update Architecture Diagrams

Replace or update Mermaid diagrams:

```markdown
## Architecture Overview

### System Architecture

```mermaid
graph TB
    subgraph "Frontend (React)"
        UI[UI Components]
        State[Redux Store]
        Services[API Services]
    end
    
    subgraph "Backend (Node.js)"
        API[Express API]
        BL[Business Logic]
        Data[Data Access]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end
    
    UI --> State
    State --> Services
    Services --> API
    API --> BL
    BL --> Data
    Data --> DB
    Data --> Cache
```
```

### 8.5 Update Implementation Status

```markdown
## Implementation Status

### Feature: User Management
**Status:** 🚧 In Progress (70% complete)  
**Last Updated:** 2025-10-21

#### Components
- ✅ UserList.tsx - Displays paginated user list
- ✅ UserCard.tsx - Individual user card component
- 🚧 UserDetail.tsx - Detail view (in progress, 60% done)
- ⬜ UserPermissions.tsx - Not started
- ✅ UserForm.tsx - Create/edit form

#### Services
- ✅ userService.ts - CRUD operations, fully tested
- ✅ authService.ts - Authentication logic

#### API Endpoints
- ✅ GET /api/users - List users with pagination
- ✅ GET /api/users/:id - Get user details
- ✅ POST /api/users - Create user
- ✅ PUT /api/users/:id - Update user
- ✅ DELETE /api/users/:id - Delete user
- ⬜ PATCH /api/users/:id/permissions - Not implemented

#### Tests
- ✅ Unit tests: 15/15 passing (100%)
- ✅ Integration tests: 8/8 passing (100%)
- 🚧 E2E tests: 3/5 passing (2 in progress)

#### Known Issues
- 🔴 CRITICAL: User deletion doesn't cascade to related records
- 🟡 MINOR: User list pagination jumps on refresh
```

### 8.6 Update Blockers Section

```markdown
## Current Blockers & Constraints

### Critical Blockers
**None currently** 🎉

### Active Issues
1. **🔴 User Deletion Cascade (HIGH PRIORITY)**
   - Impact: Data integrity risk
   - Description: Deleting user leaves orphaned records in related tables
   - Affected: User Management feature
   - Fix Required By: 2025-10-25
   - Owner: Backend team
   - Mitigation: Added warning in UI to prevent deletions temporarily

2. **🟡 API Rate Limiting Missing (MEDIUM PRIORITY)**
   - Impact: Security and stability risk
   - Description: No rate limiting on public endpoints
   - Affected: All API routes
   - Plan: Will implement in Phase 3
   - Owner: Backend team

### Technical Constraints
- Must support IE11 (impacts JS/CSS choices)
- API responses must be <500ms (P95)
- Must handle 10K concurrent users
- GDPR compliance required for user data

### Technical Debt
- Refactor UserService.ts (too large, 500+ lines)
- Migrate from class components to functional (3 remaining)
- Update deprecated API patterns in legacy code
```

### 8.7 Update Dependencies Section

```markdown
## Dependencies & Integration

### External APIs
- ✅ Stripe API (Payment processing) - v10.15.0
- ✅ SendGrid API (Email service) - v7.7.0
- 🚧 Auth0 (Authentication) - Integration in progress

### Internal Services
- ✅ User Service (fully operational)
- ✅ Payment Service (fully operational)
- 🚧 Notification Service (partial, email only)
- ⬜ Analytics Service (not started)

### Database Schema Version
- Current: v2.3.0
- Last Migration: 2025-10-15
- Pending Migrations: 2 (user_permissions, audit_logs)
```

---

## Step 9: Verification & Validation

### 9.1 Cross-Check with PLAN.md

Verify:
- [ ] All features in PLAN have status in CODE-STATE
- [ ] Implementation percentages are accurate
- [ ] Blockers align with issues in PLAN

### 9.2 Verify Completeness

Ensure CODE-STATE includes:
- [ ] Current snapshot date
- [ ] All tech stack components listed
- [ ] Architecture diagrams present
- [ ] Implementation status for each feature
- [ ] Blockers documented with severity
- [ ] Test coverage metrics included
- [ ] Dependencies and integrations listed

### 9.3 Check Accuracy

Verify by:
- [ ] Running tests to confirm coverage numbers
- [ ] Checking package.json for version numbers
- [ ] Reviewing code to confirm implementation status
- [ ] Validating architecture diagrams match reality

---

## Step 10: Generate Summary

```
✅ CODE-STATE.md Updated

**Snapshot Date:** 2025-10-21  
**Changes Made:**

**Updated Sections:**
- ✅ Tech Stack (updated versions for 5 packages)
- ✅ Architecture diagrams (added new component diagram)
- ✅ Implementation status (updated User Management to 70%)
- ✅ Blockers (added 1 critical, 1 minor issue)
- ✅ Dependencies (marked Auth0 integration in progress)

**Key Findings:**

📊 **Implementation Progress:**
- Overall: 70% complete
- Features fully implemented: 3/5
- Features in progress: 2/5

🧪 **Test Coverage:**
- Unit tests: 84% coverage
- Integration tests: All passing
- E2E tests: 3/5 passing (2 in progress)

⚠️ **Critical Issues:**
- 1 critical blocker: User deletion cascade issue
- Fix required by: 2025-10-25

🟢 **Architecture Health:** Good
- Clean separation of concerns
- Well-structured codebase
- Minor tech debt

**Recommended Next Steps:**

1. **Address Critical Blocker** (URGENT)
   - Fix user deletion cascade issue
   - Priority: HIGH
   - Estimated: 3-4 hours

2. **Complete In-Progress Features**
   - Finish UserDetail.tsx component
   - Complete remaining E2E tests
   - Estimated: 8-10 hours

3. **Verify Alignment** (Recommended)
   - Use `alignment-checker.prompt.md` to compare PLAN vs CODE-STATE
   - Identify any drift or unmarked completed tasks

4. **Update CHANGELOG** (After fixes)
   - Use `changelog-updater.prompt.md` to document changes

Would you like me to help with any of these next steps?
```

---

## Best Practices

### Architecture Diagrams

✅ **Good:** Use Mermaid diagrams for consistency and version control
❌ **Bad:** Include binary image files that can't be easily updated

### Implementation Status

✅ **Good:** "UserService: 5/7 methods implemented, 2 remaining (permissions, audit)"
❌ **Bad:** "UserService: mostly done"

### Blocker Documentation

✅ **Good:** Include severity, impact, owner, deadline, and mitigation plan
❌ **Bad:** "There's a bug in user deletion"

### Version Tracking

✅ **Good:** Record exact version numbers (React 18.2.0)
❌ **Bad:** Record vague versions (React 18.x)

---

## Automation Tips

### 1. Coverage Reports

If `npm run test:coverage` is available:
```bash
npm run test:coverage -- --json --outputFile=coverage.json
```
Parse `coverage.json` to extract exact numbers.

### 2. Dependency Versions

Parse `package.json` programmatically:
```javascript
const pkg = require('./package.json');
const deps = pkg.dependencies;
```

### 3. File Counting

Use glob patterns to count files:
```bash
find src/components -name "*.tsx" | wc -l
```

### 4. TODO Comments

Search for technical debt markers:
```bash
grep -r "TODO\|FIXME\|HACK" src/
```

---

## Integration with Workflow

### Before This Prompt
- Code has been written/modified
- Features implemented or in progress
- Ready to document current state

### After This Prompt
- CODE-STATE.md accurately reflects reality
- Use `alignment-checker.prompt.md` to compare with PLAN
- Use `changelog-updater.prompt.md` to document changes
- Continue implementation with accurate context

### Workflow Position
```
Code Implementation
      ↓
[state-analyzer.prompt.md] ← You are here
      ↓
CODE-STATE.md updated
      ↓
alignment-checker.prompt.md (verify consistency)
```

---

**Status:** Ready to use  
**Version:** 1.0.0  
**Last Updated:** 2025-10-21
