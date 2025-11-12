---
sidebar_position: 1
---

# Gemini CLI Integration

Gemini CLI provides command-line access to Google's Gemini AI models for IntelliFinance development.

## Installation

```bash
# Install Gemini CLI globally
npm install -g @google/generative-ai-cli

# Or use with npx
npx @google/generative-ai-cli
```

## Configuration

Set up your API key:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

## Common Commands

### Chat Mode
```bash
gemini chat
```

### Code Analysis
```bash
gemini analyze src/components/MyComponent.tsx
```

### Generate Tests
```bash
gemini generate-tests src/services/auth.service.ts
```

## Integration with Agent System

Gemini CLI can be used alongside the agent system for:

- Quick code explanations
- Generating boilerplate code
- Analyzing complex algorithms
- Suggesting improvements

## Custom Commands

IntelliFinance has custom Gemini commands in `.gemini/commands/`:

- `analyze-architecture` - Analyze system architecture
- `generate-tests` - Generate test suites
- `review-code` - Perform code review

## Reference

- Full guide: Root `GEMINI.md`
- Configuration: `.gemini/` directory
