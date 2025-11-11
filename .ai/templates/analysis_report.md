---
# Docusaurus Frontmatter
id: analysis-[jira-id]
title: "Analysis: [JIRA-ID] - [Issue Title]"
sidebar_label: "[JIRA-ID] Analysis"
custom_edit_url: null

# Template Metadata
template_type: analysis_report
generated_by: TPM/PO Agent
generated_date: "[YYYY-MM-DD HH:MM:SS]"
last_updated: "[YYYY-MM-DD HH:MM:SS]"
workflow: wf_01_triage_issue

# Issue Metadata
jira_id: "[JIRA-ID]"
jira_url: "[Full Jira URL]"
issue_type: "[Bug/Feature/Task/Story]"
priority: "[P0/P1/P2/P3/P4]"
status: "draft"  # draft | in-progress | reviewed | approved
confidence_level: "medium"  # high | medium | low
analyst: "[Name or 'TPM/PO Agent']"

# Related Items
related_issues: []
related_docs: []
related_code_paths: []
dependencies: []
---

# Analysis Report: [JIRA-ID] - [Issue Title]

**Generated**: `[YYYY-MM-DD HH:MM:SS]`  
**Last Updated**: `[YYYY-MM-DD HH:MM:SS]`  
**Analyst**: `[TPM/PO Agent or Name]`  
**Confidence Level**: ⬤⬤⬤◯◯ ([High/Medium/Low])

---

## Executive Summary

[2-3 sentence summary of the issue, its impact, and recommended approach]

**Key Findings**:
- [Finding 1]
- [Finding 2]
- [Finding 3]

**Recommended Action**: [Brief recommendation - investigate further, implement fix, needs clarification, etc.]

---

## 1. Issue Context

### Problem Statement
[Clear, concise description of the core problem as reported]

### Business Impact
- **User Impact**: [How this affects users - who, what functionality, how many users]
- **Business Priority**: [Why this matters to the business]
- **Urgency**: [Timeline constraints, production issues, etc.]

### Technical Context
- **Affected Components**: [List of systems, services, or modules impacted]
- **Environment**: [Production, Staging, Dev - where the issue manifests]
- **Frequency**: [Always, intermittent, specific conditions]
- **First Occurrence**: [When first noticed/reported]

---

## 2. Symptom Analysis

### Reported Symptoms
1. **[Symptom Category 1]**
   - Description: [What users see/experience]
   - Evidence: [Error messages, screenshots, logs]
   - Reproduction: [How to trigger this symptom]

2. **[Symptom Category 2]**
   - Description: [What users see/experience]
   - Evidence: [Error messages, screenshots, logs]
   - Reproduction: [How to trigger this symptom]

### Error Messages & Stack Traces
```
[Paste relevant error messages or stack traces here]
[If multiple, include the most representative ones]
```

### Timeline of Events
- `[YYYY-MM-DD HH:MM]` - [Event: First report, deployment, change]
- `[YYYY-MM-DD HH:MM]` - [Event: Symptom observed]
- `[YYYY-MM-DD HH:MM]` - [Event: Investigation started]

---

## 3. Workspace Context Review

> **Purpose**: Document findings from searching the codebase, documentation, and related issues.

### Technology Stack Discovery
[Auto-detected from workspace analysis]

