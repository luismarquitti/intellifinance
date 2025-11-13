# 📐 Workflow 02: Plan Implementation (Phase 2: Planning)

**Purpose:** Transform requirements into detailed technical implementation plan with TDD strategy, ADR (Architectural Decision Record), and phased execution approach.

**Duration:** 20-40 minutes  
**Personas Involved:** Orchestrator → Architect (→ QA/Developer)  
**Phase:** Phase 2 (Planning)  
**Input:** Requirements document from Phase 1  
**Output:** Implementation plan with test strategy

---

## Workflow Trigger

This workflow starts when:
- Phase 1 (Analysis) approved by user
- Requirements document exists
- Orchestrator switches to Architect Agent
- User requests "plan implementation for PROJ-1234"

---

## Workflow Steps

### Step 1: Orchestrator - Phase Transition (1 min)

**Actor:** Orchestrator Agent

**Actions:**
1. Verify Phase 1 requirements exist
2. Load requirements document
3. Switch to Architect Agent
4. Provide context to Architect

**Context Handoff:**
```markdown
## Phase 2: Planning

**Previous Phase:** Analysis (Complete ✅)  
**Requirements:** `.ai/output/requirements-PROJ-1234.md`  
**Switching to:** Architect Agent

**Your Task:**
Create detailed implementation plan including:
- Code investigation findings
- Architectural decisions (ADR if significant)
- Implementation phases
- Test strategy (TDD approach)
- Risk assessment
```

---

### Step 2: Architect - Load Requirements (2-3 min)

**Actor:** Architect Agent

**Actions:**
1. Read requirements document from Phase 1
2. Extract acceptance criteria
3. Identify affected components
4. Note constraints and dependencies

**Checklist:**
```markdown
## Requirements Review

- [ ] All acceptance criteria understood
- [ ] Technical constraints identified
- [ ] Non-functional requirements noted
- [ ] Dependencies mapped
- [ ] Scope boundaries clear
```

---

### Step 3: Architect - Code Investigation (10-15 min)

**Actor:** Architect Agent

**Actions:**

#### 3.1: Locate Affected Code
```bash
# Semantic search for relevant components
semantic_search(query: "component or feature name from requirements")

# Pattern search for specific functions/classes
grep_search(
  query: "class ComponentName|function featureName",
  isRegexp: true
)

# List directory structure
list_dir(path: "src/modules/target-module")
```

#### 3.2: Read Existing Code
```bash
# Read main component
read_file(
  filePath: "src/modules/component/Main.ts",
  startLine: 1,
  endLine: 200
)

# Read related files
# - Tests (to understand current test patterns)
# - Config files
# - Type definitions
# - Related utilities
```

#### 3.3: Analyze Existing Architecture
```markdown
## Code Investigation Findings

### Current Architecture
**File:** `src/modules/auth/AuthService.ts`  
**Purpose:** [What it does]  
**Dependencies:** [What it imports]  
**Used By:** [What imports it]

### Current Test Coverage
**File:** `src/modules/auth/AuthService.test.ts`  
**Framework:** Jest  
**Coverage:** 75% (needs improvement to 90%+)  
**Patterns:** Uses mocks for HTTP client

### Identified Issues
1. [Issue found in current code]
2. [Technical debt or anti-pattern]

### Integration Points
- [External API]
- [Database]
- [Other services]
```

---

### Step 4: Architect - Make Architectural Decisions (5-10 min)

**Actor:** Architect Agent

**Actions:**

#### If Significant Design Decision Required:

Create **ADR (Architectural Decision Record)**:

```markdown
# ADR-001: Use JWT for Authentication

**Status:** Proposed  
**Date:** 2025-11-10  
**Author:** Architect Agent

---

## Context

Currently, the application uses session-based authentication with cookies. 
The requirement (PROJ-1234) asks for stateless authentication to support 
horizontal scaling and multi-region deployment.

---

## Decision

We will implement JWT (JSON Web Token) authentication to replace session-based auth.

---

## Consequences

### Positive
- ✅ Stateless authentication (no session storage)
- ✅ Horizontal scaling without sticky sessions
- ✅ Multi-region support (tokens work anywhere)
- ✅ Standard industry practice

### Negative
- ❌ Cannot invalidate individual tokens before expiry
- ❌ Slightly larger payload size vs session ID
- ❌ Requires client-side token management

### Mitigations
- Use short expiry times (15 min access, 7 day refresh)
- Implement refresh token rotation
- Add token blacklist for logout (Redis)

---

## Alternatives Considered

1. **Keep Session-Based Auth**
   - Rejected: Doesn't meet scaling requirements
   
2. **OAuth2 with External Provider**
   - Rejected: Overkill for internal app, adds external dependency

---

## Related Issues
- PROJ-1234 (this implementation)
- PROJ-5678 (future: SSO integration)
```

