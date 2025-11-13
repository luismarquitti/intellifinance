# ✔️ Workflow 04: Validate Changes (QA Validation Subprocess)

**Purpose:** Comprehensive validation of implementation through automated quality gates and acceptance criteria verification. This workflow is called by wf_03 after each phase implementation.

**Duration:** 10-20 minutes  
**Personas Involved:** QA Agent  
**Phase:** Phase 3 (Implementation) - Validation Step  
**Input:** Implemented code + passing tests  
**Output:** Validation report with APPROVE/REJECT/ESCALATE decision

---

## Workflow Trigger

This workflow is triggered:
- After Developer completes implementation (GREEN phase)
- From wf_03_execute_development.md Step 9
- Before proceeding to next phase or Phase 4
- Developer hands off to QA for validation

---

## Validation Steps

### Step 1: Run Complete Test Suite (5-10 min)

**Actor:** QA Agent

**Actions:**

#### 1.1: Run All Tests

```bash
# Run full test suite
npm test

# Or for specific frameworks:
# Python: pytest
# Java: mvn test
# C#: dotnet test
# Go: go test ./...
# Ruby: rspec
```

**Expected Output:**
```
Test Suites: 15 passed, 15 total
Tests:       148 passed, 148 total
Time:        12.5s
```

**Check:**
- [ ] All tests pass (100%)
- [ ] No skipped tests
- [ ] No failing tests
- [ ] Test execution time reasonable

---

#### 1.2: Check Test Coverage

```bash
# Generate coverage report
npm test -- --coverage

# Or for specific frameworks:
# Python: pytest --cov
# Java: mvn test jacoco:report
# C#: dotnet test /p:CollectCoverage=true
# Go: go test -cover ./...
```

**Coverage Targets:**
- **Modified files:** ≥90% coverage
- **Overall project:** ≥80% coverage
- **Critical paths:** 100% coverage

**Check:**
```markdown
## Coverage Report

### Modified Files
- `src/utils/jwt.ts`: 95% ✅ (target: 90%+)
- `src/modules/auth/AuthService.ts`: 92% ✅ (target: 90%+)

### Overall
- Statements: 85% ✅ (target: 80%+)
- Branches: 82% ✅ (target: 80%+)
- Functions: 88% ✅ (target: 80%+)
- Lines: 85% ✅ (target: 80%+)

**Status:** Coverage targets met ✅
```

**If coverage below target:**
```markdown
❌ Coverage below target

**Missing coverage:**
- `src/utils/jwt.ts` line 45-52 (error handling)
- `src/modules/auth/AuthService.ts` line 120-125 (edge case)

**Action Required:** Developer must add tests for uncovered code.
**Decision:** REJECT - return to Developer
```

---

### Step 2: Run Linting (2-3 min)

**Actor:** QA Agent

**Actions:**

```bash
# Run linter
npm run lint

# Or for specific frameworks:
# Python: flake8 . && black --check .
# Java: mvn checkstyle:check
# C#: dotnet format --verify-no-changes
# Go: golangci-lint run
# Ruby: rubocop
```

**Expected Output:**
```
✔ No linting errors found
```

**Check:**
- [ ] Zero linting errors
- [ ] Zero linting warnings (or acceptable exceptions)
- [ ] Code style consistent

**If linting fails:**
```markdown
❌ Linting failed

**Errors found:**
- src/utils/jwt.ts:45:10 - Missing semicolon
- src/modules/auth/AuthService.ts:120:5 - Unused variable 'temp'

**Action Required:** Developer must fix linting errors.
**Decision:** REJECT - return to Developer

**Fix command:** npm run lint -- --fix (for auto-fixable issues)
```

---

### Step 3: Run Type Checking (2-3 min)

**Actor:** QA Agent

**Actions:**

```bash
# TypeScript
tsc --noEmit

# Python
mypy src/

# Java (implicit in compile)
mvn compile

# C#
dotnet build --no-incremental

# Go
go build ./...
```

**Expected Output:**
```
No type errors found
```

**Check:**
- [ ] Zero type errors
- [ ] All imports resolve
- [ ] Type annotations correct

**If type checking fails:**
```markdown
❌ Type check failed

**Errors found:**
- src/utils/jwt.ts:45:10 - Type 'string | undefined' is not assignable to type 'string'
- src/modules/auth/AuthService.ts:120 - Property 'userId' does not exist on type '{}'

**Action Required:** Developer must fix type errors.
**Decision:** REJECT - return to Developer
```

---

