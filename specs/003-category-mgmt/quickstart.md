# Quickstart: Category Management (CRUD)

## Prerequisites
- Node.js, npm
- PostgreSQL, Redis
- Environment variables set (see backend/.env.example)
- Backend, frontend, and worker dependencies installed

## Setup
```sh
# Start infrastructure
npm install -g npm-run-all
npm run infra:up

# Backend
cd backend
npm install
npm run db:migrate
npm run dev

# Worker
cd ../worker
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Usage
- Log in as an authenticated user
- Create, view, edit, and delete categories from the UI
- Categories support parent/child (subcategories) structure

## API Reference
- See `/contracts/category.graphql` for schema
