# Environment Setup Guide (Ubuntu) — IntelliFinance

Absolutely — here is a complete environment setup guide for a new developer joining the IntelliFinance project, using Ubuntu.

This guide is designed to take a clean Ubuntu installation to a "desired development-ready state" following our team's best practices.

## 📄 Environment Setup Guide — IntelliFinance

For: New Developer

From: (Architect / TPM)

Subject: Setting up your machine for IntelliFinance development (Ubuntu and Windows)

Welcome to the team! This guide contains steps and commands to configure your development environment on either Ubuntu (Linux) or Windows. The goal is to standardize tools so you can clone the repository and get productive quickly.

Follow the steps in order and choose the instructions for your operating system. Commands are provided in ready-to-copy blocks for each platform.

## 1. System update and essential utilities

Keep your OS updated and install basic developer utilities. Choose the section for your OS below.

### Ubuntu / Debian

```bash
# Update package lists and upgrade installed packages
sudo apt update && sudo apt upgrade -y

# Install essential utilities
# build-essential: required to compile native Node.js modules (npm)
# git: version control system
# curl/wget: download tools
# gnupg, ca-certificates, lsb-release: needed to add third-party repositories (Docker, GitHub, etc.)
sudo apt install -y git curl wget gnupg ca-certificates lsb-release build-essential
```

### Windows (PowerShell)

On Windows 10/11, we recommend using the native package manager `winget` (available on recent Windows releases) or Chocolatey. You can also use WSL2 for a Linux-like environment — see the Docker/WSL section below.

Example using winget (package IDs may vary; use `winget search <name>` if an ID differs):

```powershell
# Update Windows (open Settings → Update & Security) or use PowerShell module for Windows Update
# Install core tools via winget (examples)
winget install --interactive --exact Git.Git
winget install --interactive --exact OpenJS.NodeJS.LTS
winget install --interactive --exact Python.Python.3
```

If `winget` isn't available, install Chocolatey and use `choco install` commands. Example (run as Administrator):

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Then install packages (example)
choco install -y git nodejs-lts python
```

## 2. Programming runtimes (Node.js and Python)

To avoid version conflicts we don't install Node.js via apt. We use a version manager.

### 2.1 Node.js (via NVM — Node Version Manager)

This lets us switch Node.js versions per-project.

```bash
# Download and run the NVM install script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Activate NVM in the CURRENT shell (restart terminal after this step)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Restart your terminal or run: source ~/.bashrc

# Install the LTS Node.js version (example: v18)
nvm install 18
nvm use 18
nvm alias default 18

# Install Yarn (our preferred package manager)
npm install -g yarn
```

### 2.2 Python & pip

Ubuntu ships with Python 3. Ensure pip and venv are installed.

```bash
sudo apt install -y python3-pip python3-venv
```

### Windows notes — Node & Python

On Windows you have multiple options:

- Install Node.js LTS with the official installer or via `winget` / Chocolatey.
- Use nvm-windows (a Windows port of nvm) to manage Node versions: [nvm-windows](https://github.com/coreybutler/nvm-windows)

Example: install Node LTS with winget (if available):

```powershell
winget install --interactive --exact OpenJS.NodeJS.LTS
```

Install Yarn using npm once Node is installed:

```powershell
npm install -g yarn
```

Install Python via the Microsoft Store, the official installer, or `winget`/Chocolatey:

```powershell
winget install --interactive --exact Python.Python.3
```

## 3. Containerization (Docker and Docker Compose)

We use Docker for local databases (Postgres and Redis). Install Docker from the official repository to obtain the latest version.

```bash
# 1. Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 2. Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 3. Install Docker Engine and Compose
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. POST-INSTALL STEP (Important!)
# Add your user to the 'docker' group so you can run docker without sudo
sudo usermod -aG docker $USER
```

Important: You must log out and log back in (or restart) for the group change to take effect.

### Windows (Docker Desktop & WSL2)

On Windows, install Docker Desktop (recommended). Docker Desktop uses WSL2 on modern Windows systems. Follow these steps:

1. Install WSL2 and a Linux distribution (optional but recommended for development):

```powershell
# Install WSL and default distro (run in Administrator PowerShell)
wsl --install
# After restart, you may need to set WSL2 as default
wsl --set-default-version 2
```

2. Install Docker Desktop (download from Docker Hub or use winget/choco if available). After installation, enable WSL2 integration in Docker Desktop settings.

3. Add your user to the `docker-users` group if prompted and restart the machine.

Notes:

- Docker Desktop will provide Docker Engine + Compose on Windows. When using WSL2, it's best to run services inside the WSL2 distro or use the Docker contexts that integrate with WSL.
- If you prefer a full Linux environment for development, use WSL2 and follow the Ubuntu instructions inside the WSL shell.

## 4. Developer tools (VS Code, Postman, GitHub CLI)

### 4.1 VS Code and Postman (via snap)

Snap is an easy way to install and keep these tools updated on Ubuntu.

```bash
# Install VS Code
sudo snap install code --classic

