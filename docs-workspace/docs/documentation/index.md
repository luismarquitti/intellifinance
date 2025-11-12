---
sidebar_position: 1
title: "📚 Documentation & Quick Start"
description: 'Complete guide to HP Dev Agent - Multi-Persona AI Agent System'
custom_metadata:
  type: "overview"
  category: "documentation"
  status: "active"
slug: /documentation
---

## 🎯 What is HP Dev Agent?

**HP Dev Agent** is a standalone multi-persona AI agent system designed for comprehensive JIRA issue analysis and implementation. It provides a gated workflow system with six specialized agent personas, five distinct workflows, and a real-time Docusaurus dashboard for displaying analysis results.

### Key Features

- **🤖 Multi-Persona System** - Six specialized agents working together
- **🔒 Gated Workflow** - Four-phase approval system prevents runaway actions
- **📊 Real-Time Dashboard** - Docusaurus-powered analysis dashboard
- **🔗 MCP Integration** - JIRA and GitHub MCP server connectivity
- **📁 Input/Output Separation** - Clean architecture for materials and results

## 🚀 Quick Start

### Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager
- VS Code with GitHub Copilot
- MCP servers configured (atlassian-mcp, github-mcp)

### Starting the Dashboard

```powershell
# Navigate to dashboard project
cd analysis-workspace

# Install dependencies (first time only)
yarn install

# Start dashboard (default port 3001)
yarn start

# Or use custom port
yarn run start:custom -- --port 3005
```

Dashboard URL: `http://localhost:3001`

## 👥 Agent Personas

The system includes six specialized agents:

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Orchestrator** | Coordinator | Workflow routing, delegation, approval gates |
| **TPM/PO** | Product Management | Issue triage, requirements analysis |
| **Architect** | Technical Design | Architecture decisions, design patterns |
| **Developer** | Implementation | Coding, testing, execution |
| **QA** | Quality Assurance | Test planning, validation |
| **Writer** | Documentation | PR descriptions, commit messages |

## 🔄 Workflow Phases

All operations follow a **four-phase gated protocol**:

1. **Phase 1: Analysis** → Generate analysis report → ⏸️ **STOP - Require Approval**
2. **Phase 2: Planning** → Generate implementation plan → ⏸️ **STOP - Require Approval**
3. **Phase 3: Implementation** → Execute changes + tests → ⏸️ **STOP - Require Approval**
4. **Phase 4: Documentation** → Generate PR/commit messages → ⏸️ **STOP - Require Approval**

:::warning Critical Rule
**NEVER skip approval gates** - even for "simple" tasks. This prevents autonomous actions without user oversight.
:::

## 📁 Folder Structure

### Input Files (Not Tracked)

Location: `.analysis-inputs/[JIRA-ID]/`

User-provided materials for analysis:

```text
.analysis-inputs/
└── HPXAPPS-12345/
    ├── logs/               # Log files, error traces
    ├── screenshots/        # UI screenshots, diagrams
    ├── attachments/        # Files from JIRA
    ├── raw-description.md  # Pasted JIRA content
    └── notes.md           # User annotations
```

### Output Files (Tracked)

Location: `analysis-workspace/docs/[JIRA-ID]/`

Agent-generated analysis and documentation:

```text
analysis-workspace/docs/jira-issues/
└── HPXAPPS-12345/
    ├── index.md                     # Analysis report (RCA)
    ├── implementation_plan.md       # Development roadmap
    ├── qa_validation_report.md      # QA validation
    ├── pull_request.md              # PR description
    └── commit_message.md            # Commit message
```

## 🎯 Analyzing a JIRA Issue

### Step 1: Prepare Input Materials

```powershell
# Create input folder
New-Item -ItemType Directory -Path ".analysis-inputs/HPXAPPS-12345" -Force

# Add materials
Copy-Item "C:\path\to\error.log" ".analysis-inputs/HPXAPPS-12345/logs/"
Copy-Item "C:\path\to\screenshot.png" ".analysis-inputs/HPXAPPS-12345/screenshots/"
```

### Step 2: Invoke Agent System

In GitHub Copilot Chat:

```text
@HP Dev Agent, analyze JIRA issue HPXAPPS-12345 using materials in .analysis-inputs/HPXAPPS-12345/
```

### Step 3: Review Outputs

Check `analysis-workspace/docs/jira-issues/HPXAPPS-12345/index.md` for the analysis report.

## 🔗 MCP Server Integration

HP Dev Agent integrates with MCP servers for external operations:

- **atlassian-mcp** - JIRA operations (fetch issues, add comments, transition status)
- **github-mcp** - GitHub operations (fetch PRs, create PRs, manage repos)

:::danger Safety Rule
ALL write operations (git commit, push, PR creation, JIRA transitions) require explicit user approval. Agents MUST stop and request approval before executing.
:::

## 📖 Additional Documentation

Explore the sidebar for detailed documentation on:

- **Agent System** - Detailed agent persona definitions
- **Workflows** - Five workflow patterns and use cases
- **Architecture** - System design and principles
- **Constitution** - Core rules and constraints
- **Templates** - Output templates and formats
- **MCP Setup** - Platform-specific MCP configuration

## 🛠️ Key Commands

```powershell
# Start dashboard
cd analysis-workspace && yarn start

# Build for production
cd analysis-workspace && yarn build

# Serve production build
cd analysis-workspace && yarn serve

# Custom port
cd analysis-workspace && yarn run start:custom -- --port 3005
```

## 🎨 HP Dev Agent Branding

- **Project Name**: "HP Dev Agent"
- **Primary Color**: HP Blue (#024AD8)
- **Tagline**: "Multi-Persona AI Agent System for JIRA Issue Analysis & Implementation"

## 📝 Project Conventions

### Package Management

**Yarn is REQUIRED** - never use npm:

```powershell
# ✅ CORRECT
yarn install
yarn add package-name

# ❌ WRONG
npm install
npm install package-name
```

### Plan Tracking

`PLANS.md` is the source of truth for all multi-step work. Always update it after each interaction.

### File Naming

- Lowercase with hyphens: `my-file.md`
- Agent files: `00_orchestrator.agent.md`
- Workflow files: `wf_01_triage.workflow.md`

## 🆘 Getting Help

For issues or questions:

1. Check the **Development** section for current status
2. Review **Agent** definitions for persona capabilities
3. Consult **Workflow** documentation for process guidance
4. Review the **Constitution** for core rules

---

**Version**: 1.0  
**Last Updated**: November 11, 2025  
**System Status**: ✅ Operational
