# 🔌 MCP Server Environment Setup Guide

**Purpose:** Configure Model Context Protocol (MCP) servers for the Multi-Persona Agent System

**Supported Platforms:** 
- ✅ Windows 10/11 with WSL2 (Ubuntu/Debian)
- ✅ Ubuntu/Debian Linux (native)
- ✅ macOS (Intel & Apple Silicon)

**Estimated Setup Time:** 30-45 minutes

---

## What is MCP?

**Model Context Protocol (MCP)** is a standard protocol that allows AI assistants (like GitHub Copilot) to connect to external tools and services. Think of MCP servers as specialized assistants that give the AI access to specific capabilities:

- **`atlassian-mcp`** - JIRA integration (fetch issues, create comments, update status)
- **`github-mcp`** - GitHub operations (fetch PRs, create PRs, manage repositories)

**⚠️ CRITICAL SAFETY RULE:**
All MCP **write operations** (create comment, update issue, create PR) require **explicit user approval** before execution. The agent will ALWAYS present the action and wait for your "yes" before proceeding.

---

## Architecture Overview

### Windows + WSL2

```
┌─────────────────────────────────────────────────┐
│ VS Code (Windows)                               │
│  └─ GitHub Copilot                              │
│      └─ Multi-Persona Agent System (.ai/)      │
│          │ MCP Protocol                          │
│          ↓                                       │
│  ┌──────────────────────────────────────┐      │
│  │ mcp.json (VS Code User Settings)     │      │
│  └──────────────────────────────────────┘      │
└──────────────────│──────────────────────────────┘
                   │ WSL Integration
                   ↓
┌─────────────────────────────────────────────────┐
│ WSL2 (Ubuntu)                                   │
│  └─ Docker Engine → MCP Containers             │
└─────────────────────────────────────────────────┘
```

### Ubuntu/Debian Linux (Native)

```
┌─────────────────────────────────────────────────┐
│ VS Code (Linux)                                 │
│  └─ GitHub Copilot                              │
│      └─ Multi-Persona Agent System (.ai/)      │
│          │ MCP Protocol (direct)                │
│          ↓                                       │
│  ┌──────────────────────────────────────┐      │
│  │ mcp.json (~/.config/Code/User/)      │      │
│  └──────────────────────────────────────┘      │
│          ↓                                       │
│  Docker Engine → MCP Containers                │
└─────────────────────────────────────────────────┘
```

### macOS

```
┌─────────────────────────────────────────────────┐
│ VS Code (macOS)                                 │
│  └─ GitHub Copilot                              │
│      └─ Multi-Persona Agent System (.ai/)      │
│          │ MCP Protocol (direct)                │
│          ↓                                       │
│  ┌──────────────────────────────────────┐      │
│  │ mcp.json (~/Library/Application      │      │
│  │          Support/Code/User/)         │      │
│  └──────────────────────────────────────┘      │
│          ↓                                       │
│  Docker Desktop/Colima → MCP Containers        │
└─────────────────────────────────────────────────┘
```

---

## Prerequisites by Platform

### Windows + WSL2

**Required:**
- ✅ Windows 10/11 with WSL2 enabled
- ✅ WSL2 with Ubuntu 22.04+ or Debian 11+
- ✅ VS Code with GitHub Copilot extension
- ✅ JIRA account with API token
- ✅ GitHub account with personal access token

**NOT Required:**
- ❌ Docker Desktop (we install Docker CE in WSL2)

### Ubuntu/Debian Linux

**Required:**
- ✅ Ubuntu 20.04+ or Debian 11+ (native installation)
- ✅ VS Code with GitHub Copilot extension
- ✅ JIRA account with API token
- ✅ GitHub account with personal access token

**NOT Required:**
- ❌ Docker Desktop (we install Docker CE natively)

### macOS

**Required:**
- ✅ macOS 11+ (Big Sur or later)
- ✅ VS Code with GitHub Copilot extension
- ✅ JIRA account with API token
- ✅ GitHub account with personal access token
- ✅ Homebrew package manager

**Choose ONE:**
- Option A: Docker Desktop for Mac (official, GUI)
- Option B: Colima (lightweight, CLI-only, free)

---

## Platform-Specific Setup Instructions

**Choose your platform:**

