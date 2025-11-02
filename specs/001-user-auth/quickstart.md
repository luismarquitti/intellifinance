# Quickstart: User Authentication API

This guide explains how to use the User Authentication API.

## Register a new user

To register a new user, send a `POST` request to the `/graphql` endpoint with the following mutation:

```graphql
mutation {
  register(email: "user@example.com", password: "password123") {
    accessToken
    refreshToken
    user {
      id
      email
    }
  }
}
```

## Log in

To log in, send a `POST` request to the `/graphql` endpoint with the following mutation:

```graphql
mutation {
  login(email: "user@example.com", password: "password123") {
    accessToken
    refreshToken
    user {
      id
      email
    }
  }
}
```

## Refresh an access token

To refresh an access token, send a `POST` request to the `/graphql` endpoint with the following mutation:

```graphql
mutation {
  refreshToken(token: "your-refresh-token") {
    accessToken
    refreshToken
    user {
      id
      email
    }
  }
}
```

## Log out

To log out, send a `POST` request to the `/graphql` endpoint with the following mutation. This will invalidate the refresh token on the server.

```graphql
mutation {
  logout
}
```
