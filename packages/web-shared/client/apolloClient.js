import { ApolloClient, ApolloLink } from '@apollo/client';
import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '../config/keys';

import apollosApiLink from './apollosApiLink';
import authLink from './authLink';
import httpLink from './httpLink';
import initCache from './initCache';
import buildErrorLink from './buildErrorLink';

const client = async (church_slug) => {
  let storeIsResetting = false;
  const onAuthError = async () => {
    if (!storeIsResetting) {
      storeIsResetting = true;
      window.localStorage.clear(AUTH_TOKEN_KEY);
      window.localStorage.clear(AUTH_REFRESH_TOKEN_KEY);
    }
    storeIsResetting = false;
  };

  const cache = await initCache(null, { church: church_slug });
  const errorLink = buildErrorLink(onAuthError, church_slug);
  const link = ApolloLink.from([apollosApiLink(church_slug), errorLink, authLink, httpLink]);

  return new ApolloClient({
    link,
    cache,
    queryDeduplication: false,
    shouldBatch: true,
    version: '0.0.1',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};

export default client;
