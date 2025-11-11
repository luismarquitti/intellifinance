# Migration Guide: npm to Yarn

This document provides a step-by-step guide to migrating your project from npm to Yarn. The project is a monorepo with multiple packages (`backend`, `frontend`, `doc`, and potentially `worker`), so the migration will be performed in each package directory.

## 1. Prerequisites

Before you begin, ensure you have Yarn installed on your system. If you don't, you can install it globally using npm:

```bash
npm install -g yarn
```

You can verify the installation by running:

```bash
yarn --version
```

## 2. Migration Steps

### Step 2.1: Remove `package-lock.json` Files

The `package-lock.json` file is specific to npm. Yarn uses its own lock file, `yarn.lock`. You need to delete all existing `package-lock.json` files.

Run the following commands from the project root:

```bash
rm backend/package-lock.json
rm frontend/package-lock.json
rm doc/package-lock.json
```

### Step 2.2: Clean `node_modules` Directories

To ensure a clean installation with Yarn, it's best to remove all existing `node_modules` directories.

```bash
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm -rf doc/node_modules
# Add this if the worker directory has a package.json
# rm -rf worker/node_modules
```

### Step 2.3: Install Dependencies with Yarn

Now, run `yarn install` in each package directory. This will read the `package.json` file, install the dependencies, and create a `yarn.lock` file.

```bash
cd backend
yarn install

cd ../frontend
yarn install

cd ../doc
yarn install

# If the worker directory has a package.json, also run it there
# cd ../worker
# yarn install
```

### Step 2.4: Update `.gitignore`

Yarn can produce its own cache and log files. It's a good practice to add them to your `.gitignore` file.

Add the following lines to the root `.gitignore` file:

```
# Yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
.pnp.*
yarn-error.log
```

## 3. Post-Migration

### Step 3.1: Review and Commit

*   Review the changes to ensure everything is working as expected.
*   The new `yarn.lock` files should be committed to your repository.
*   Commit the changes to `.gitignore`.

### Step 3.2: Update Scripts and CI/CD

*   In your `package.json` scripts, you can now use `yarn` instead of `npm`. For example, `npm run dev` becomes `yarn dev`. While `npm run` still works, it's good to be consistent.
*   Update any CI/CD pipelines or other build scripts that might be using `npm` commands. For example, change `npm install` to `yarn install` and `npm test` to `yarn test`.

### Step 3.3: Update Documentation

Review project documentation (like `README.md` and `GEMINI.md`) to replace any references to `npm` with `yarn`. For example, update setup instructions from `npm install` to `yarn install`.
