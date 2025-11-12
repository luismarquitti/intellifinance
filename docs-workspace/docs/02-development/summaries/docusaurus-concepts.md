---
sidebar_position: 3
title: "Docusaurus Integration Concepts"
description: 'Original design concepts for Docusaurus dashboard and real-time analysis visualization'
custom_metadata:
  type: "session-summary"
  category: "dashboard-design"
  phase: "4"
  status: "archived"
created: 2025-01-09T00:00:00Z
last_updated: 2025-11-10T00:00:00Z
---

# Docusaurus Dashboard Integration Concepts

**Original Date**: January 9, 2025  
**Purpose**: Dashboard design and hot-reload analysis visualization  
**Status**: 📚 Historical Reference

---

## Core Concept: Analysis Workspace

Instead of polluting the main code repository with analysis artifacts, create a **separate Docusaurus project** (`analysis-workspace`) that serves as both:
1. **Write destination** for agent outputs
2. **Read source** for real-time visualization

### The "Magic" of Hot-Reload

Docusaurus development server (`npm start`) watches the `docs/` folder with hot-reload enabled. This means:
- Agent writes file → Docusaurus detects change (1-2 seconds) → Browser refreshes automatically
- **Result**: See analysis appear in real-time as agents work

## Proposed Folder Structure

```
analysis-workspace/
├── docusaurus.config.js      # Set docs as root (routeBasePath: '/')
├── docs/                      # Main content folder (agents write here)
│   ├── _category_.json        # "JIRA Issue Analyses" section
│   ├── index.md               # Dashboard landing page
│   │
│   ├── HPXAPPS-1234/          # Per-issue folder
│   │   ├── _category_.json
│   │   ├── index.md           # Analysis report
│   │   ├── implementation_plan.md
│   │   ├── agent_runtime.log
│   │   └── evidence/
│   │       ├── user_log_01.txt
│   │       └── screenshot.png
│   │
│   └── HPXAPPS-5678/          # Another issue
│       ├── _category_.json
│       ├── index.md
│       └── implementation_plan.md
```

## Agent Integration Pattern

Agents must write files with **Docusaurus frontmatter** for proper rendering:

```markdown
---
id: analysis_report
title: 📄 Analysis Report (HPXAPPS-1234)
tags: [analysis, bug, HPXAPPS-1234]
---

# Analysis Report Content
...
```

## Two-Terminal Workflow

**Terminal 1 (Visualizer)**:
```bash
cd analysis-workspace
npm run start  # Opens http://localhost:3000, watches docs/
```

**Terminal 2 (Agent)**:
```
@Agent, analyze JIRA issue HPXAPPS-9000
```

**Result**:
1. Agent creates `analysis-workspace/docs/HPXAPPS-9000/`
2. Docusaurus detects new folder (1-2 seconds)
3. Browser refreshes
4. New issue appears in sidebar automatically

## Metadata System for Filtering

### Simple Approach: Native Tags
```markdown
---
tags: [analysis, report, bug, HPXAPPS-1234, v1.2.0]
---
```

Benefits:
- Auto-generated tag pages
- Easy filtering
- Native Docusaurus support

### Advanced Approach: Custom Metadata
```markdown
---
custom_metadata:
  issue_id: "HPXAPPS-1234"
  classification: "bug"
  type: "analysis"
  status: "completed"
  version: "v1.2.0"
  repository: "Backend"
---
```

Benefits:
- Structured data
- Enables custom dashboard pages with React
- Richer filtering and visualization

## Custom Dashboard Page Concept

Create `src/pages/dashboard.js` with React hooks to filter/display issues:

```jsx
import { useGlobalData } from '@docusaurus/useGlobalData';

export default function Dashboard() {
  const globalData = useGlobalData();
  const allDocs = getAllDocs(globalData);
  
  // Filter by custom_metadata.classification
  const bugs = allDocs.filter(doc => 
    doc.frontMatter.custom_metadata?.classification === 'bug'
  );
  
  return (
    <Layout>
      <h1>Dashboard</h1>
      <h2>Bugs ({bugs.length})</h2>
      {bugs.map(bug => <IssueCard key={bug.id} doc={bug} />)}
    </Layout>
  );
}
```

## Agent Workflow Instructions

Agents should:

1. **Create issue folder**: `docs/[JIRA-ID]/`
2. **Create category file**: `_category_.json` with issue title
3. **Copy evidence**: Raw logs/screenshots to `evidence/` subfolder
4. **Generate artifacts**: Fill templates with frontmatter
5. **Reference sources**: Link to evidence files in analysis

Example workflow step:
```
1. Create folder: analysis-workspace/docs/HPXAPPS-9000/
2. Create evidence folder: analysis-workspace/docs/HPXAPPS-9000/evidence/
3. Copy user-provided logs to evidence/
4. Generate index.md (analysis report) with frontmatter
5. Generate implementation_plan.md with frontmatter
```

## Sidebar Auto-Generation

Docusaurus automatically generates sidebar from folder structure:

```
📁 JIRA Issue Analyses
├── 📁 HPXAPPS-1234: Payment Bug
│   ├── 📄 Analysis Report
│   ├── 📄 Implementation Plan
│   └── 📄 QA Validation
├── 📁 HPXAPPS-5678: Login Feature
│   ├── 📄 Analysis Report
│   └── 📄 Implementation Plan
```

Achieved through:
- Folder-based structure
- `_category_.json` for folder labels
- `sidebar_position` in frontmatter for ordering

## Evolution: What Actually Happened

### ✅ Successfully Implemented
- Docusaurus 3.7.0 project created
- Hot-reload working (port 3001, configurable)
- Auto-generated sidebar from folder structure
- Frontmatter with custom_metadata
- Example issue (HPXAPPS-EXAMPLE)
- Clean minimal structure (removed blog, tutorials)

### 🔄 Enhanced Beyond Original Concept
- **Input/output separation**: Added `.analysis-inputs/` for raw materials (not tracked)
- **HP Dev Agent branding**: Professional identity, not generic "Analysis Dashboard"
- **Development section**: Added `/development` for control files (PLAN, CODE-STATE, etc.)
- **Architecture documentation**: Created `.ai/ARCHITECTURE.md` explaining the system
- **Multi-port support**: `npm run start:custom -- --port 3005`

### 📝 Key Decisions Made

1. **Port 3001 default**: Avoids conflicts with common dev servers (3000, 8080)
2. **routeBasePath: '/'**: Makes docs the homepage (cleaner URLs)
3. **Yarn-only policy**: Faster, deterministic installs
4. **Git ignore `.analysis-inputs/`**: Privacy + clean history
5. **Custom metadata structure**: Enables future dashboard enhancements

## Dashboard Features Implemented

**Landing Page** (`docs/index.md`):
- Agent system overview (6 agents table)
- Workflow phases with approval gates
- Getting started guide
- Tips and best practices

**Navigation**:
- Top navbar: Dashboard, Issues, Agents, Workflows, Documentation
- Left sidebar: Auto-generated from folder structure
- Search: Top right (Algolia DocSearch ready)

**Theme**:
- Dark/light mode toggle
- Respects system preference
- HP Blue accents (#024AD8)

## Lessons Learned

1. **Frontmatter is mandatory**: Without it, Docusaurus throws errors
2. **File naming matters**: Lowercase with hyphens (`analysis-report.md`)
3. **MDX vs MD**: Using `.md` is simpler, `.mdx` enables React components
4. **Hot-reload has limits**: Changing `docusaurus.config.ts` requires restart
5. **Large files slow rendering**: Keep analyses focused, use evidence links

## Current Dashboard URL Structure

```
http://localhost:3001/                    # Homepage (dashboard)
http://localhost:3001/HPXAPPS-12345/      # Issue analysis
http://localhost:3001/development/        # Control files section
http://localhost:3001/development/plan    # Project plan
http://localhost:3001/development/specs   # Feature specifications
```

---

**Historical Significance**: This document captures the original dashboard design thinking. The hot-reload concept proved essential for real-time agent visualization. Input/output separation emerged as a critical enhancement during implementation.

**Current Status**: Dashboard fully operational with enhanced features. This document preserved for design rationale and architecture reference.

**Related Documents**:
- [Architecture](../../../.ai/ARCHITECTURE.md) - Input/output separation design
- [Phase 5 Summary](./phase-5-summary.md) - Dashboard implementation details
- [Docusaurus Config](../../../analysis-workspace/docusaurus.config.ts) - Current configuration
