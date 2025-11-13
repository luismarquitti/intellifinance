# HP Dev Agent - System Architecture

## Project Structure

### Input/Output Separation

The HP Dev Agent uses a clear separation between **inputs** (ephemeral, not tracked) and **outputs** (version controlled, tracked):

```
my_agent/
├── .ai/                           # Agent system (tracked in git)
│   ├── constitution.md
│   ├── agents/
│   ├── workflows/
│   └── templates/
│
├── analysis-workspace/            # Dashboard OUTPUT only (tracked in git)
│   └── docs/
│       └── [JIRA-ID]/            # Analysis outputs
│           ├── _category_.json    # Sidebar config
│           ├── index.md          # Analysis report
│           ├── implementation_plan.md
│           ├── qa_validation_report.md
│           ├── pull_request.md
│           └── commit_message.md
│
└── .analysis-inputs/             # INPUT files (NOT tracked in git)
    └── [JIRA-ID]/                # Per-issue inputs
        ├── logs/                 # Log files
        ├── screenshots/          # Images, diagrams
        ├── attachments/          # Files from JIRA
        ├── raw-description.md    # Manually pasted JIRA content
        └── notes.md             # User annotations
```

### Key Design Decisions

#### 1. Input Folder (`.analysis-inputs/`)
- **Location**: Root of `my_agent` project
- **Git Status**: ❌ **NOT TRACKED** (add to .gitignore)
- **Purpose**: Store raw, ephemeral analysis materials
- **Contents**:
  - **logs/**: Application logs, error traces, stack dumps
  - **screenshots/**: UI screenshots, diagrams, visual evidence
  - **attachments/**: Files downloaded from JIRA or other sources
  - **raw-description.md**: Manually pasted JIRA issue description (when MCP not available)
  - **notes.md**: User annotations, investigation notes, hypotheses

#### 2. Output Folder (`analysis-workspace/docs/[JIRA-ID]/`)
- **Location**: Inside Docusaurus project
- **Git Status**: ✅ **TRACKED** (version controlled)
- **Purpose**: Store final, polished analysis artifacts
- **Contents**:
  - **_category_.json**: Docusaurus sidebar configuration
  - **index.md**: Analysis report (uses template: `analysis_report.md`)
  - **implementation_plan.md**: Implementation plan (uses template: `implementation_plan.md`)
  - **qa_validation_report.md**: QA validation report (uses template: `qa_validation_report.md`)
  - **pull_request.md**: PR description (uses template: `pull_request.md`)
  - **commit_message.md**: Commit message (uses template: `commit_message.md`)

#### 3. Referencing Inputs in Outputs
Agents MUST document input sources in their output files:

**Example in Analysis Report:**
```markdown
## Evidence Sources

### Logs Analyzed
- `.analysis-inputs/HPXAPPS-12345/logs/app-error-2025-11-10.log` (lines 234-567)
  - **Key Finding**: NullPointerException at UserService.java:123
  - **Timestamp**: 2025-11-10 14:23:45 UTC
  - **Frequency**: 47 occurrences in 1 hour

### Screenshots Reviewed
- `.analysis-inputs/HPXAPPS-12345/screenshots/error-ui.png`
  - **Description**: User sees blank page after clicking "Submit"
  - **Browser**: Chrome 120.0.6099.109
  - **Device**: Desktop (Windows 11)

### User Annotations
- `.analysis-inputs/HPXAPPS-12345/notes.md`
  - User hypothesis: "Might be related to recent Redis upgrade"
  - User noted: Issue only happens during peak hours (2-4pm EST)
```

### Workflow Integration

#### Phase 1: Gather Inputs (Manual)
User prepares input folder:
```powershell
# Create input folder
New-Item -ItemType Directory -Path ".analysis-inputs/HPXAPPS-12345" -Force

# Add materials
Copy-Item "C:\Downloads\error.log" ".analysis-inputs/HPXAPPS-12345/logs/"
Copy-Item "C:\Downloads\screenshot.png" ".analysis-inputs/HPXAPPS-12345/screenshots/"

# Create notes
@"
## Investigation Notes
- Issue started after Redis 7.2 upgrade on 2025-11-08
- Only affects users in US-East region
- Peak hours: 2-4pm EST (highest load)
"@ | Out-File ".analysis-inputs/HPXAPPS-12345/notes.md"
```

#### Phase 2: Agent Analysis (Automated)
Agents read from `.analysis-inputs/[JIRA-ID]/` and write to `analysis-workspace/docs/[JIRA-ID]/`:

1. **TPM/PO Agent** (wf_01):
   - Reads: `.analysis-inputs/[JIRA-ID]/*`
   - Writes: `analysis-workspace/docs/[JIRA-ID]/index.md` (analysis report)
   - References all input sources in output

2. **Architect Agent** (wf_02):
   - Reads: `analysis-workspace/docs/[JIRA-ID]/index.md` (previous analysis)
   - Writes: `analysis-workspace/docs/[JIRA-ID]/implementation_plan.md`

3. **Developer Agent** (wf_03):
   - Reads: `implementation_plan.md`
   - Writes: Code changes (in workspace)

4. **QA Agent** (wf_04):
   - Reads: Code changes
   - Writes: `analysis-workspace/docs/[JIRA-ID]/qa_validation_report.md`

5. **Writer Agent** (wf_05):
   - Reads: All previous outputs
   - Writes: `pull_request.md`, `commit_message.md`

#### Phase 3: Review Outputs (User)
User reviews generated analysis in Docusaurus dashboard:
```powershell
cd analysis-workspace
npm start
# Open http://localhost:3000
# Navigate to JIRA-ID folder
```

### Git Configuration

**Add to `.gitignore`:**
```gitignore
# HP Dev Agent - Input files (not tracked)
.analysis-inputs/

# Docusaurus - Build artifacts
analysis-workspace/build/
analysis-workspace/.docusaurus/
analysis-workspace/node_modules/
```

**Track in Git:**
- ✅ `.ai/` (entire agent system)
- ✅ `analysis-workspace/docs/` (all analysis outputs)
- ✅ `analysis-workspace/docusaurus.config.ts` (configuration)
- ✅ `analysis-workspace/src/` (custom components)
- ✅ `scripts/` (automation scripts)

### Benefits of This Structure

1. **Clean Git History**: Only polished outputs tracked, no noisy logs or screenshots
2. **Privacy**: Sensitive logs/screenshots never leave local machine
3. **Collaboration**: Team members can see analysis results without sharing raw inputs
4. **Flexibility**: Users can add any input materials without worrying about git conflicts
5. **Documentation**: Output files explicitly reference input sources for traceability
6. **Reusability**: Input folder can be deleted after issue closed, outputs preserved

### Example Complete Flow

```powershell
# 1. User prepares inputs
New-Item -ItemType Directory -Path ".analysis-inputs/HPXAPPS-12345" -Force
Copy-Item "error.log" ".analysis-inputs/HPXAPPS-12345/logs/"

# 2. Start dashboard (Terminal 1)
cd analysis-workspace
npm start

# 3. Run analysis (Terminal 2)
# User: "@HP Dev Agent, analyze HPXAPPS-12345 using materials in .analysis-inputs/HPXAPPS-12345/"

# 4. Watch outputs appear in real-time in browser (http://localhost:3001)

# 5. Review and commit outputs
git add analysis-workspace/docs/HPXAPPS-12345/
git commit -m "Add analysis for HPXAPPS-12345"

# 6. (Optional) Clean up inputs after issue resolved
Remove-Item -Recurse -Force ".analysis-inputs/HPXAPPS-12345"
```

---

## Agent System Overview

**Name**: HP Dev Agent  
**Version**: 1.0.0  
**Purpose**: Multi-persona AI agent system for JIRA issue analysis and implementation

### Agent Personas (6)
1. **Orchestrator** - Workflow coordination, approval gates
2. **TPM/PO Agent** - Issue triage, requirement analysis
3. **Architect Agent** - Solution design, implementation planning
4. **Developer Agent** - Code implementation, TDD enforcement
5. **QA Agent** - Testing, quality validation
6. **Writer Agent** - Documentation, PR/commit messages

### Workflow System (5 Phases)
1. **wf_01**: Triage & Analysis (TPM/PO)
2. **wf_02**: Planning & Design (Architect)
3. **wf_03**: Implementation (Developer)
4. **wf_04**: Quality Assurance (QA)
5. **wf_05**: Documentation (Writer)

### Template System (5 Templates)
1. `analysis_report.md` - Analysis structure
2. `implementation_plan.md` - Plan structure
3. `qa_validation_report.md` - QA structure
4. `pull_request.md` - PR structure
5. `commit_message.md` - Commit structure

---

**Last Updated**: 2025-11-10  
**Maintained By**: HP Dev Agent Contributors