### Step 4: Run Build (3-5 min)

**Actor:** QA Agent

**Actions:**

```bash
# Build project
npm run build

# Or for specific frameworks:
# Python: python -m build
# Java: mvn package
# C#: dotnet publish -c Release
# Go: go build -o bin/app ./cmd/app
# Ruby: bundle install && rake build
```

**Expected Output:**
```
Build successful
Output: dist/
Time: 15.3s
```

**Check:**
- [ ] Build completes without errors
- [ ] Build artifacts generated
- [ ] No warnings (or acceptable exceptions)
- [ ] Build size reasonable

**If build fails:**
```markdown
❌ Build failed

**Error:**
```
ERROR in src/modules/auth/AuthService.ts
Module not found: Can't resolve 'jsonwebtoken'
```

**Action Required:** Developer must fix build errors (likely missing dependency).
**Decision:** REJECT - return to Developer
```

---

### Step 5: Run Security Scan (3-5 min)

**Actor:** QA Agent

**Actions:**

```bash
# npm audit (JavaScript/TypeScript)
npm audit --audit-level=moderate

# Python
safety check
pip-audit

# Java
mvn dependency-check:check

# C#
dotnet list package --vulnerable

# Go
govulncheck ./...

# Ruby
bundle audit
```

**Expected Output:**
```
No vulnerabilities found
```

**Check:**
- [ ] No high/critical vulnerabilities
- [ ] No medium vulnerabilities in production dependencies
- [ ] All dependencies up to date (or exceptions documented)

**If vulnerabilities found:**
```markdown
⚠️ Security vulnerabilities detected

**Critical Vulnerabilities:** 0 ✅  
**High Vulnerabilities:** 0 ✅  
**Medium Vulnerabilities:** 2 ⚠️

### Medium Vulnerabilities
1. **jsonwebtoken 8.5.1**
   - CVE-2022-23529: Token validation bypass
   - Severity: Medium
   - Fix: Upgrade to 9.0.0+
   - Impact: Production dependency

2. **axios 0.21.1**
   - CVE-2021-3749: Regex DoS
   - Severity: Medium
   - Fix: Upgrade to 0.21.2+
   - Impact: Development dependency only

**Decision:** ESCALATE to user
- Critical/High: Auto-reject
- Medium in prod deps: User decision required
- Medium in dev deps: Acceptable (can proceed)
```

---

### Step 6: Run Performance Benchmarks (If Applicable) (5-10 min)

**Actor:** QA Agent

**Actions (only if NFRs specified in requirements):**

```bash
# Run performance tests
npm run test:perf

# Or custom benchmarks
node scripts/benchmark.js
```

**Example NFR from Requirements:**
```markdown
## Non-Functional Requirements
**Performance:** Token validation must complete in < 50ms (p95)
```

**Check:**
```markdown
## Performance Validation

**Requirement:** Token validation < 50ms (p95)

**Benchmark Results:**
- p50: 12ms ✅
- p95: 35ms ✅ (target: <50ms)
- p99: 48ms ✅

**Status:** Performance targets met ✅
```

**If performance fails:**
```markdown
❌ Performance below target

**Requirement:** Token validation < 50ms (p95)

**Actual Results:**
- p50: 45ms
- p95: 85ms ❌ (target: <50ms)
- p99: 120ms ❌

**Action Required:** Developer must optimize implementation.
**Decision:** REJECT - return to Developer with profiling data
```

---

### Step 7: Validate Acceptance Criteria (5-10 min)

**Actor:** QA Agent

**Actions:**

#### 7.1: Load Requirements

```bash
# Read requirements from Phase 1
read_file(
  filePath: ".ai/output/requirements-PROJ-1234.md",
  startLine: [AC section start],
  endLine: [AC section end]
)
```

#### 7.2: Systematic AC Validation

For each acceptance criterion, verify implementation:

