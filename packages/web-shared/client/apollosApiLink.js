import { ApolloLink } from '@apollo/client';

// Configures graphql requests so they are properly contextualized to
// a specific church in the  multi-tenant API.
const apollosApiLink = (church_slug) =>
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        'x-church': church_slug,
        'x-cache-me-not': 1,
      },
    }));

    return forward(operation);
  });

export default apollosApiLink;