**Save ADR to:** `.ai/output/adr/ADR-001-jwt-authentication.md`

#### If No Major Design Decision:

Just document approach:

```markdown
## Implementation Approach

**Strategy:** Incremental enhancement of existing component

**Reasoning:**
- Existing architecture adequate for requirement
- No breaking changes needed
- Follows established patterns
- Minimizes risk
```

---

### Step 5: Architect - Define Test Strategy (5-10 min)

**Actor:** Architect Agent

**Actions:**

Create **TDD-aligned test strategy**:

```markdown
## Test Strategy

### Testing Approach
**TDD Workflow:** Red → Green → Refactor (mandatory)

### Test Levels

#### 1. Unit Tests (Primary Focus)
**Framework:** Jest (TypeScript/JavaScript)  
**Location:** `src/modules/auth/__tests__/AuthService.test.ts`  
**Coverage Target:** 90%+ for modified files  

**Test Cases to Write (QA Agent will implement):**
1. **AC1 Tests:**
   - Valid JWT token → returns user ID
   - Expired token → throws TokenExpiredError
   - Invalid signature → throws InvalidTokenError
   - Missing required claims → throws InvalidTokenError

2. **AC2 Tests:**
   - Token refresh with valid refresh token → new access token
   - Token refresh with expired refresh token → error
   - Token refresh with blacklisted token → error

3. **Edge Cases:**
   - Malformed token string → graceful error
   - Token with extra claims → ignores and validates required
   - Token from different issuer → rejects

**Mocking Strategy:**
- Mock JWT library for signature verification
- Mock Redis client for blacklist checks
- Mock time functions for expiration testing

#### 2. Integration Tests
**Framework:** Jest with Supertest  
**Location:** `src/modules/auth/__tests__/integration/auth.integration.test.ts`  

**Test Scenarios:**
1. Full login → JWT issuance → authenticated request flow
2. Token refresh flow end-to-end
3. Logout → token blacklisted → cannot use token

#### 3. E2E Tests (If UI involved)
**Framework:** Playwright  
**Location:** `e2e/auth.spec.ts`  

**Test Scenarios:**
1. User login → redirect to dashboard
2. Token expiry → auto-refresh → continue working
3. Logout → redirect to login page

### Test Data Requirements
- Valid JWT tokens (various claim combinations)
- Expired tokens
- Tokens with invalid signatures
- User fixtures with various roles

### Test Execution Order (TDD)
1. QA writes failing tests (Red phase)
2. Developer implements minimal code to pass (Green phase)
3. Developer refactors (only when green)
4. QA validates all tests pass + quality gates
```

---

### Step 6: Architect - Create Implementation Plan (10-15 min)

**Actor:** Architect Agent

**Actions:**

Break down work into **phases or tasks**:

```markdown
## Implementation Plan

### Overview
Implement JWT authentication replacing session-based auth.

**Estimated Effort:** 8-12 hours  
**Risk Level:** Medium (auth changes require careful testing)

---

### Phase Breakdown

#### Phase A: Infrastructure Setup (2 hours)
**Owner:** Developer  
**Prerequisites:** None  

**Tasks:**
1. Install dependencies:
   ```bash
   npm install jsonwebtoken @types/jsonwebtoken
   npm install --save-dev @types/supertest
   ```

2. Create JWT utility module:
   - `src/utils/jwt.ts` - Token generation, validation
   - `src/utils/__tests__/jwt.test.ts` - Unit tests (TDD)

3. Setup Redis for token blacklist:
   - Add Redis client configuration
   - Create BlacklistService

**Test Requirements (QA writes first):**
- Unit tests for JWT generation
- Unit tests for JWT validation
- Unit tests for blacklist operations

---

#### Phase B: Core Authentication Logic (4 hours)
**Owner:** Developer  
**Prerequisites:** Phase A complete + tests green  

**Tasks:**
1. Modify AuthService:
   - Replace session logic with JWT
   - Implement token generation on login
   - Implement token validation middleware

2. Add refresh token logic:
   - Generate refresh token
   - Store refresh token securely
   - Implement refresh endpoint

**Test Requirements (QA writes first):**
- Unit tests for login → JWT generation
- Unit tests for token validation middleware
- Unit tests for refresh token flow
- Edge case tests (expired, invalid, etc.)

**Acceptance Criteria Covered:**
- ✅ AC1: JWT authentication works
- ✅ AC2: Refresh tokens work

---

#### Phase C: Migration & Cleanup (2 hours)
**Owner:** Developer  
**Prerequisites:** Phase B complete + tests green  

**Tasks:**
1. Remove session-related code:
   - Remove session middleware
   - Remove session store
   - Update config

2. Update documentation:
   - API docs (new auth headers)
   - README (migration guide)

**Test Requirements:**
- Regression tests (ensure nothing broke)
- Integration tests (full auth flow)

---

#### Phase D: Validation & Documentation (2 hours)
**Owner:** QA + Writer  
**Prerequisites:** Phase C complete  

**Tasks:**
1. QA: Run full test suite
2. QA: Validate quality gates (lint, type, build, security)
3. QA: Manual testing of auth flows
4. Writer: Generate implementation summary
5. Writer: Create PR description
6. Writer: Update CHANGELOG

---

### Rollout Plan

**Development:**
1. Create feature branch: `feature/PROJ-1234-jwt-auth`
2. Implement phases A-C with TDD
3. Merge to main after PR approval

**Deployment:**
1. Deploy to staging
2. Test with staging users (3 days)
3. Deploy to production (off-peak hours)
4. Monitor error rates and performance

**Rollback Plan:**
- Revert PR if critical issues found
- Session-based auth still in git history
- Database unchanged (non-destructive change)

---

### Dependencies

**External:**
- None (JWT is self-contained)

**Internal:**
- RedisService must be deployed first
- Config changes must be applied

**Blockers:**
- None identified

---

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Token leakage | Low | High | Short expiry (15min), HTTPS only, secure storage |
| Cannot revoke tokens | Medium | Medium | Implement blacklist with Redis |
| Performance degradation | Low | Medium | Benchmark before/after, monitor in production |
| Migration issues | Medium | High | Gradual rollout, rollback plan ready |

---

### Breaking Changes

⚠️ **YES - This is a breaking change**

**Impact:**
- All API clients must update to use JWT
- Mobile apps must update authentication flow
- Third-party integrations need new auth method

**Migration Guide (For Writer to expand):**
1. Request JWT from POST /auth/login
2. Store access + refresh tokens securely
3. Include in header: `Authorization: Bearer <token>`
4. Refresh token before expiry

**Communication Plan:**
- Email to all API consumers (2 weeks notice)
- Migration guide in docs
- Deprecation period: 4 weeks (both auth methods work)

---

### Success Metrics

**Technical:**
- 90%+ test coverage on modified files
- Zero regressions in existing auth flows
- Response time < 50ms for token validation

**Business:**
- Zero authentication errors after deployment
- 100% of clients migrated within 4 weeks
- Supports 10,000 concurrent authenticated users
```

---

### Step 7: Architect - Approval Gate (STOP)

**Actor:** Architect Agent

**Actions:**

Present implementation plan to user:

```markdown
## 🚦 Phase 2: Planning Complete

**Implementation plan generated.**

---

## Summary

**Issue:** PROJ-1234 - JWT Authentication  
**Strategy:** Replace session-based auth with JWT  
**Phases:** 4 phases (A: Setup, B: Core Logic, C: Migration, D: Validation)  
**Estimated Effort:** 8-12 hours  
**Risk Level:** Medium  
**Breaking Change:** YES (migration guide prepared)

---

## Deliverables

1. **ADR:** `.ai/output/adr/ADR-001-jwt-authentication.md`
2. **Implementation Plan:** [Full plan above]
3. **Test Strategy:** TDD with 90%+ coverage target

---

## Acceptance Criteria Coverage

- ✅ AC1: JWT authentication (Phase B)
- ✅ AC2: Refresh tokens (Phase B)
- ✅ AC3: Token blacklist on logout (Phase B)

---

## Next Steps (If Approved)

1. Phase 3: QA writes failing tests for Phase A
2. Developer implements Phase A
3. Repeat for Phases B, C
4. Phase 4: Writer generates documentation

---

## 🛑 APPROVAL REQUIRED

Please review the implementation plan and respond:

1. **APPROVE** - Proceed to Phase 3 (Start TDD implementation)
2. **REVISE** - Request changes to plan
3. **QUESTION** - Need clarification on approach
4. **CANCEL** - Stop workflow

**I will NOT proceed to Phase 3 until you provide explicit approval.**

Type: `approve`, `revise`, `question`, or `cancel`
```

**Wait for user response. Do NOT proceed automatically.**

---

### Step 8: Orchestrator - Handoff to Phase 3 (1 min)

