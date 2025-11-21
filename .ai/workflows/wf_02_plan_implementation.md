# 📐 Workflow 02: Plan Implementation (Phase 2: Planning)

**Purpose:** Transform requirements into detailed technical implementation plan with TDD strategy, optional forensic analysis for bugs, ADR (Architectural Decision Record), and phased execution approach.

**Duration:** 20-40 minutes  
**Personas Involved:** Orchestrator → Architect (→ QA/Developer)  
**Phase:** Phase 2 (Planning)  
**Input:** Requirements document from Phase 1  
**Output:** Implementation plan with test strategy and critique

---

## Workflow Trigger

This workflow starts when:
- Phase 1 (Analysis) approved by user
- Requirements document exists
- Orchestrator switches to Architect Agent
- User requests "plan implementation for [REQUEST_ID]"

---

## Workflow Steps

### Step 1: Orchestrator - Phase Transition (1 min)

**Actor:** Orchestrator Agent

**Actions:**
1. Verify Phase 1 requirements exist
2. Load requirements document
3. Identify REQUEST_ID
4. Switch to Architect Agent
5. Provide context to Architect

**Context Handoff:**
```markdown
## Phase 2: Planning

**Previous Phase:** Analysis (Complete ✅)  
**Request ID:** [REQUEST_ID]
**Requirements:** `docs/requests/[REQUEST_ID]/analysis_[request-id].md`  
**Switching to:** Architect Agent

**Your Task:**
Create detailed implementation plan including:
- Code investigation findings
- Forensic analysis (if bug)
- Architectural decisions (ADR if significant)
- Implementation phases
- Test strategy (TDD approach)
- Risk assessment
- Self-critique of the plan
```

---

### Step 2: Architect - Load Requirements (2-3 min)

**Actor:** Architect Agent

**Actions:**
1. Read requirements document from Phase 1
2. Extract acceptance criteria
3. Identify affected components
4. Note constraints and dependencies
5. Determine if this is a bug fix (forensic analysis required)

**Checklist:**
```markdown
## Requirements Review

- [ ] All acceptance criteria understood
- [ ] Technical constraints identified
- [ ] Non-functional requirements noted
- [ ] Dependencies mapped
- [ ] Scope boundaries clear
- [ ] Bug fix? (forensic analysis needed)
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

### Step 3a: Architect - Forensic Analysis (CONDITIONAL - For Bugs Only)

**Actor:** Architect Agent

**Trigger:** If the request type is a bug fix

**Actions:**

Use the `forensic_analysis.md` template to conduct deep investigation:

1. **Reproduce the Bug:** Attempt to recreate the issue based on the analysis report.
2. **Trace Execution:** Follow the code execution path to the failure point.
3. **Analyze Root Cause:** Identify the exact code/configuration causing the issue.
4. **Document Evidence:** Capture logs, stack traces, variable states.
5. **Identify Fix Points:** Determine what needs to change to resolve the bug.

**Output:**
- **Forensic Report:** `docs/requests/[REQUEST_ID]/forensic_analysis.md`

**Key Questions to Answer:**
- What exact line/function causes the failure?
- What are the preconditions that trigger it?
- Why did this bug pass initial development/testing?
- What test should have caught this?

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
The requirement asks for stateless authentication to support horizontal scaling.

---

## Decision

We will implement JWT (JSON Web Token) authentication.

---

## Consequences

### Positive
- ✅ Stateless authentication
- ✅ Horizontal scaling support

### Negative
- ❌ Cannot invalidate individual tokens before expiry

### Mitigations
- Use short expiry times
- Implement token blacklist
```

**Save ADR to:** `docs/requests/[REQUEST_ID]/adr_001.md`

#### If No Major Design Decision:

Document approach:

```markdown
## Implementation Approach

**Strategy:** Incremental enhancement of existing component

**Reasoning:**
- Existing architecture adequate
- No breaking changes needed
- Follows established patterns
```

---

### Step 5: Architect - Define Test Strategy (5-10 min)

**Actor:** Architect Agent

**Actions:**

Create **TDD-aligned test strategy** following the plan template.

---

### Step 6: Architect - Create Implementation Plan (10-15 min)

**Actor:** Architect Agent

**Actions:**

Generate implementation plan using `.ai/templates/implementation_plan.md`:

1. **Create File:** `docs/requests/[REQUEST_ID]/plan_[request-id].md`
2. **Fill Template:** Populate with phases, test strategy, risks.

---

### Step 7: Architect - Critique & Refine Plan (Mandatory)

