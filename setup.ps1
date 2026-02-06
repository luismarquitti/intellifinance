
Write-Host "Checking prerequisites..."

# Check Node
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "Node.js is installed." -ForegroundColor Green
}
else {
    Write-Host "Node.js is NOT installed." -ForegroundColor Red
    exit 1
}

# Check Yarn
if (Get-Command yarn -ErrorAction SilentlyContinue) {
    Write-Host "Yarn is installed." -ForegroundColor Green
}
else {
    Write-Host "Yarn is NOT installed. Installing..." -ForegroundColor Yellow
    npm install -g yarn
}

# Check Docker
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "Docker is installed." -ForegroundColor Green
}
else {
    Write-Host "Docker command not found in PowerShell. Assuming running in WSL or alternative setup." -ForegroundColor Yellow
    Write-Host "Note: 'docker compose build' step might fail if docker is not accessible." -ForegroundColor Yellow
}

Write-Host "Installing dependencies..."
yarn install

Write-Host "Building workspaces..."
yarn workspace @intellifinance/types build
yarn workspace @intellifinance/jobs build
yarn workspace @intellifinance/database build
yarn workspace @intellifinance/backend build
yarn workspace @intellifinance/worker build
yarn workspace @intellifinance/frontend build

Write-Host "Building Docker containers..."
docker compose build

Write-Host "Setup complete! Run 'docker compose up' to start the application." -ForegroundColor Green
