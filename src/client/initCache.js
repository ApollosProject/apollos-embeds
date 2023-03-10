import { InMemoryCache } from '@apollo/client/core';
import { persistCache } from 'apollo3-cache-persist';

import fragmentTypes from './fragmentTypes.json';
import introspectionToPossibleTypes from './introspectionToPossibleTypes';

const initCache = (initialState) => {
  const cache = new InMemoryCache({
    possibleTypes: introspectionToPossibleTypes(fragmentTypes),
    typePolicies: {
      Query: {
        fields: {
          search: {
            // Make sure to separate search queries results when filters change
            keyArgs: ['query'],
            merge(existing, incoming) {
              if (!existing) {
                return incoming;
              }
              if (
                incoming?.pageInfo?.endCursor ===
                  existing?.pageInfo?.endCursor ||
                existing?.edges.length === existing?.totalCount
              ) {
                return existing;
              }
              return {
                ...incoming,
                edges: [...existing?.edges, ...incoming?.edges],
              };
            },
          },
        },
      },
      ContentChannel: {
        fields: {
          childContentItemsConnection: {
            keyArgs: ['id'],
            merge(existing, incoming) {
              if (!existing) {
                return incoming;
              }
              if (incoming.pageInfo.endCursor === existing.pageInfo.endCursor) {
                return existing;
              }
              return {
                ...incoming,
                edges: [...existing?.edges, ...incoming?.edges],
              };
            },
          },
        },
      },
    },
  }).restore(initialState || {});

  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: window.localStorage,
    });
  }

  return cache;
};

export default initCache;
