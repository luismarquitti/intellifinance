# 🔍 Workflow 01: Triage Issue (Phase 1: Analysis)

**Purpose:** Initial analysis of user request, problem, or JIRA issue. Extract requirements, identify constraints, and prepare for technical planning.

**Duration:** 10-30 minutes  
**Personas Involved:** Orchestrator → TPM/PO (→ Architect)  
**Phase:** Phase 1 (Analysis)  
**Output:** Requirements document with acceptance criteria

---

## Workflow Trigger

This workflow starts when:
- User provides a JIRA issue key (e.g., "Analyze PROJ-1234")
- User describes a problem or feature request
- User asks to investigate a bug or enhancement
- Orchestrator detects a new task requiring analysis

---

## Workflow Steps

### Step 1: Orchestrator - Task Recognition (1-2 min)

**Actor:** Orchestrator Agent

**Actions:**
1. Recognize that task requires analysis (Phase 1)
2. Check if JIRA issue key provided
3. Verify `.ai/constitution.md` rules apply
4. Switch to TPM/PO Agent

**Decision Logic:**
```
IF task type is:
  - "Analyze JIRA-KEY" → Phase 1 (this workflow)
  - "Investigate bug in..." → Phase 1 (this workflow)
  - "Why is X happening?" → Phase 1 (this workflow)
  - "Plan implementation for..." → Phase 2 (skip to wf_02)
  - "Implement feature..." → Phase 1 first, then Phase 2
```

**Output:**
```markdown
## Phase 1: Analysis

**Task:** [Description]
**Type:** [Bug Fix / Feature / Enhancement / Investigation]
**Switching to:** TPM/PO Agent
```

---

### Step 2: TPM/PO - Gather Context (5-10 min)

**Actor:** TPM/PO Agent

**Actions:**

#### 2.1: If JIRA Issue Provided

**Use atlassian-mcp to fetch JIRA details:**

```typescript
// Fetch full JIRA issue details
mcp_atlassian-mcp_jira_get_detail({
  provider: "jira",
  issue_key: "HPXAPPS-40223",
  fields: "*all",  // Get all fields including custom fields
  comment_limit: 50,  // Fetch up to 50 comments
  expand: "changelog"  // Include change history
})
```

**What this returns:**
- Issue summary, description, status, priority, assignee, reporter
- All comments with authors and timestamps
- Attachments list with download URLs
- Linked issues (blocks, is blocked by, relates to)
- Change history (status transitions, field updates, timestamps)

**Search for related issues:**

```typescript
// Find similar bugs
mcp_atlassian-mcp_jira_search({
  jql: "project = HPXAPPS AND text ~ 'NullPointerException' ORDER BY created DESC",
  limit: 10
})

// Find issues in same component
mcp_atlassian-mcp_jira_search({
  jql: "project = HPXAPPS AND component = 'Web Dashboard' AND status != Closed",
  limit: 15
})
```

**If MCP unavailable:**
- Inform user: "atlassian-mcp not configured. Please provide JIRA issue details manually."
- Reference setup guide: `.ai/setup/mcp-setup-guide.md`
- Request manual data: issue summary, description, comments, current status

#### 2.2: If User Description Provided
```
1. Read user's request carefully
2. Ask clarifying questions if needed
3. Identify missing information
4. Extract explicit requirements
5. Infer implicit requirements
```

#### 2.3: Code Investigation (If Bug/Enhancement)
```bash
# Search for related code
semantic_search(query: "relevant component or function")

# Check error patterns
grep_search(query: "error message or pattern", isRegexp: true)

# Read relevant files
read_file(filePath: "path/to/component.ts", startLine: 1, endLine: 100)
```

**Output Checkpoint:**
```markdown
## Context Gathered

**Issue:** [JIRA-KEY or description]
**Type:** [Bug / Feature / Enhancement]
**Priority:** [High / Medium / Low]
**Affected Component:** [Module/file path]

### User Request
[Original request verbatim]

### Related Context
- [Linked JIRA issues]
- [Related code files]
- [Error logs or screenshots]
```

---

### Step 3: TPM/PO - Root Cause Analysis (5-10 min)

**Actor:** TPM/PO Agent

**Actions:**

#### For Bugs:
```markdown
## Root Cause Analysis (RCA)

### What is happening? (Symptom)
[Describe the observable problem]

### Why is it happening? (Cause)
[Explain the underlying cause - use 5 Whys technique]

### What is the impact? (Severity)
- **Users Affected:** [All / Some / Admin only]
- **Frequency:** [Always / Sometimes / Rare]
- **Workaround:** [Yes / No]
- **Data Impact:** [None / Corrupts data / Loses data]

### Proposed Solution
[High-level approach to fix]
```

