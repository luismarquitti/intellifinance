# ⚙️ Workflow 03: Execute Development (Phase 3: Implementation)

**Purpose:** TDD-based implementation cycle. QA writes failing tests, Developer implements minimal code to pass tests, QA validates. This is the RED-GREEN-REFACTOR cycle in action.

**Duration:** Varies by implementation complexity (2-20+ hours)  
**Personas Involved:** Orchestrator → QA → Developer → QA (cycle)  
**Phase:** Phase 3 (Implementation)  
**Input:** Implementation plan from Phase 2  
**Output:** Working, tested implementation

---

## Workflow Trigger

This workflow starts when:
- Phase 2 (Planning) approved by user
- Implementation plan exists
- Orchestrator switches to QA Agent (test-first)
- User requests "implement PROJ-1234"

---

## TDD Cycle Overview

```
Phase 3 Start
    ↓
QA: Write failing tests (RED) ←──────────┐
    ↓                                     │
Developer: Minimal implementation (GREEN) │
    ↓                                     │
Developer: Refactor (only when green)     │
    ↓                                     │
QA: Validate (tests + quality gates)      │
    ↓                                     │
IF more phases/tasks → LOOP BACK ─────────┘
    ↓
Phase 3 Complete → Phase 4
```

**CRITICAL:** Tests are ALWAYS written BEFORE implementation code.

---

## Workflow Steps

### Step 1: Orchestrator - Phase Transition (1 min)

**Actor:** Orchestrator Agent

**Actions:**
1. Verify Phase 2 plan exists
2. Load implementation plan
3. Identify first phase/task
4. Switch to QA Agent (test-first)

**Context Handoff:**
```markdown
## Phase 3: Implementation

**Previous Phase:** Planning (Complete ✅)  
**Implementation Plan:** `.ai/output/implementation-plan-PROJ-1234.md`  
**Starting with:** Phase A (from plan)  
**Switching to:** QA Agent

**Your Task:**
Write failing tests for Phase A according to test strategy.
Follow TDD RED phase.
```

---

### Step 2: QA - Write Failing Tests (RED Phase) (15-30 min)

**Actor:** QA Agent

**Actions:**

#### 2.1: Review Test Strategy
```bash
# Read implementation plan test strategy section
read_file(
  filePath: ".ai/output/implementation-plan-PROJ-1234.md",
  startLine: [test strategy section start],
  endLine: [test strategy section end]
)
```

#### 2.2: Create Test File Structure
```typescript
// Example: src/utils/__tests__/jwt.test.ts

import { generateToken, validateToken } from '../jwt';

describe('JWT Utils', () => {
  describe('generateToken', () => {
    // Tests will be written here
  });

  describe('validateToken', () => {
    // Tests will be written here
  });
});
```

#### 2.3: Write Failing Tests (AAA Pattern)

**For each acceptance criterion:**

```typescript
// Test for AC1: Valid JWT generation
it('should generate valid JWT with user ID in subject claim', () => {
  // ARRANGE
  const userId = 'user-123';
  const secret = 'test-secret';
  
  // ACT
  const token = generateToken(userId, secret);
  
  // ASSERT
  expect(token).toBeDefined();
  expect(typeof token).toBe('string');
  expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
});

// Test for AC2: Token validation success
it('should validate token and return user ID', () => {
  // ARRANGE
  const userId = 'user-123';
  const secret = 'test-secret';
  const token = 'mock-valid-token'; // Will be real after implementation
  
  // ACT
  const result = validateToken(token, secret);
  
  // ASSERT
  expect(result.userId).toBe(userId);
  expect(result.valid).toBe(true);
});

// Test for AC3: Expired token handling
it('should throw TokenExpiredError for expired token', () => {
  // ARRANGE
  const expiredToken = 'mock-expired-token';
  const secret = 'test-secret';
  
  // ACT & ASSERT
  expect(() => validateToken(expiredToken, secret))
    .toThrow(TokenExpiredError);
  expect(() => validateToken(expiredToken, secret))
    .toThrow('Token has expired');
});

// Test for Edge Case: Malformed token
it('should throw InvalidTokenError for malformed token', () => {
  // ARRANGE
  const malformedToken = 'not-a-jwt-token';
  const secret = 'test-secret';
  
  // ACT & ASSERT
  expect(() => validateToken(malformedToken, secret))
    .toThrow(InvalidTokenError);
});
```

#### 2.4: Setup Test Infrastructure

**Mocks and fixtures:**

```typescript
// src/utils/__tests__/fixtures/tokens.ts
export const validTokenPayload = {
  sub: 'user-123',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 900 // 15 minutes
};

export const expiredTokenPayload = {
  sub: 'user-456',
  iat: Math.floor(Date.now() / 1000) - 1000,
  exp: Math.floor(Date.now() / 1000) - 100 // Expired
};

// Mock JWT library
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));
```

