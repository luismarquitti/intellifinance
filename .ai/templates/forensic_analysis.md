---
# Docusaurus Frontmatter
id: forensic-[request-id]
title: "Forensic Analysis: [REQUEST-ID]"
sidebar_label: "[REQUEST-ID] Forensics"
custom_edit_url: null

# Template Metadata
template_type: forensic_analysis
generated_by: Architect Agent
generated_date: "[YYYY-MM-DD HH:MM:SS]"
request_id: "[REQUEST-ID]"
---

# Forensic Analysis: [REQUEST-ID]

**Objective**: Identify the definitive root cause of the reported bug through evidence-based investigation.

---

## 1. Evidence Collection

### Logs & Traces
```
[Paste relevant log snippets, stack traces, or error messages here]
```

### Code Trail
- **Suspect File**: `path/to/file`
- **Suspect Function**: `functionName`
- **Line Numbers**: `L10-L20`

## 2. Hypothesis Matrix

| ID | Hypothesis | Evidence For | Evidence Against | Status |
|----|------------|--------------|------------------|--------|
| H1 | Null pointer in auth service | Error log shows NPE | None | 🔄 Investigating |
| H2 | DB connection timeout | Intermittent failure | Logs show fast query | ❌ Disproven |

## 3. Investigation Steps (Execution)

### Step 1: [Action Name]
- **Command/Action**: `grep "error" /var/log/app.log`
- **Result**: Found 3 occurrences of...
- **Conclusion**: Supports H1.

### Step 2: [Action Name]
- **Command/Action**: [Describe action]
- **Result**: [Describe result]
- **Conclusion**: [Describe conclusion]

## 4. Root Cause Conclusion
**Definitive Root Cause**:
[Explain exactly what is broken and why]

**Fix Recommendation**:
[Briefly describe how to fix it]

**Verification Test**:
[How to reproduce and verify the fix]