#### For Features:
```markdown
## Feature Analysis

### What problem does this solve?
[User pain point or business need]

### Who benefits?
- **Primary Users:** [Role/persona]
- **Secondary Users:** [Other beneficiaries]

### Success Criteria
[How will we know this is successful?]

### Scope
**In Scope:**
- [Item 1]
- [Item 2]

**Out of Scope:**
- [Item 1]
- [Item 2]
```

---

### Step 4: TPM/PO - Define Acceptance Criteria (5-10 min)

**Actor:** TPM/PO Agent

**Actions:**

Create **Given-When-Then** acceptance criteria:

```markdown
## Acceptance Criteria

### AC1: [Feature/behavior description]
**Given** [initial context or state]  
**When** [action or trigger]  
**Then** [expected outcome]  

**Example:**
Given a user is logged in  
When they click the "Export Profile" button  
Then their profile data downloads as JSON  
And the filename includes their user ID  
And the response time is under 2 seconds  

### AC2: [Error handling scenario]
**Given** [error condition]  
**When** [action attempted]  
**Then** [graceful error handling]  

**Example:**
Given the export service is unavailable  
When a user requests profile export  
Then they see a "Service temporarily unavailable" message  
And the error is logged with timestamp  
And they can retry after 5 minutes  

### AC3: [Edge case or constraint]
**Given** [boundary condition]  
**When** [action]  
**Then** [expected behavior at boundary]  

**Example:**
Given a user has 10,000+ activity records  
When they export their profile  
Then the export completes within 10 seconds  
And memory usage stays under 500MB  
And the file size is under 10MB (compressed)  
```

**Quality Checklist:**
- [ ] Each AC is testable (can be automated)
- [ ] Success path covered
- [ ] Error paths covered
- [ ] Edge cases covered
- [ ] Performance criteria specified (if applicable)
- [ ] Security criteria specified (if applicable)

---

### Step 5: TPM/PO - Create Requirements Document (3-5 min)

**Actor:** TPM/PO Agent

**Actions:**

Generate comprehensive requirements document:

```markdown
# Requirements Document

**Issue:** PROJ-1234  
**Title:** [Issue title]  
**Type:** [Bug Fix / Feature / Enhancement]  
**Priority:** [High / Medium / Low]  
**Created:** 2025-11-10  
**Analyst:** TPM/PO Agent

---

## Problem Statement

[2-3 sentences describing the problem or opportunity]

---

## Root Cause Analysis (For Bugs)

[RCA from Step 3]

---

## Feature Analysis (For Features)

[Feature analysis from Step 3]

---

## Acceptance Criteria

[All AC from Step 4 in Given-When-Then format]

---

## Constraints & Dependencies

### Technical Constraints
- [Constraint 1]
- [Constraint 2]

### Dependencies
- [Dependency on other system/service]
- [Dependency on other issue/ticket]

### Non-Functional Requirements
- **Performance:** [Response time, throughput]
- **Security:** [Authentication, authorization, data protection]
- **Accessibility:** [WCAG compliance if UI]
- **Scalability:** [Concurrent users, data volume]

---

## Out of Scope

[Explicitly list what will NOT be addressed]

---

## Open Questions

- [ ] Question 1 needing clarification
- [ ] Question 2 needing decision

---

## Next Steps

1. Review and approve these requirements
2. Proceed to Phase 2: Architect creates implementation plan
```

---

### Step 6: TPM/PO - Approval Gate (STOP)

**Actor:** TPM/PO Agent

**Actions:**

Present requirements to user for approval:

```markdown
## 🚦 Phase 1: Analysis Complete

**Requirements document generated.**

### Summary
- **Issue:** PROJ-1234
- **Type:** Feature
- **Acceptance Criteria:** 3 scenarios defined
- **Constraints:** 2 technical constraints identified
- **Open Questions:** 1 requiring your input

---

## Deliverable

**Requirements Document:**
[Display full document from Step 5]

---

## 🛑 APPROVAL REQUIRED

Please review the requirements and respond:

1. **APPROVE** - Proceed to Phase 2 (Architect creates implementation plan)
2. **REVISE** - Request changes to requirements
3. **CLARIFY** - Answer open questions before proceeding
4. **CANCEL** - Stop workflow

**I will NOT proceed to Phase 2 until you provide explicit approval.**

Type: `approve`, `revise`, `clarify`, or `cancel`
```

**Wait for user response. Do NOT proceed automatically.**

---

### Step 7: Orchestrator - Handoff to Phase 2 (1 min)

**Actor:** Orchestrator Agent

**Trigger:** User types `approve`

**Actions:**
1. Mark Phase 1 as complete ✅
1. Generate analysis report using `.ai/templates/analysis_report.md` template
2. Save analysis report to `analysis-workspace/docs/[JIRA-ID]/index.md`
3. Create `_category_.json` for Docusaurus sidebar configuration
4. Ensure proper Docusaurus frontmatter is included
5. Document all input sources from `.analysis-inputs/[JIRA-ID]/`