```markdown
## Acceptance Criteria Validation

### AC1: Valid JWT token generation
**Given** a user logs in with valid credentials  
**When** authentication succeeds  
**Then** a JWT token is generated  
**And** the token includes user ID in subject claim  
**And** the token expires in 15 minutes  

**Validation:**
- ✅ Test exists: `should generate valid JWT with user ID`
- ✅ Test passes: Yes
- ✅ Manual verification: Token includes `sub` claim
- ✅ Manual verification: Token has 15min expiry

**Status:** ✅ PASS

---

### AC2: Token refresh flow
**Given** a user has a valid refresh token  
**When** they request a new access token  
**Then** a new access token is issued  
**And** the refresh token remains valid  

**Validation:**
- ✅ Test exists: `should refresh access token with valid refresh token`
- ✅ Test passes: Yes
- ✅ Manual verification: New token issued
- ✅ Manual verification: Refresh token not consumed

**Status:** ✅ PASS

---

### AC3: Expired token handling
**Given** a user presents an expired token  
**When** they make an authenticated request  
**Then** they receive a 401 Unauthorized error  
**And** the error message indicates token expiration  

**Validation:**
- ✅ Test exists: `should throw TokenExpiredError for expired token`
- ✅ Test passes: Yes
- ✅ Manual verification: 401 status code returned
- ✅ Manual verification: Error message clear

**Status:** ✅ PASS

---

## Summary
**Total ACs:** 3  
**Passed:** 3 ✅  
**Failed:** 0  
**Not Implemented:** 0  

**Overall:** All acceptance criteria met ✅
```

**If AC not met:**
```markdown
### AC2: Token refresh flow
**Status:** ❌ FAIL

**Issue:** Refresh token is consumed after use (should remain valid for multiple refreshes)

**Evidence:**
- Test: `should refresh access token with valid refresh token`
- Result: ❌ Fails on second refresh attempt
- Error: "Invalid refresh token" after first use

**Action Required:** Developer must fix refresh token logic (should not be single-use).
**Decision:** REJECT - return to Developer
```

---

### Step 8: Check for Regressions (3-5 min)

**Actor:** QA Agent

**Actions:**

#### 8.1: Compare Test Results

```bash
# Run full test suite and save results
npm test -- --json > test-results-new.json

# Compare with baseline (if exists)
diff test-results-baseline.json test-results-new.json
```

**Check:**
```markdown
## Regression Analysis

### Test Count Comparison
- Baseline: 136 tests
- Current: 148 tests (+12 new tests) ✅

### Test Status Comparison
- Previously passing: 136 tests
- Still passing: 136 tests ✅
- New tests: 12 tests (all passing) ✅

**Regressions:** 0 ✅

**Status:** No regressions detected ✅
```

**If regressions found:**
```markdown
❌ Regressions detected

**Previously passing tests now failing:**
1. `src/modules/user/__tests__/UserService.test.ts`
   - Test: "should retrieve user by ID"
   - Error: "Expected 200, received 401"
   - Cause: New auth requirements broke existing user retrieval

2. `src/modules/admin/__tests__/AdminPanel.test.ts`
   - Test: "should render admin dashboard"
   - Error: "Cannot read property 'token' of undefined"
   - Cause: Component expects token in different format

**Action Required:** Developer must fix regressions (implementation broke existing functionality).
**Decision:** REJECT - return to Developer
```

---

### Step 9: Generate Validation Report (2-3 min)

**Actor:** QA Agent

**Actions:**

Compile comprehensive validation report:

```markdown
# Validation Report

**Issue:** PROJ-1234 - JWT Authentication  
**Phase:** Phase A - Infrastructure Setup  
**Date:** 2025-11-10  
**Validator:** QA Agent

---

## Summary

**Overall Status:** ✅ APPROVED

All quality gates passed. Implementation meets acceptance criteria. Ready to proceed.

---

## Test Execution

**Suite:** Full test suite  
**Total Tests:** 148  
**Passed:** 148 ✅  
**Failed:** 0 ✅  
**Skipped:** 0 ✅  
**Duration:** 12.5s  

**Coverage:**
- Modified files: 95% ✅ (target: 90%+)
- Overall: 85% ✅ (target: 80%+)

---

## Quality Gates

| Gate | Status | Details |
|------|--------|---------|
| Tests | ✅ PASS | 148/148 passing |
| Coverage | ✅ PASS | 95% modified, 85% overall |
| Linting | ✅ PASS | Zero errors |
| Type Check | ✅ PASS | Zero type errors |
| Build | ✅ PASS | Build successful (15.3s) |
| Security | ✅ PASS | No high/critical vulnerabilities |
| Performance | ✅ PASS | p95: 35ms (target: <50ms) |

---

## Acceptance Criteria

| AC | Description | Status |
|----|-------------|--------|
| AC1 | Valid JWT generation | ✅ PASS |
| AC2 | Token refresh flow | ✅ PASS |
| AC3 | Expired token handling | ✅ PASS |

**Result:** 3/3 acceptance criteria met ✅

---

## Regression Analysis

**Baseline Tests:** 136  
**Current Tests:** 148 (+12 new)  
**Regressions:** 0 ✅

---

## Files Modified

### Production Code
- `src/utils/jwt.ts` - Created (85 lines, 95% coverage)
- `src/modules/auth/AuthService.ts` - Modified (45 lines changed, 92% coverage)

### Test Code
- `src/utils/__tests__/jwt.test.ts` - Created (12 tests)
- `src/modules/auth/__tests__/AuthService.test.ts` - Modified (8 tests added)

---

## Issues Found

None.

---

## Recommendations

1. Consider adding integration test for full login → token → auth flow
2. Document token expiry configuration in README
3. Add monitoring for token validation performance in production

---

## Decision

✅ **APPROVED**

Implementation meets all quality standards and acceptance criteria. Ready to proceed to next phase or Phase 4.

**Next Steps:**
- If more phases: Continue to Phase B
- If all phases done: Proceed to Phase 4 (Documentation)

---

**Validated by:** QA Agent  
**Date:** 2025-11-10  
**Report saved:** `.ai/output/validation-report-PROJ-1234-PhaseA.md`
```

