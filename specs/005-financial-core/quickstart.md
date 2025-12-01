# Quickstart: Financial Core

## Prerequisites
- Node.js 18+
- PostgreSQL running
- `packages/database/.env` configured

## Setup
1. **Generate Prisma Client**:
   ```bash
   yarn db:generate
   ```

2. **Run Migrations**:
   ```bash
   yarn db:migrate
   ```

3. **Seed Data**:
   ```bash
   yarn db:seed
   ```

## Running the App
1. **Start Backend**:
   ```bash
   yarn workspace backend dev
   ```

2. **Start Frontend**:
   ```bash
   yarn workspace frontend dev
   ```

## Verification
- Visit `http://localhost:3000/transactions`
- Login with demo credentials (if applicable)
- Verify you see the transactions list and summary cards.