**Output:**
3. Switch to Architect Agent
4. Trigger **wf_02_plan_implementation.md**

**Output:**
```markdown
## Phase 1: Complete ✅

**Requirements approved by user.**

**Saved:** `analysis-workspace/docs/[JIRA-ID]/index.md`
**Category Config:** `analysis-workspace/docs/[JIRA-ID]/_category_.json`
**Evidence Folder:** `analysis-workspace/docs/[JIRA-ID]/evidence/` (for screenshots, logs)

**Input Sources Documented:** All materials from `.analysis-inputs/[JIRA-ID]/` cited in report

**Next:** Phase 2 - Implementation Planning  
**Switching to:** Architect Agent  
**Workflow:** wf_02_plan_implementation.md
```

---

## Workflow Outputs

### Primary Output

- **Analysis Report** (`analysis-workspace/docs/[JIRA-ID]/index.md`)
  - Docusaurus frontmatter with custom_metadata
  - Issue summary and classification
  - Root cause analysis (if bug)
  - Solution approach
  - Evidence sources documented
  
- **Category Configuration** (`analysis-workspace/docs/[JIRA-ID]/_category_.json`)
  - Sidebar label and position
  - Issue metadata for navigation

### Metadata
- Task type identified
- Acceptance criteria count
- Constraints identified
- Open questions flagged

---

## Success Criteria

Phase 1 is successful when:

✅ Problem/feature clearly understood  
✅ Root cause identified (for bugs)  
✅ Acceptance criteria defined (Given-When-Then)  
✅ Constraints and dependencies documented  
✅ Requirements approved by user  
✅ No open questions blocking Phase 2  

---

## Failure Scenarios & Recovery

### Scenario 1: User Requests Revisions
**Recovery:**
1. TPM/PO incorporates feedback
2. Updates requirements document
3. Re-presents for approval (loop back to Step 6)

### Scenario 2: Open Questions Blocking Progress
**Recovery:**
1. TPM/PO lists specific questions
2. Waits for user answers
3. Updates requirements with answers
4. Re-presents for approval

### Scenario 3: Insufficient Context
**Recovery:**
1. TPM/PO asks specific questions
2. Performs additional code investigation
3. Reviews related JIRA issues or documentation
4. Updates requirements with findings

### Scenario 4: User Cancels
**Recovery:**
1. Save requirements as draft
2. Mark workflow as cancelled
3. Ask if work should be saved for later

---

## Decision Points

| Situation | Decision | Next Action |
|-----------|----------|-------------|
| JIRA issue key provided | Use MCP tools to fetch details | Step 2.1 |
| User description only | Extract requirements from description | Step 2.2 |
| Bug reported | Perform RCA | Step 3 (Bug path) |
| Feature requested | Perform feature analysis | Step 3 (Feature path) |
| Requirements approved | Proceed to Phase 2 | Trigger wf_02 |
| Revisions requested | Loop back to editing | Step 5 again |
| Open questions exist | Wait for answers | Step 6 (wait) |
| Cancelled by user | Save draft, stop | End workflow |

---

## Tools Used in This Workflow

- `mcp_gitkraken_issues_get_detail` - Fetch JIRA issue details
- `semantic_search` - Find related code by semantic meaning
- `grep_search` - Search code patterns
- `read_file` - Read specific files for context
- `create_file` - Save requirements document
- `manage_todo_list` - Track analysis sub-tasks

---

## Integration with Other Workflows

**Triggers:**
- User request
- Orchestrator task classification

**Outputs to:**
- **wf_02_plan_implementation.md** (if approved)
- Saved requirements used by Architect in Phase 2

**Can be triggered by:**
- Direct user command ("Analyze PROJ-1234")
- Orchestrator workflow routing

---

## Example: Complete Flow

```
User: "Analyze JIRA issue PROJ-1234"
    ↓
Orchestrator: Recognizes Phase 1 task
    ↓
TPM/PO: Fetches JIRA-1234 details via MCP
    ↓
TPM/PO: Performs code investigation
    ↓
TPM/PO: Performs RCA (it's a bug)
    ↓
TPM/PO: Defines 3 acceptance criteria (Given-When-Then)
    ↓
TPM/PO: Generates requirements document
    ↓
TPM/PO: Presents to user with APPROVAL GATE 🛑
    ↓
User: "approve"
    ↓
Orchestrator: Saves requirements, switches to Architect
    ↓
Triggers: wf_02_plan_implementation.md
```

---

**Remember:** This is Phase 1 ONLY. Do not proceed to Phase 2 (planning) without explicit user approval. The approval gate is mandatory to ensure alignment before investing time in technical planning.
