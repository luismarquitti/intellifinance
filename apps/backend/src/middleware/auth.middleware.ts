import { rule, shield, allow } from 'graphql-shield';

const isAuthenticated = rule()((parent, args, ctx, info) => {
  return ctx.user !== null;
});

export const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    register: allow,
    login: allow,
    refreshToken: allow,
  },
});