#### 2.5: Verify Tests Fail (RED)

```bash
# Run tests (they MUST fail)
npm test -- jwt.test.ts

# Expected output:
# FAIL src/utils/__tests__/jwt.test.ts
#   ✕ should generate valid JWT with user ID
#   ✕ should validate token and return user ID
#   ...
# Tests: 4 failed, 4 total
```

**Critical Check:**
```markdown
## RED Phase Verification

- [ ] All tests fail with correct error messages
- [ ] Tests fail because implementation doesn't exist (not test errors)
- [ ] Test structure is clear (AAA pattern)
- [ ] Tests cover all acceptance criteria
- [ ] Edge cases included
```

**If tests don't fail properly → Fix tests, don't write implementation yet!**

---

### Step 3: QA - Handoff to Developer (STOP)

**Actor:** QA Agent

**Actions:**

Present test suite to Developer:

```markdown
## 🧪 Tests Written (RED Phase Complete)

**Phase/Task:** Phase A - JWT Utils  
**Test File:** `src/utils/__tests__/jwt.test.ts`  
**Test Count:** 12 tests written  
**Status:** 🔴 All failing (as expected)

---

## Test Summary

### Acceptance Criteria Coverage
- ✅ AC1: Valid token generation (3 tests)
- ✅ AC2: Token validation (4 tests)
- ✅ AC3: Error handling (3 tests)
- ✅ Edge cases (2 tests)

### Test Execution Result
```bash
$ npm test -- jwt.test.ts

FAIL src/utils/__tests__/jwt.test.ts
  JWT Utils
    generateToken
      ✕ should generate valid JWT with user ID (2 ms)
      ✕ should include expiry time
      ✕ should include issued at time
    validateToken
      ✕ should validate token and return user ID
      ✕ should throw TokenExpiredError for expired token
      ✕ should throw InvalidTokenError for invalid signature
      ...

Tests: 12 failed, 0 passed, 12 total
Time: 0.5s
```

**All tests failing with:**
- `ReferenceError: generateToken is not defined`
- `ReferenceError: validateToken is not defined`

**This is CORRECT - implementation doesn't exist yet.**

---

## Handoff to Developer

**Task:** Implement ONLY enough code to make these tests pass.

**Rules:**
- ✅ Minimal implementation (just enough to turn tests green)
- ✅ Follow test specifications exactly
- ❌ Do NOT add features not covered by tests
- ❌ Do NOT refactor until tests are green

**Next:** Developer implements, then hands back to QA for validation.
```

---

### Step 4: Orchestrator - Switch to Developer

**Actor:** Orchestrator Agent

**Actions:**
1. Verify tests exist and fail
2. Switch to Developer Agent
3. Provide test file location

**Context Handoff:**
```markdown
## Developer: Implement to Pass Tests

**Test File:** `src/utils/__tests__/jwt.test.ts`  
**Implementation File:** `src/utils/jwt.ts` (to be created)  
**Goal:** Make all 12 tests pass with minimal code

**Remember:**
- RED phase complete (tests failing)
- Your job: GREEN phase (make tests pass)
- Then: REFACTOR phase (clean up code)
- Stay focused on test requirements only
```

---

### Step 5: Developer - Implement Minimal Code (GREEN Phase) (30-60 min)

**Actor:** Developer Agent

**Actions:**

#### 5.1: Create Implementation Scaffold

```typescript
// src/utils/jwt.ts

import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a user.
 * @param userId - User identifier to include in token
 * @param secret - Secret key for signing
 * @returns JWT token string
 */
export function generateToken(userId: string, secret: string): string {
  // Implementation to make tests pass
}

/**
 * Validates a JWT token and extracts user information.
 * @param token - JWT token string
 * @param secret - Secret key for verification
 * @returns Decoded token payload
 * @throws TokenExpiredError if token has expired
 * @throws InvalidTokenError if token is invalid
 */
export function validateToken(
  token: string, 
  secret: string
): { userId: string; valid: boolean } {
  // Implementation to make tests pass
}

// Custom error classes
export class TokenExpiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenExpiredError';
  }
}

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
```

#### 5.2: Implement to Pass Tests (Minimal)

```typescript
export function generateToken(userId: string, secret: string): string {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 900, // 15 min
  };
  
  return jwt.sign(payload, secret);
}

export function validateToken(
  token: string,
  secret: string
): { userId: string; valid: boolean } {
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    
    return {
      userId: decoded.sub as string,
      valid: true,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredError('Token has expired');
    }
    throw new InvalidTokenError('Invalid token');
  }
}
```

