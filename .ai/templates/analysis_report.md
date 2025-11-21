---
# Docusaurus Frontmatter
id: analysis-[request-id]
title: "Analysis: [REQUEST-ID] - [Title]"
sidebar_label: "[REQUEST-ID] Analysis"
custom_edit_url: null

# Template Metadata
template_type: analysis_report
generated_by: TPM/PO Agent
generated_date: "[YYYY-MM-DD HH:MM:SS]"
last_updated: "[YYYY-MM-DD HH:MM:SS]"
workflow: wf_01_triage_issue

# Request Metadata
request_id: "[REQUEST-ID]"
request_type: "[Bug/Feature/Task/Story]"
priority: "[P0/P1/P2/P3/P4]"
status: "draft"  # draft | in-progress | reviewed | approved
confidence_level: "medium"  # high | medium | low
analyst: "[Name or 'TPM/PO Agent']"

# Optional Jira Metadata
jira_id: "[JIRA-ID]"
jira_url: "[Full Jira URL]"
---

# Analysis Report: [REQUEST-ID] - [Title]

**Generated**: `[YYYY-MM-DD HH:MM:SS]`  
**Last Updated**: `[YYYY-MM-DD HH:MM:SS]`  
**Analyst**: `[TPM/PO Agent or Name]`  
**Confidence Level**: ⬤⬤⬤◯◯ ([High/Medium/Low])

---

## Executive Summary

[2-3 sentence summary of the issue/request, its impact, and recommended approach]

**Key Findings**:
- [Finding 1]
- [Finding 2]
- [Finding 3]

**Recommended Action**: [Brief recommendation - investigate further, implement fix, needs clarification, etc.]

---

## 1. Request Context

### Problem Statement / Requirement
[Clear, concise description of the core problem or feature request]

### Business Impact
- **User Impact**: [How this affects users]
- **Business Priority**: [Why this matters]
- **Urgency**: [Timeline constraints]

### Technical Context
- **Affected Components**: [List of systems, services, or modules impacted]
- **Environment**: [Production, Staging, Dev]

---

## 2. Analysis Details

### For Bugs: Symptom Analysis
- **Reported Symptoms**: [Description]
- **Evidence**: [Logs, screenshots]
- **Reproduction Steps**: [How to trigger]

### For Features: Requirements Analysis
- **Functional Requirements**:
    1. [Req 1]
    2. [Req 2]
- **Non-Functional Requirements**:
    1. [Performance, Security, etc.]

---

## 3. Workspace Context Review

> **Purpose**: Document findings from searching the codebase, documentation, and related issues.

### Technology Stack Discovery
[Auto-detected from workspace analysis]

### Related Code Areas
| Component/File | Relevance | Notes |
|----------------|-----------|-------|
| `path/to/file.ts` | High | [Why this file matters] |

---

## 4. Root Cause Analysis (If Bug) / Feasibility (If Feature)

### Hypothesis / Approach 1
**Confidence**: ⬤⬤⬤◯◯
**Description**: [Explanation]
**Evidence/Rationale**: [Why this is likely/good]

---

## 5. Solution Approach

### Recommended Strategy
[High-level description of the recommended fix or implementation]

### Solution Components
1. **[Component 1]**: [Change needed]
2. **[Component 2]**: [Change needed]

---

## 6. Risks & Dependencies
- **Risk 1**: [Description & Mitigation]
- **Dependencies**: [Blocking items]

---

## 7. Next Steps

### Immediate Actions (STOP for User Approval)
1. ⏸️ **[Action 1]**
2. ⏸️ **[Action 2]**

**🚨 APPROVAL GATE**: Do not proceed to implementation without explicit user approval.

### Success Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

---

## 8. Attachments & References
- [Link 1]
- [Link 2]

---

## 9. Approval & Sign-off

**Analysis Status**: [Draft / Ready for Review / Approved]
**Approved By**: [Name]  
**Approval Date**: [YYYY-MM-DD]

**Next Workflow**: `wf_02_plan_implementation.md` (if approved)
