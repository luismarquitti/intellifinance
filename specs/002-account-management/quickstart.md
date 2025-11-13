# Quick Start: Financial Account Management

This guide provides a brief overview of how to use the Financial Account Management feature.

## 1. Create an Account

To create a new financial account, send a `POST` request to the `/graphql` endpoint with the following mutation:

```graphql
mutation {
  createAccount(input: {
    name: "My Checking Account"
    type: CHECKING
    institution: "My Bank"
  }) {
    id
    name
    type
    institution
  }
}
```

## 2. Get Accounts

To retrieve a list of your financial accounts, send a `POST` request to the `/graphql` endpoint with the following query:

```graphql
query {
  accounts {
    id
    name
    type
    institution
  }
}
```

## 3. Update an Account

To update an existing financial account, send a `POST` request to the `/graphql` endpoint with the following mutation:

```graphql
mutation {
  updateAccount(id: "your-account-id", input: {
    name: "My Renamed Checking Account"
  }) {
    id
    name
  }
}
```

## 4. Delete an Account

To delete a financial account, send a `POST` request to the `/graphql` endpoint with the following mutation:

```graphql
mutation {
  deleteAccount(id: "your-account-id")
}
```