#### 5.3: Run Tests (Should Pass)

```bash
# Run tests
npm test -- jwt.test.ts

# Expected output:
# PASS src/utils/__tests__/jwt.test.ts
#   ✓ should generate valid JWT with user ID (5 ms)
#   ✓ should validate token and return user ID (3 ms)
#   ...
# Tests: 12 passed, 12 total
```

**If tests still failing:**
- Read test failure messages
- Implement ONLY what's needed to pass
- Don't add extra features

---

### Step 6: Developer - Refactor (Only When Green) (15-30 min)

**Actor:** Developer Agent

**Actions (ONLY if all tests pass):**

#### 6.1: Identify Refactoring Opportunities

```markdown
## Refactoring Checklist

- [ ] Extract magic numbers to constants
- [ ] Add type safety improvements
- [ ] Improve error messages
- [ ] Add JSDoc comments
- [ ] Extract complex logic to helper functions
- [ ] Remove code duplication
```

#### 6.2: Refactor (Keep Tests Green)

```typescript
// src/utils/jwt.ts (refactored)

import jwt from 'jsonwebtoken';

// Constants (magic numbers extracted)
const TOKEN_EXPIRY_SECONDS = 900; // 15 minutes

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export function generateToken(userId: string, secret: string): string {
  if (!userId) {
    throw new InvalidTokenError('User ID is required');
  }
  
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    sub: userId,
    iat: now,
    exp: now + TOKEN_EXPIRY_SECONDS,
  };
  
  return jwt.sign(payload, secret);
}

export function validateToken(
  token: string,
  secret: string
): { userId: string; valid: boolean } {
  if (!token) {
    throw new InvalidTokenError('Token is required');
  }
  
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    
    if (!decoded.sub) {
      throw new InvalidTokenError('Token missing subject claim');
    }
    
    return {
      userId: decoded.sub,
      valid: true,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredError('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new InvalidTokenError(`Invalid token: ${error.message}`);
    }
    throw error;
  }
}

export class TokenExpiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenExpiredError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTokenError';
    Error.captureStackTrace(this, this.constructor);
  }
}
```

#### 6.3: Run Tests Again (Must Still Pass)

```bash
npm test -- jwt.test.ts
# PASS - All tests still green after refactoring
```

**If tests fail after refactoring:**
- Revert refactoring
- Identify what broke
- Fix and re-run tests

---

### Step 7: Developer - Handoff to QA (STOP)

**Actor:** Developer Agent

**Actions:**

Present implementation to QA:

```markdown
## ✅ Implementation Complete (GREEN Phase)

**Phase/Task:** Phase A - JWT Utils  
**Implementation File:** `src/utils/jwt.ts`  
**Test Status:** 🟢 All 12 tests passing

---

## Implementation Summary

### Files Created/Modified
- ✅ Created: `src/utils/jwt.ts` (85 lines)
- ✅ Created: `src/utils/__tests__/jwt.test.ts` (already existed)
- ✅ Updated: `package.json` (added jsonwebtoken dependency)

### Test Results
```bash
$ npm test -- jwt.test.ts

PASS src/utils/__tests__/jwt.test.ts
  JWT Utils
    generateToken
      ✓ should generate valid JWT with user ID (5 ms)
      ✓ should include expiry time (2 ms)
      ✓ should include issued at time (3 ms)
    validateToken
      ✓ should validate token and return user ID (4 ms)
      ✓ should throw TokenExpiredError for expired token (3 ms)
      ✓ should throw InvalidTokenError for invalid signature (2 ms)
      ...

Tests: 12 passed, 12 total
Time: 0.8s
```

---

## Refactoring Applied
- Extracted magic number TOKEN_EXPIRY_SECONDS
- Added input validation
- Improved error messages
- Added type safety (TokenPayload interface)
- Improved error handling specificity

---

## Handoff to QA

**Task:** Validate implementation meets all quality gates.

**Validation Required:**
- ✅ All tests pass
- ⏳ Linting (pending QA check)
- ⏳ Type checking (pending QA check)
- ⏳ Coverage ≥90% (pending QA check)
- ⏳ Build successful (pending QA check)

**Next:** QA runs quality gates and validates acceptance criteria.
```

---

### Step 8: Orchestrator - Switch to QA for Validation

**Actor:** Orchestrator Agent

**Actions:**
1. Verify implementation complete
2. Switch to QA Agent (validation role)
3. Trigger quality gate checks

**Context Handoff:**
```markdown
## QA: Validate Implementation

**Implementation:** Phase A complete  
**Test Status:** All passing  
**Your Task:** Run quality gates and validate acceptance criteria

**Use:** wf_04_validate_changes.md for detailed validation workflow
```