**Actor:** Architect Agent

**Actions:**

1. **Self-Critique:** Review the generated plan against the `critique_plan.md` template.
2. **Identify Gaps:** Look for missing test scenarios, unidentified risks, or unclear task descriptions.
3. **Refine:** Update the implementation plan based on the critique.
4. **Document Critique:** Save as `docs/requests/[REQUEST_ID]/critique_plan.md`.

**Critique Checklist:**
- [ ] Are all acceptance criteria mapped to implementation tasks?
- [ ] Is the test strategy comprehensive?
- [ ] Are risks properly assessed and mitigated?
- [ ] Are dependencies clearly documented?
- [ ] Is the rollback plan feasible?

---

### Step 8: Architect - Approval Gate (STOP)

**Actor:** Architect Agent

**Actions:**

Present implementation plan to user:

```markdown
## 🚦 Phase 2: Planning Complete

**Implementation plan generated & critiqued.**

---

## Summary

**Request ID:** [REQUEST_ID]
**Strategy:** [Brief description]
**Phases:** [Number] phases
**Estimated Effort:** [Time estimate]
**Risk Level:** [Low/Medium/High]
**Breaking Change:** [YES/NO]

---

## Deliverables

1. **Implementation Plan:** `docs/requests/[REQUEST_ID]/plan_[request-id].md`
2. **Critique:** `docs/requests/[REQUEST_ID]/critique_plan.md`
3. **Forensic Analysis:** `docs/requests/[REQUEST_ID]/forensic_analysis.md` (if bug)
4. **ADR:** `docs/requests/[REQUEST_ID]/adr_001.md` (if applicable)

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

### Step 9: Orchestrator - Handoff to Phase 3 (1 min)

**Actor:** Orchestrator Agent

**Trigger:** User types `approve`

**Actions:**
1. Mark Phase 2 as complete ✅
2. Ensure `docs/requests/[REQUEST_ID]/` contains all artifacts
3. Switch to QA Agent (for test writing)
4. Trigger **wf_03_execute_development.md**

**Output:**
```markdown
## Phase 2: Complete ✅

**Implementation plan approved by user.**

**Artifacts:**
- Plan: `docs/requests/[REQUEST_ID]/plan_[request-id].md`
- Critique: `docs/requests/[REQUEST_ID]/critique_plan.md`
- Forensic Analysis: `docs/requests/[REQUEST_ID]/forensic_analysis.md` (if bug)
- ADR: `docs/requests/[REQUEST_ID]/adr_001.md` (if applicable)

**Next:** Phase 3 - Development Execution  
**Starting with:** QA Agent (writes tests first)  
**Workflow:** wf_03_execute_development.md
```

---

## Workflow Outputs

### Primary Outputs
- **Implementation Plan** (`docs/requests/[REQUEST_ID]/plan_[request-id].md`)
- **Critique Report** (`docs/requests/[REQUEST_ID]/critique_plan.md`)
- **Forensic Analysis** (`docs/requests/[REQUEST_ID]/forensic_analysis.md`) - if bug
- **ADR** (`docs/requests/[REQUEST_ID]/adr_XXX.md`) - if applicable

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
✅ Forensic analysis complete (if bug)  
✅ Architectural decisions documented (ADR if significant)  
✅ Implementation broken into phases/tasks  
✅ Test strategy defined (TDD approach)  
✅ Risk assessment complete  
✅ Plan self-critiqued and refined  
✅ Breaking changes identified  
✅ Plan approved by user  

---

## Failure Scenarios & Recovery

### Scenario 1: User Requests Revisions
**Recovery:**
1. Architect incorporates feedback
2. Updates implementation plan
3. Re-presents for approval (loop back to Step 8)

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
| Bug fix identified | Conduct forensic analysis | Step 3a |
| Feature request | Skip forensic analysis | Step 4 |
| Simple change (no ADR needed) | Document approach | Continue to test strategy |
| Significant design decision | Create ADR | Save ADR, then test strategy |
| Plan generated | Perform self-critique | Step 7 |
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
Architect: Reads analysis from docs/requests/[REQUEST_ID]/
    ↓
Architect: Identifies this is a BUG FIX
    ↓
Architect: Conducts forensic analysis
    ↓
Architect: Semantic search for affected components
    ↓
Architect: Creates ADR (if significant change)
    ↓
Architect: Defines test strategy (90% coverage, TDD)
    ↓
Architect: Breaks work into phases
    ↓
Architect: Critiques and refines plan
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