---

### Step 10: Make Decision (1 min)

**Actor:** QA Agent

**Actions:**

Based on validation results, make ONE of three decisions:

#### Decision 1: APPROVE ✅

**Criteria:**
- All tests pass (100%)
- Coverage meets targets (≥90% modified, ≥80% overall)
- All quality gates pass (lint, type, build, security)
- All acceptance criteria met
- Zero regressions
- Performance targets met (if applicable)

**Action:**
```markdown
## ✅ APPROVED

All quality gates passed. Implementation validated.

**Next:** Proceed to next phase or Phase 4.
```

**Handoff to:** Orchestrator (checks if more phases exist)

---

#### Decision 2: REJECT ❌

**Criteria:**
- Any tests fail
- Coverage below targets
- Quality gates fail (lint, type, build errors)
- Acceptance criteria not met
- Regressions detected
- Performance below targets

**Action:**
```markdown
## ❌ REJECTED

Implementation does not meet quality standards.

**Issues to fix:**
1. [Issue 1 with details]
2. [Issue 2 with details]

**Action Required:** Developer must address issues and resubmit.

**Next:** Return to Developer for fixes, then re-validate.
```

**Handoff to:** Developer (with detailed issue list)

---

#### Decision 3: ESCALATE ⚠️

**Criteria:**
- Medium-severity security vulnerabilities in production dependencies
- Breaking changes detected that may need approval
- Performance slightly below target (user decision needed)
- Acceptance criteria partially met (edge case interpretation needed)
- Unusual test patterns (need human review)

**Action:**
```markdown
## ⚠️ ESCALATE TO USER

Implementation has issues requiring human decision.

**Issues for user review:**
1. **Security:** Medium-severity vulnerability in `jsonwebtoken` library
   - CVE-2022-23529 (Medium)
   - Requires upgrade to 9.0.0+ (may have breaking changes)
   - User decision: Accept risk or require upgrade?

2. **Performance:** Token validation at p95: 55ms (target: <50ms)
   - 10% over target
   - User decision: Accept or require optimization?

**Recommendation:** [QA's recommended action]

**Awaiting user decision before proceeding.**
```

**Handoff to:** User (via Orchestrator)

---

## Workflow Outputs

### Primary Output
- **Validation Report** (`.ai/output/validation-report-[ISSUE-KEY]-[Phase].md`)

### Decision
- APPROVE ✅ / REJECT ❌ / ESCALATE ⚠️

### Metadata
- Test count, coverage percentage
- Quality gate results
- Acceptance criteria status
- Regression count
- Issues found

---

## Success Criteria

Validation is successful when:

✅ All quality gates checked systematically  
✅ Acceptance criteria validated against requirements  
✅ Regression analysis complete  
✅ Validation report generated  
✅ Clear decision made (APPROVE/REJECT/ESCALATE)  
✅ Next steps identified  

---

## Integration with Other Workflows

**Called by:**
- **wf_03_execute_development.md** (Step 9, after each phase)

**Calls back to:**
- **wf_03_execute_development.md** (if APPROVED and more phases exist)
- **wf_05_generate_pr.md** (if APPROVED and all phases complete)
- **Developer in wf_03** (if REJECTED, with issues to fix)
- **User via Orchestrator** (if ESCALATE)

---

**Remember:** This validation workflow is the quality gate that prevents low-quality code from progressing. Be thorough but fair. Provide clear, actionable feedback when rejecting. Escalate when human judgment is needed.