---

### Step 9: QA - Validate (Use wf_04)

**Actor:** QA Agent

**Actions:**

**This step is detailed in `wf_04_validate_changes.md`.**

**Quick summary:**
1. Run all tests (unit, integration, E2E)
2. Check coverage (≥90% modified, ≥80% overall)
3. Run lint
4. Run type check
5. Run build
6. Run security scan
7. Validate acceptance criteria
8. Check for regressions
9. Generate validation report
10. APPROVE ✅ / REJECT ❌ / ESCALATE ⚠️

---

### Step 10: Decision Point - More Phases? (1 min)

**Actor:** Orchestrator Agent

**Trigger:** QA approves Phase A

**Actions:**

Check implementation plan:

```markdown
## Phase A: Complete ✅

**Validation:** Passed all quality gates  
**Coverage:** 95% (target: 90%+)

---

## Next Phase Check

**Implementation Plan phases:**
- ✅ Phase A: Infrastructure Setup (COMPLETE)
- ⏳ Phase B: Core Authentication Logic (NEXT)
- ⏳ Phase C: Migration & Cleanup
- ⏳ Phase D: Validation & Documentation

**Decision:** More phases remain → Loop back to Step 2

**Switching to:** QA Agent (write tests for Phase B)
```

**Loop back to Step 2** for next phase (QA writes tests for Phase B).

---

### Step 11: All Phases Complete - Phase 3 Done

**Actor:** Orchestrator Agent

**Trigger:** All implementation plan phases complete

**Actions:**

```markdown
## 🎉 Phase 3: Implementation Complete

**All phases executed:**
- ✅ Phase A: Infrastructure Setup
- ✅ Phase B: Core Authentication Logic
- ✅ Phase C: Migration & Cleanup
- ✅ Phase D: Validation & Documentation (QA part)

**Test Summary:**
- Unit Tests: 48 passed
- Integration Tests: 12 passed
- Coverage: 92% overall
- Quality Gates: All passed ✅

---

## Next Phase

**Proceeding to:** Phase 4 - Documentation & Handoff  
**Switching to:** Writer Agent  
**Workflow:** wf_05_generate_pr.md
```

---

## Workflow Outputs

### Primary Outputs
- Implemented code (production files)
- Test files (comprehensive test suite)
- All tests passing (100%)
- Quality gates passed

### Metadata
- Lines of code written
- Test count
- Coverage percentage
- Quality gate results

---

## Success Criteria

Phase 3 is successful when:

✅ All tests written BEFORE implementation (TDD RED)  
✅ Implementation passes all tests (TDD GREEN)  
✅ Code refactored for quality (TDD REFACTOR)  
✅ All quality gates passed (lint, type, build, security)  
✅ Coverage ≥90% for modified files  
✅ All acceptance criteria validated  
✅ Zero regressions in existing tests  
✅ All implementation plan phases complete  

---

## Failure Scenarios & Recovery

### Scenario 1: Tests Don't Fail Initially (RED phase issue)
**Recovery:**
1. QA reviews tests - ensure they actually test something
2. Fix tests to fail properly
3. Re-run to verify RED phase
4. Only then hand to Developer

### Scenario 2: Developer Can't Make Tests Pass
**Recovery:**
1. Developer requests clarification from QA
2. May indicate test is too strict or unclear
3. QA and Developer discuss, adjust tests if needed
4. Re-run TDD cycle

### Scenario 3: Quality Gates Fail
**Recovery:**
1. QA rejects implementation
2. Developer fixes issues (lint, types, etc.)
3. Re-run quality gates
4. Loop until gates pass

### Scenario 4: Regression Detected
**Recovery:**
1. QA rejects implementation
2. Developer investigates broken tests
3. Fix implementation to not break existing functionality
4. Re-validate

---

## Tools Used in This Workflow

- `create_file` - Create test files and implementation files
- `replace_string_in_file` - Modify existing code
- `run_in_terminal` - Run tests, lint, build commands
- `get_terminal_output` - Check command results
- `get_errors` - See linting/type errors
- `read_file` - Read test specifications

---

## Integration with Other Workflows

**Triggered by:**
- **wf_02_plan_implementation.md** (Phase 2 approval)

**Triggers:**
- **wf_04_validate_changes.md** (after each phase implementation)
- **wf_05_generate_pr.md** (after all phases complete)

**Loops back to:**
- **Step 2** (QA writes tests for next phase)

---

**Remember:** TDD is NON-NEGOTIABLE. Tests MUST be written before implementation code. This workflow enforces that discipline through the RED-GREEN-REFACTOR cycle with persona handoffs.
