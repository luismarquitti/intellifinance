# HP Dev Agent - Analysis Workspace

> Real-time Docusaurus dashboard for AI agent analysis and implementation tracking

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Start Dashboard (Default Port)

```bash
npm start
```

Opens at: **http://localhost:3001** 🎉

### Start Dashboard (Custom Port)

If port 3001 is already in use, specify a different port:

```bash
npm run start:custom -- --port 3005
```

Replace `3005` with any available port.

---

## 📋 Available Scripts

| Command | Description | Port |
|---------|-------------|------|
| `npm start` | Start dev server with hot-reload | 3001 (default) |
| `npm run start:custom -- --port PORT` | Start with custom port | User-specified |
| `npm run build` | Build for production | N/A |
| `npm run serve` | Serve production build | 3001 (default) |
| `npm run serve:custom -- --port PORT` | Serve with custom port | User-specified |
| `npm run clear` | Clear Docusaurus cache | N/A |

---

## 🎯 How It Works

### Hot-Reload Magic

1. **Terminal 1**: Run `npm start`
2. **Terminal 2**: HP Dev Agent writes analysis to `docs/[JIRA-ID]/`
3. **Browser**: Dashboard updates automatically in real-time! ✨

Most changes are reflected live without having to restart the server.

### Agent Workflow

```
docs/HPXAPPS-12345/
├── index.md                 # TPM/PO Agent writes analysis report
├── implementation_plan.md   # Architect Agent writes plan
├── qa_validation_report.md  # QA Agent writes validation
├── pull_request.md          # Writer Agent writes PR description
└── commit_message.md        # Writer Agent writes commit message
```

---

## 🏗️ Build for Production

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

---

## 🚀 Deployment

### Using SSH:

```bash
USE_SSH=true npm run deploy
```

### Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Error: "Port 3001 is already in use"
# Solution: Use custom port
npm run start:custom -- --port 3002
```

### Dashboard Not Updating

```bash
# Stop: Ctrl+C
# Clear cache:
npm run clear

# Restart:
npm start
```

---

## 📚 Documentation

- **Dashboard Guide**: Open http://localhost:3001 after `npm start` for comprehensive guide
- **System Architecture**: `../.ai/ARCHITECTURE.md`
- **Quick Start**: `../QUICK_START.md`
- **Agent Constitution**: `../.ai/constitution.md`

---

**HP Dev Agent** - Multi-Persona AI Agent System  
**Version**: 1.0  
**Last Updated**: 2025-11-10
