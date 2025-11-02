import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Assuming the backend is running on port 4000
  cache: new InMemoryCache(),
});

export const REGISTER_USER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      success
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

export const registerUser = async (variables: any) => {
  return client.mutate({
    mutation: REGISTER_USER,
    variables,
  });
};

export const loginUser = async (variables: any) => {
  return client.mutate({
    mutation: LOGIN_USER,
    variables,
  });
};

export const logoutUser = async (variables: any) => {
  return client.mutate({
    mutation: LOGOUT_USER,
    variables,
  });
};

export const refreshToken = async (variables: any) => {
  return client.mutate({
    mutation: REFRESH_TOKEN,
    variables,
  });
};