- **Primary Languages**: [JavaScript/TypeScript, Python, Java, C#, Go, etc.]
- **Frameworks**: [React, Angular, Vue, Django, Spring, .NET, etc.]
- **Architecture**: [Monolith, Microservices, Microfrontends, Serverless]
- **Key Dependencies**: [List major dependencies relevant to this issue]

### Related Issues Found

| Issue ID | Similarity | Status | Key Findings |
|----------|-----------|--------|--------------|
| [JIRA-123] | High | Resolved | [How it relates, solution used] |
| [JIRA-456] | Medium | In Progress | [How it relates, current status] |

**Search Strategy Used**:
- Keywords: `[keyword1, keyword2, keyword3]`
- Semantic search queries: `[query1, query2]`
- Directories searched: `[src/, components/, services/]`

**Patterns Identified**:
- [Pattern 1: Description and frequency]
- [Pattern 2: Description and correlation]

### Relevant Documentation Found

| Document | Location | Relevance | Key Information |
|----------|----------|-----------|-----------------|
| [Doc Title] | `path/to/doc.md` | High | [Architecture decision, design pattern] |
| [Doc Title] | `path/to/doc.md` | Medium | [API specification, usage guide] |

**Key Architectural Insights**:
- [Insight 1: Design decision that affects this issue]
- [Insight 2: Known constraint or limitation]
- [Insight 3: Intended behavior vs actual behavior]

### Code Areas Involved

| Component/File | Language | Lines | Relevance | Notes |
|----------------|----------|-------|-----------|-------|
| `path/to/component.ts` | TypeScript | 250 | High | [Why this file matters] |
| `path/to/service.py` | Python | 180 | Medium | [Connection to issue] |

**Code Patterns Observed**:
- [Pattern 1: Coding style, implementation approach]
- [Pattern 2: Similar implementations elsewhere]
- [Pattern 3: Recent changes in related areas]

---

## 4. Root Cause Analysis

### Hypothesis 1: [Title of Primary Hypothesis]
**Confidence**: ⬤⬤⬤◯◯ (High/Medium/Low)

**Description**:
[Detailed explanation of what you believe is causing the issue]

**Supporting Evidence**:
- [Evidence 1: From symptoms, logs, or code]
- [Evidence 2: From workspace context or related issues]
- [Evidence 3: From testing or reproduction]

**Contradicting Evidence**:
- [Counter-evidence 1: What doesn't fit this hypothesis]

**Validation Steps**:
1. [Step to confirm or refute this hypothesis]
2. [Step to confirm or refute this hypothesis]

---

### Hypothesis 2: [Title of Alternative Hypothesis]
**Confidence**: ⬤⬤◯◯◯ (High/Medium/Low)

**Description**:
[Alternative explanation]

**Supporting Evidence**:
- [Evidence 1]
- [Evidence 2]

**Contradicting Evidence**:
- [Counter-evidence 1]

**Validation Steps**:
1. [Step to confirm or refute]
2. [Step to confirm or refute]

---

### Recommended Root Cause
**Selected Hypothesis**: [Hypothesis 1/2/etc.]

**Rationale**:
[Why this hypothesis is most likely based on evidence]

**Confidence Justification**:
[Why high/medium/low confidence - what's known vs unknown]

---

## 5. Impact Assessment

### User Impact
- **Affected Users**: [Number/percentage, user segments]
- **Severity**: [Critical/High/Medium/Low]
- **Workaround Available**: [Yes/No - describe if yes]

### System Impact
- **Performance**: [Impact on response times, throughput, resource usage]
- **Reliability**: [Impact on uptime, error rates]
- **Data Integrity**: [Risk to data correctness/completeness]

### Business Impact
- **Revenue**: [Financial impact if applicable]
- **Reputation**: [Brand/customer satisfaction impact]
- **Compliance**: [Regulatory or contractual implications]

---

## 6. Solution Approach

### Recommended Strategy
[High-level description of the recommended fix or investigation path]

**Approach Type**: [Quick Fix / Comprehensive Refactor / Investigation Required / Feature Addition]

**Rationale**:
[Why this approach is recommended over alternatives]

### Solution Components

1. **[Component 1: e.g., Code Change]**
   - **What**: [Specific change needed]
   - **Where**: [`path/to/file.ts` - describe change]
   - **Why**: [How this addresses the root cause]
   - **Risk**: [Low/Medium/High - what could go wrong]

2. **[Component 2: e.g., Configuration Change]**
   - **What**: [Specific change needed]
   - **Where**: [`config/app.json` - describe change]
   - **Why**: [How this addresses the root cause]
   - **Risk**: [Low/Medium/High - what could go wrong]

3. **[Component 3: e.g., New Test Coverage]**
   - **What**: [Tests to add]
   - **Where**: [`tests/` - describe tests]
   - **Why**: [Prevent regression]
   - **Risk**: [Low/Medium/High]

### Alternative Approaches Considered

| Approach | Pros | Cons | Rejection Reason |
|----------|------|------|-----------------|
| [Approach A] | [Pro1, Pro2] | [Con1, Con2] | [Why not selected] |
| [Approach B] | [Pro1, Pro2] | [Con1, Con2] | [Why not selected] |

---

## 7. Risks & Dependencies

### Implementation Risks
- **Risk 1**: [Description]
  - **Probability**: [High/Medium/Low]
  - **Impact**: [High/Medium/Low]
  - **Mitigation**: [How to reduce/avoid this risk]

- **Risk 2**: [Description]
  - **Probability**: [High/Medium/Low]
  - **Impact**: [High/Medium/Low]
  - **Mitigation**: [How to reduce/avoid this risk]

### Dependencies
- **Blocking**: [What must be done first]
- **Blocked By**: [What depends on this work]
- **External Dependencies**: [Third-party services, team coordination, etc.]

### Rollback Plan
[How to undo changes if solution causes problems]

---

## 8. Next Steps

### Immediate Actions (STOP for User Approval)
1. ⏸️ **[Action 1]** - [Brief description]
2. ⏸️ **[Action 2]** - [Brief description]
3. ⏸️ **[Action 3]** - [Brief description]

**🚨 APPROVAL GATE**: Do not proceed to implementation without explicit user approval.

### Success Criteria
- [ ] [Criterion 1: How we'll know it's fixed]
- [ ] [Criterion 2: Verification method]
- [ ] [Criterion 3: Acceptance condition]

### Follow-up Investigation (if needed)
- [ ] [Investigation 1: What still needs clarification]
- [ ] [Investigation 2: Additional data to gather]

---

## 9. Attachments & References

### Jira Attachments
- [Attachment 1: Description]
- [Attachment 2: Description]

### Related Links
- [Link 1: Documentation URL]
- [Link 2: Related PR/commit]
- [Link 3: External reference]

### Code References
```typescript
// Relevant code snippet for reference
[Paste code here if helpful for understanding]
```

---

## 10. Approval & Sign-off

**Analysis Status**: [Draft / Ready for Review / Approved]

**Review Notes**:
[Space for user/reviewer feedback]

**Approved By**: [Name]  
**Approval Date**: [YYYY-MM-DD]

**Next Workflow**: `wf_02_plan_implementation.md` (if approved)

---

**Generated by**: TPM/PO Agent  
**Workflow**: Phase 1 - Issue Triage  
**Template Version**: 1.0