- **[Windows + WSL2](#windows--wsl2-setup)** → Go to Step 1A
- **[Ubuntu/Debian Linux](#ubuntudebian-linux-setup)** → Go to Step 1B  
- **[macOS](#macos-setup)** → Go to Step 1C

---

## Windows + WSL2 Setup

### Step 1A: Verify WSL2 Installation

#### 1A.1: Check WSL2 is installed

Open PowerShell and run:

```powershell
wsl --status
```

**Expected output:**
```
Default Distribution: Ubuntu-22.04
Default Version: 2
```

### 1.2: If WSL2 not installed:

```powershell
# Enable WSL
wsl --install

# Reboot Windows
Restart-Computer

# Set default version to 2
wsl --set-default-version 2

# Install Ubuntu
wsl --install -d Ubuntu-22.04
```

### 1.3: Access WSL2

```powershell
wsl
```

You should see Ubuntu terminal prompt: `user@hostname:~$`

---

## Step 2: Install Docker in WSL2 (No Docker Desktop)

**Why not Docker Desktop?**
- Docker Desktop requires license for enterprise use
- Docker Desktop adds unnecessary overhead
- Docker CE in WSL2 is lighter and faster

### 2.1: Run automated setup script

From your Windows terminal (PowerShell), navigate to `my_agent` directory:

```powershell
cd D:\luis\my_agent\my_agent

# Copy setup script to WSL2
wsl cp /mnt/d/luis/my_agent/my_agent/scripts/setup-wsl2-docker.sh ~/setup-wsl2-docker.sh

# Run setup script in WSL2
wsl bash ~/setup-wsl2-docker.sh
```

**The script will:**
1. Update Ubuntu packages
2. Install Docker CE
3. Configure Docker daemon
4. Add user to docker group
5. Start Docker service
6. Test Docker installation

### 2.2: Verify Docker installation

```bash
# In WSL2 terminal
docker --version
# Expected: Docker version 24.0.0+

docker ps
# Expected: Empty list (no containers running yet)
```

### 2.3: Test Docker with hello-world

```bash
docker run hello-world
```

**Expected output:**

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

**✅ Windows + WSL2 Docker setup complete!** → Continue to [Step 4: Configure MCP Servers](#step-4-configure-mcp-servers)

---

## Ubuntu/Debian Linux Setup

### Step 1B: Install Docker CE (Native Linux)

#### 1B.1: Update system packages

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

#### 1B.2: Install Docker CE

**Option A: Automated Script (Recommended)**

```bash
# Download and run Docker install script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Activate group changes (or logout/login)
newgrp docker
```

**Option B: Manual Installation**

```bash
# Install prerequisites
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### 1B.3: Verify Docker installation

```bash
docker --version
# Expected: Docker version 24.0.0+

docker ps
# Expected: Empty list (no containers running yet)
```

#### 1B.4: Test Docker

```bash
docker run --rm hello-world
```

**Expected:** "Hello from Docker!" message

**✅ Ubuntu/Debian Docker setup complete!** → Continue to [Step 4: Configure MCP Servers](#step-4-configure-mcp-servers)

---

## macOS Setup

### Step 1C: Install Docker (macOS)

**Choose ONE option:**

#### Option A: Docker Desktop (Official, GUI)

**Pros:** Official support, GUI, automatic updates  
**Cons:** Requires license for enterprise use, heavier resource usage

1. **Download:**
   - **Intel Mac:** <https://desktop.docker.com/mac/main/amd64/Docker.dmg>
   - **Apple Silicon:** <https://desktop.docker.com/mac/main/arm64/Docker.dmg>

2. **Install:**
   - Open `Docker.dmg`
   - Drag Docker to Applications folder
   - Launch Docker from Applications
   - Complete setup wizard

3. **Verify:**
   ```bash
   docker --version
   docker ps
   docker run --rm hello-world
   ```

#### Option B: Colima (Lightweight, CLI-only, Free)

**Pros:** Lightweight, free for enterprise, no GUI overhead  
**Cons:** CLI-only (no GUI), less polish

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Docker CLI and Colima:**
   ```bash
   brew install docker colima
   ```

3. **Start Colima:**
   ```bash
   # Start with default settings (2 CPU, 2GB RAM)
   colima start

   # Or customize resources:
   colima start --cpu 4 --memory 8
   ```

4. **Verify:**
   ```bash
   docker --version
   docker ps
   docker run --rm hello-world
   ```

5. **Colima management commands:**
   ```bash
   colima stop    # Stop Colima
   colima start   # Start Colima
   colima status  # Check status
   colima delete  # Remove VM (reset)
   ```

**✅ macOS Docker setup complete!** → Continue to [Step 4: Configure MCP Servers](#step-4-configure-mcp-servers)

---

## Step 4: Configure MCP Servers

**Platform-agnostic:** This step works the same on all platforms.

### 4.1: Pull MCP Docker images

Open your terminal (WSL2 on Windows, Terminal on macOS/Linux):

```bash
# Pull atlassian-mcp server
docker pull ghcr.io/sooperset/mcp-atlassian:latest

# Pull github-mcp server
docker pull ghcr.io/github/github-mcp-server:latest

# Verify images pulled
docker images | grep mcp
```

**Expected output:**

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

## Step 3: Configure MCP Servers

### 3.1: Pull MCP Docker images

From WSL2 terminal:

```bash
# Pull atlassian-mcp server
docker pull ghcr.io/sooperset/mcp-atlassian:latest

# Pull github-mcp server
docker pull ghcr.io/github/github-mcp-server:latest

# Verify images pulled
docker images | grep mcp
```

**Expected output:**
```
ghcr.io/sooperset/mcp-atlassian    latest    abc123def456   2 days ago    250MB
ghcr.io/github/github-mcp-server   latest    xyz789uvw012   1 week ago    180MB
```

### 3.2: Test MCP containers can run

```bash
# Test atlassian-mcp (should exit immediately, that's OK)
docker run --rm ghcr.io/sooperset/mcp-atlassian:latest --help

# Test github-mcp
docker run --rm ghcr.io/github/github-mcp-server:latest --help
```

If no errors, containers are ready.

---

## Step 4: Obtain API Credentials

### 4.1: JIRA API Token

1. Log into JIRA: `https://hp-jira.external.hp.com`
2. Go to: **Profile** → **Account Settings** → **Security**
3. Click: **Create and manage API tokens**
4. Click: **Create API token**
5. Name it: `mcp-agent-system`
6. Copy token (you'll only see it once)

**Save token securely** - you'll need it in Step 5.

### 4.2: GitHub Personal Access Token

1. Log into GitHub: `https://github.azc.ext.hp.com` (or github.com)
2. Go to: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Click: **Generate new token (classic)**
4. Name it: `mcp-agent-system`
5. Select scopes:
   - `repo` (full control)
   - `read:org` (read organization data)
   - `write:discussion` (for PR comments)
6. Click: **Generate token**
7. Copy token

**Save token securely** - you'll need it in Step 5.

---

## Step 5: Configure VS Code MCP Settings

**Platform-agnostic:** Works on all platforms with minor path differences.

### 5.1: Locate VS Code user settings directory

**Platform-specific paths:**

**Windows:**

```text
C:\Users\<YourUsername>\AppData\Roaming\Code\User\
```

**Linux (Ubuntu/Debian):**

```text
~/.config/Code/User/
```

**macOS:**

```text
~/Library/Application Support/Code/User/
```

### 5.2: Create or edit `mcp.json`

**If file exists:** Merge these configurations with your existing `mcp.json`

**If file doesn't exist:** Create new file at the path above with name `mcp.json`

### 5.3: Add MCP server configurations

**Platform-specific configurations:**

#### For Windows + WSL2

```json
{
  "servers": {
    "atlassian-mcp": {
      "command": "wsl",
      "args": [
        "docker",
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-atlassian",
        "-e",
        "JIRA_URL=${input:jira_url}",
        "-e",
        "JIRA_USERNAME=${input:jira_username}",
        "-e",
        "JIRA_API_TOKEN=${input:jira_api_token}",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "type": "stdio"
    },
    "github-mcp": {
      "command": "wsl",
      "args": [
        "docker",
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-github",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN=${input:github_token}",
        "-e",
        "GITHUB_HOST=${input:github_host}",
        "ghcr.io/github/github-mcp-server:latest"
      ],
      "type": "stdio"
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "github_host",
      "description": "GitHub Repository",
      "default": "https://github.azc.ext.hp.com"
    },
    {
      "type": "promptString",
      "id": "github_token",
      "description": "GitHub Personal Access Token",
      "password": true
    },
    {
      "type": "promptString",
      "id": "jira_url",
      "description": "JIRA Url",
      "default": "https://hp-jira.external.hp.com"
    },
    {
      "type": "promptString",
      "id": "jira_username",
      "description": "JIRA Email"
    },
    {
      "type": "promptString",
      "id": "jira_api_token",
      "description": "JIRA API Token",
      "password": true
    }
  ]
}
```

#### For Ubuntu/Debian Linux

```json
{
  "servers": {
    "atlassian-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-atlassian",
        "-e",
        "JIRA_URL=${input:jira_url}",
        "-e",
        "JIRA_USERNAME=${input:jira_username}",
        "-e",
        "JIRA_API_TOKEN=${input:jira_api_token}",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "type": "stdio"
    },
    "github-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-github",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN=${input:github_token}",
        "-e",
        "GITHUB_HOST=${input:github_host}",
        "ghcr.io/github/github-mcp-server:latest"
      ],
      "type": "stdio"
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "github_host",
      "description": "GitHub Repository",
      "default": "https://github.com"
    },
    {
      "type": "promptString",
      "id": "github_token",
      "description": "GitHub Personal Access Token",
      "password": true
    },
    {
      "type": "promptString",
      "id": "jira_url",
      "description": "JIRA Url",
      "default": "https://your-jira-instance.atlassian.net"
    },
    {
      "type": "promptString",
      "id": "jira_username",
      "description": "JIRA Email"
    },
    {
      "type": "promptString",
      "id": "jira_api_token",
      "description": "JIRA API Token",
      "password": true
    }
  ]
}
```

#### For macOS

```json
{
  "servers": {
    "atlassian-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-atlassian",
        "-e",
        "JIRA_URL=${input:jira_url}",
        "-e",
        "JIRA_USERNAME=${input:jira_username}",
        "-e",
        "JIRA_API_TOKEN=${input:jira_api_token}",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "type": "stdio"
    },
    "github-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-github",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN=${input:github_token}",
        "-e",
        "GITHUB_HOST=${input:github_host}",
        "ghcr.io/github/github-mcp-server:latest"
      ],
      "type": "stdio"
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "github_host",
      "description": "GitHub Repository",
      "default": "https://github.com"
    },
    {
      "type": "promptString",
      "id": "github_token",
      "description": "GitHub Personal Access Token",
      "password": true
    },
    {
      "type": "promptString",
      "id": "jira_url",
      "description": "JIRA Url",
      "default": "https://your-jira-instance.atlassian.net"
    },
    {
      "type": "promptString",
      "id": "jira_username",
      "description": "JIRA Email"
    },
    {
      "type": "promptString",
      "id": "jira_api_token",
      "description": "JIRA API Token",
      "password": true
    }
  ]
}
```

**Key differences:**

- **Windows:** Uses `"command": "wsl"` to call Docker inside WSL2
- **Linux/macOS:** Uses `"command": "docker"` directly (native Docker)

**Configuration explanation:**

- `"command"`: Platform-specific Docker invocation
- `"--rm"`: Container auto-deletes after execution (ephemeral)
- `"${input:jira_api_token}"`: VS Code prompts user for token (not hardcoded)
- `"password": true`: VS Code hides input for sensitive data
- `"type": "stdio"`: MCP servers communicate via standard input/output

### 5.3: Add MCP server configurations

**Edit `mcp.json` to include:**

```json
{
  "servers": {
    "atlassian-mcp": {
      "command": "wsl",
      "args": [
        "docker",
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-atlassian",
        "-e",
        "JIRA_URL=${input:jira_url}",
        "-e",
        "JIRA_USERNAME=${input:jira_username}",
        "-e",
        "JIRA_API_TOKEN=${input:jira_api_token}",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "type": "stdio"
    },
    "github-mcp": {
      "command": "wsl",
      "args": [
        "docker",
        "run",
        "-i",
        "--rm",
        "--name",
        "mcp-github",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN=${input:github_token}",
        "-e",
        "GITHUB_HOST=${input:github_host}",
        "ghcr.io/github/github-mcp-server:latest"
      ],
      "type": "stdio"
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "github_host",
      "description": "GitHub Repository",
      "default": "https://github.azc.ext.hp.com"
    },
    {
      "type": "promptString",
      "id": "github_token",
      "description": "GitHub Personal Access Token",
      "password": true
    },
    {
      "type": "promptString",
      "id": "jira_url",
      "description": "JIRA Url",
      "default": "https://hp-jira.external.hp.com"
    },
    {
      "type": "promptString",
      "id": "jira_username",
      "description": "JIRA Email"
    },
    {
      "type": "promptString",
      "id": "jira_api_token",
      "description": "JIRA API Token",
      "password": true
    }
  ]
}
```

**Configuration explanation:**
- `"command": "wsl"` - VS Code calls WSL to run Docker
- `"--rm"` - Container auto-deletes after execution
- `"${input:jira_api_token}"` - VS Code prompts user for token
- `"type": "stdio"` - MCP servers communicate via standard input/output

### 5.4: Secure credential handling

**IMPORTANT:**
- ❌ Do NOT hardcode tokens in `mcp.json`
- ✅ Use `"password": true` for sensitive inputs (VS Code hides input)
- ✅ Tokens are passed as environment variables to Docker containers
- ✅ Containers are ephemeral (`--rm` flag) - no persistent storage

---

## Step 6: Test MCP Connectivity

### 6.1: Run connectivity test script

From PowerShell:

```powershell
cd D:\luis\my_agent\my_agent

# Run test script
wsl bash scripts/test-mcp-connectivity.sh
```

**The script will:**
1. Test WSL2 accessibility
2. Test Docker is running
3. Test MCP images are available
4. Test containers can start
5. Generate connectivity report

**Expected output:**
```
✅ WSL2 accessible
✅ Docker running
✅ atlassian-mcp image found
✅ github-mcp image found
✅ atlassian-mcp container can start
✅ github-mcp container can start

🎉 MCP environment ready!
```

### 6.2: Test from VS Code

1. Open VS Code
2. Open GitHub Copilot Chat
3. Type: `@workspace can you list available MCP tools?`

**Expected response:**
```
Available MCP tools:
- mcp_atlassian-mcp_jira_get_issue
- mcp_atlassian-mcp_jira_search
- mcp_github_pull_request_get_detail
- mcp_github_pull_request_create
[... more tools ...]
```

If you see MCP tools listed, **configuration is successful** ✅

---

## Step 7: Using MCP Tools in Agent System

### 7.1: Agent personas reference MCP tools

**Example from TPM/PO Agent:**

```markdown
## Fetch JIRA Issue

Use MCP tool to get issue details:

```typescript
mcp_atlassian-mcp_jira_get_issue({
  provider: "jira",
  issue_key: "PROJ-1234"
})
```
```

### 7.2: Verify MCP tools in workflows

Check that workflows reference correct tool names:
- ✅ `mcp_atlassian-mcp_jira_get_issue` (correct)
- ❌ `fetch_jira_issue` (wrong - not an MCP tool)

### 7.3: Fallback if MCP unavailable

If MCP tools fail, agents should:
1. Inform user MCP servers not configured
2. Provide manual steps (e.g., "Open JIRA manually and copy issue details")
3. Reference this setup guide for configuration help

---

## Troubleshooting

### Issue 1: Docker not found in WSL2

**Symptom:** `bash: docker: command not found`

**Solution:**
```bash
# Re-run Docker setup script
bash ~/setup-wsl2-docker.sh

# Or install manually:
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Restart WSL2
exit
wsl --shutdown
wsl
```

### Issue 2: Permission denied when running docker

**Symptom:** `permission denied while trying to connect to the Docker daemon socket`

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Restart WSL2 to apply changes
exit
wsl --shutdown
wsl

# Test again
docker ps
```

### Issue 3: MCP tools not showing in Copilot

**Symptom:** `@workspace` doesn't show MCP tools

**Solution:**
1. Verify `mcp.json` location: `C:\Users\<You>\AppData\Roaming\Code\User\mcp.json`
2. Verify JSON is valid (no syntax errors)
3. Restart VS Code completely
4. Check GitHub Copilot extension is up to date

### Issue 4: JIRA connection failed

**Symptom:** `Error: Unable to connect to JIRA API`

**Possible causes:**
1. **Wrong JIRA URL** - Check: `https://hp-jira.external.hp.com` (no trailing slash)
2. **Invalid API token** - Regenerate token in JIRA
3. **Network/firewall** - Ensure JIRA accessible from WSL2:
   ```bash
   curl -I https://hp-jira.external.hp.com
   # Should return: HTTP/2 200
   ```

### Issue 5: GitHub connection failed

**Symptom:** `Error: Unable to connect to GitHub API`

**Possible causes:**
1. **Wrong GitHub host** - Check: `https://github.azc.ext.hp.com` or `https://github.com`
2. **Invalid token** - Verify token has `repo` scope
3. **Token expired** - Regenerate in GitHub settings

### Issue 6: Container exits immediately

**Symptom:** `docker ps` shows no running containers

**This is NORMAL.** MCP containers are ephemeral:
- They start when Copilot calls an MCP tool
- They process the request
- They exit immediately (`--rm` flag)

**To verify:**
```bash
# Watch containers in real-time (keep this running)
watch -n 1 docker ps

# In another terminal, trigger an MCP tool from Copilot
# You should briefly see mcp-atlassian or mcp-github appear
```

---

## Security Best Practices

### 1. Protect API Tokens
- ❌ NEVER commit `mcp.json` to git if it contains hardcoded tokens
- ✅ Use `"password": true` for all sensitive inputs
- ✅ Rotate tokens every 90 days

### 2. WSL2 Security
- ✅ Keep Ubuntu updated: `sudo apt update && sudo apt upgrade`
- ✅ Use strong password for WSL2 user
- ❌ Don't run Docker as root (use docker group)

### 3. Docker Security
- ✅ Use `--rm` flag (containers are ephemeral)
- ✅ Don't mount sensitive host directories
- ✅ Update Docker images regularly:
  ```bash
  docker pull ghcr.io/sooperset/mcp-atlassian:latest
  docker pull ghcr.io/github/github-mcp-server:latest
  ```

### 4. Network Security
- ✅ MCP containers should ONLY access intended APIs (JIRA, GitHub)
- ✅ Use corporate VPN if required
- ❌ Don't expose Docker daemon to network

---

## Automated Setup (One Command)

For users who want automated setup:

```powershell
cd D:\luis\my_agent\my_agent

# Run complete setup
wsl bash scripts/setup-complete-environment.sh
```

This will:
1. ✅ Install Docker in WSL2
2. ✅ Pull MCP images
3. ✅ Generate `mcp.json` template
4. ✅ Test connectivity
5. ✅ Output next steps

---

## Next Steps After Setup

1. **Test MCP tools work:**
   - Open VS Code
   - Chat: `@workspace fetch JIRA issue PROJ-1234`
   - Should use `mcp_atlassian-mcp_jira_get_issue`

2. **Run agent system:**
   - Open workspace with `.ai/` directory
   - Chat: `@workspace @01_tpm_po.agent.md analyze JIRA issue PROJ-1234`
   - TPM/PO agent should fetch JIRA details via MCP

3. **Review agent personas:**
   - Check `.ai/agents/*.agent.md` files reference MCP tools
   - Verify workflows include MCP tool calls

---

## Maintenance

### Weekly:
- ✅ Update Docker images: `docker pull ghcr.io/sooperset/mcp-atlassian:latest && docker pull ghcr.io/github/github-mcp-server:latest`

### Monthly:
- ✅ Update Ubuntu: `sudo apt update && sudo apt upgrade`
- ✅ Check API token expiry dates

### Quarterly:
- ✅ Rotate JIRA API token
- ✅ Rotate GitHub personal access token
- ✅ Review Docker security advisories

---

## Support & Resources

**Documentation:**
- [Model Context Protocol Specification](https://github.com/modelcontextprotocol/specification)
- [Docker in WSL2 Documentation](https://docs.docker.com/desktop/wsl/)
- [Atlassian MCP Server](https://github.com/sooperset/mcp-atlassian)
- [GitHub MCP Server](https://github.com/github/github-mcp-server)

**Internal Help:**
- `.ai/constitution.md` - System architecture and MCP integration
- `.ai/agents/*.agent.md` - How agents use MCP tools
- `.ai/workflows/*.md` - MCP tool usage in workflows

**Troubleshooting:**
- Run: `wsl bash scripts/test-mcp-connectivity.sh` for diagnostic report
- Check Docker logs: `docker logs mcp-atlassian` or `docker logs mcp-github`
- Verify JSON: Use [JSONLint](https://jsonlint.com/) to validate `mcp.json`

---

**Setup Guide Version:** 1.0.0  
**Last Updated:** 2025-11-10  
**Author:** Multi-Persona Agent System Team
