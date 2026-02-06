#!/bin/bash

# Exit on erro
set -e

# Try to load NVM if present
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Checking prerequisites..."

# Check Node
if ! command -v node &> /dev/null; then
    echo "Node.js is NOT installed."
    exit 1
fi
echo "Node.js is installed."

# Ensure Linux Yarn is used
echo "Ensuring Linux Yarn is installed..."
npm install -g yarn
# Prepend global bin to PATH to override /mnt/c/...
export PATH="$(npm prefix -g)/bin:$PATH"

echo "Yarn path: $(which yarn)"
echo "Yarn version: $(yarn --version)"

# Check Docke
if ! command -v docker &> /dev/null; then
    echo "Docker is NOT installed or not in PATH."
    read -p "Continue anyway? (y/n) " -n 1 -
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo "Docker check skipped/passed."

echo "Installing dependencies..."
yarn install

echo "Building workspaces..."
yarn workspace @intellifinance/types build
yarn workspace @intellifinance/jobs build
yarn workspace @intellifinance/database build
yarn workspace @intellifinance/backend build
yarn workspace @intellifinance/worker build
yarn workspace @intellifinance/frontend build

echo "Building Docker containers..."
if command -v docker &> /dev/null; then
    docker compose build
else
    echo "Skipping 'docker compose build' as docker command is missing."
fi

echo -e "\nSetup complete! Run 'docker compose up' to start the application."