**Actor:** Orchestrator Agent

**Trigger:** User types `approve`

**Actions:**
1. Mark Phase 2 as complete ✅
2. Save implementation plan to `.ai/output/implementation-plan-PROJ-1234.md`
3. If ADR created, save to `.ai/output/adr/`
4. Switch to QA Agent (for test writing)
5. Trigger **wf_03_execute_development.md**

**Output:**
```markdown
## Phase 2: Complete ✅

**Implementation plan approved by user.**

**Saved:**
- Implementation Plan: `.ai/output/implementation-plan-PROJ-1234.md`
- ADR (if created): `.ai/output/adr/ADR-001-jwt-authentication.md`

**Next:** Phase 3 - Development Execution  
**Starting with:** QA Agent (writes tests first)  
**Workflow:** wf_03_execute_development.md
```

---

## Workflow Outputs

### Primary Outputs
- **Implementation Plan** (`.ai/output/implementation-plan-[ISSUE-KEY].md`)
- **ADR** (`.ai/output/adr/ADR-XXX-title.md`) - if applicable

### Metadata
- Phases/tasks count
- Estimated effort
- Risk level
- Breaking change flag
- Test strategy defined

---

## Success Criteria

Phase 2 is successful when:

✅ Code investigation complete (files/patterns identified)  
✅ Architectural decisions documented (ADR if significant)  
✅ Implementation broken into phases/tasks  
✅ Test strategy defined (TDD approach)  
✅ Risk assessment complete  
✅ Breaking changes identified  
✅ Plan approved by user  

---

## Failure Scenarios & Recovery

### Scenario 1: User Requests Revisions
**Recovery:**
1. Architect incorporates feedback
2. Updates implementation plan
3. Re-presents for approval (loop back to Step 7)

### Scenario 2: Missing Context from Requirements
**Recovery:**
1. Architect requests clarification
2. May loop back to Phase 1 (TPM/PO) to update requirements
3. Once clarified, update plan and re-present

### Scenario 3: Risk Too High
**Recovery:**
1. Architect flags high-risk items
2. Proposes safer alternative approach
3. May require user decision on risk acceptance
4. Updates plan with chosen approach

### Scenario 4: User Cancels
**Recovery:**
1. Save plan as draft
2. Mark workflow as cancelled
3. Preserve work for potential future use

---

## Decision Points

| Situation | Decision | Next Action |
|-----------|----------|-------------|
| Simple change (no ADR needed) | Document approach | Continue to test strategy |
| Significant design decision | Create ADR | Save ADR, then test strategy |
| Breaking change identified | Flag in plan + create migration guide | Risk assessment |
| High-risk change | Risk assessment + mitigation plan | Present for approval with risks |
| Plan approved | Proceed to Phase 3 | Trigger wf_03 |
| Revisions requested | Loop back to editing | Update plan (Step 6 again) |
| Questions raised | Answer questions | Clarify, then re-present |
| Cancelled by user | Save draft, stop | End workflow |

---

## Tools Used in This Workflow

- `semantic_search` - Find relevant code by meaning
- `grep_search` - Search code patterns
- `read_file` - Read code files for analysis
- `list_dir` - Understand directory structure
- `create_file` - Save implementation plan and ADR
- `list_code_usages` - Find references to functions/classes

---

## Integration with Other Workflows

**Triggered by:**
- **wf_01_triage_issue.md** (Phase 1 approval)

**Outputs to:**
- **wf_03_execute_development.md** (if approved)

**Inputs:**
- Requirements document from Phase 1

---

## Example: Complete Flow

```
Phase 1 Approved (wf_01 complete)
    ↓
Orchestrator: Switches to Architect
    ↓
Architect: Reads requirements-PROJ-1234.md
    ↓
Architect: Semantic search for "AuthService"
    ↓
Architect: Reads src/modules/auth/AuthService.ts
    ↓
Architect: Creates ADR-001 (JWT decision)
    ↓
Architect: Defines test strategy (90% coverage, TDD)
    ↓
Architect: Breaks work into 4 phases (A-D)
    ↓
Architect: Risk assessment (Medium risk, mitigations planned)
    ↓
Architect: Presents plan with APPROVAL GATE 🛑
    ↓
User: "approve"
    ↓
Orchestrator: Saves plan, switches to QA
    ↓
Triggers: wf_03_execute_development.md (Phase 3)
```

---

**Remember:** This is Phase 2 ONLY. Do not proceed to Phase 3 (implementation) without explicit user approval. The approval gate ensures the technical approach is sound before investing time in development.
