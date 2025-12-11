import { InMemoryCache } from '@apollo/client/core';
import { persistCache } from 'apollo3-cache-persist';

import { uri } from './httpLink';

const initCache = async (initialState, { church }) => {
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-church': church,
    },
    body: JSON.stringify({
      query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
    }),
  });

  const { data } = await res.json();

  /* eslint no-underscore-dangle: 0 */
  data.__schema.types = await data.__schema.types.filter((type) => type.possibleTypes !== null);

  const possibleTypes = {};
  data.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = [...supertype.possibleTypes.map((subtype) => subtype.name)];
    }
  });

  const cache = new InMemoryCache({
    possibleTypes,
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
                incoming?.pageInfo?.endCursor === existing?.pageInfo?.endCursor ||
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