# Install Postman (for API testing)
sudo snap install postman
```

### Windows (Installers / winget)

Use the official installers, `winget`, or Chocolatey:

```powershell
# Install VS Code
winget install --interactive --exact Microsoft.VisualStudioCode

# Install Postman
winget install --interactive --exact Postman.Postman
```

### 4.2 GitHub CLI (`gh`)

Used to interact with GitHub (PRs, issues) from the terminal.

```bash
# Add the GitHub CLI repository
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# Install 'gh'
sudo apt update
sudo apt install gh -y
```

Windows example using winget / choco:

```powershell
# Install GitHub CLI
winget install --interactive --exact GitHub.cli
# or with Chocolatey (Admin): choco install -y github-cli
```

## 5. AI tooling (Google Cloud SDK / Gemini CLI)

To use the Gemini CLI and other Google tools, install the Google Cloud SDK.

```bash
# Add Google Cloud repository
sudo apt install -y apt-transport-https
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# Install the SDK
sudo apt update
sudo apt install google-cloud-sdk -y
```

Manual action: After installation, initialize the SDK and log in with your Google account:

```bash
# gcloud init
```

### Windows (Google Cloud SDK)

Install the Google Cloud SDK using the Windows installer from Google or via `winget` / Chocolatey.

```powershell
# Example with winget (interactive)
winget install --interactive --exact Google.CloudSDK
```

Then run:

```powershell
gcloud init
```

## 6. VS Code configuration (recommended extensions)

Open VS Code and use the integrated terminal (Ctrl+Shift+`) to run the following commands. These will install command-line extensions to help standardize the development environment.

```bash
# Linters and formatters (project defaults)
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension EditorConfig.EditorConfig

# AI assistants (Copilot and Gemini)
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension Google.gemini
code --install-extension Google.ai-toolkit

# Language and project utilities
code --install-extension apollographql.vscode-apollo    # Useful for GraphQL
code --install-extension ms-azuretools.vscode-docker    # Docker integration in the IDE
code --install-extension DavidAnson.vscode-markdownlint  # Markdown linting
code --install-extension tamasfe.even-better-toml       # TOML file support (configs)
code --install-extension ms-vscode-remote.remote-containers # If we need dev containers
```

These `code --install-extension` commands work on both Ubuntu and Windows when run in a shell where `code` is available (VS Code command-line utility).

## 7. Final steps: Git and SSH setup

### 7.1 Configure Git

Open a terminal and set your name and email (use the same email as your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

On Windows PowerShell the same commands apply.

### 7.2 Authenticate GitHub CLI and SSH

This is the last step. Use `gh` to authenticate; it can also help configure SSH keys for GitHub.

```bash
gh auth login

# If 'gh' does not configure SSH automatically, generate and add a key manually:
ssh-keygen -t ed25519 -C "your-email@example.com"
cat ~/.ssh/id_ed25519.pub
# Copy the public key output above and paste it into GitHub: https://github.com/settings/keys
```

On Windows use PowerShell to run `gh auth login`. If you generated keys with `ssh-keygen` on Windows, the public key can be shown with:

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

## ✅ Final verification

If you made it this far, your environment should be ready.

Check that:

- Restart your terminal (or the computer) so the Docker group change applies.
- Run `docker ps` — you should not get a "permission denied" error.
- Run `node -v` and `yarn -v` — you should see the expected versions.
- Run `gh auth status` — you should be logged in.

Next step: clone the IntelliFinance repository and run `docker-compose up` from the project root.

Welcome aboard!

### Windows verification checklist

- Restart your machine after Docker Desktop / group changes.
- Run `docker ps` from PowerShell (if Docker Desktop is running) — you should not get a permission error.
- Run `node -v` and `yarn -v` in PowerShell or WSL.
- Run `gh auth status` to verify GitHub CLI authentication.

If you are using WSL2, also verify things inside your WSL shell (for example, `docker ps` inside WSL if you've enabled integration).
