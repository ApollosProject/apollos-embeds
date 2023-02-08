import { ApolloClient, ApolloLink } from '@apollo/client';
import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '../config/keys';

import apollosApiLink from './apollosApiLink';
import authLink from './authLink';
import httpLink from './httpLink';
import initCache from './initCache';
import buildErrorLink from './buildErrorLink';

let storeIsResetting = false;
const onAuthError = async () => {
  if (!storeIsResetting) {
    storeIsResetting = true;
    window.localStorage.clear(AUTH_TOKEN_KEY);
    window.localStorage.clear(AUTH_REFRESH_TOKEN_KEY);
  }
  storeIsResetting = false;
};

const cache = initCache();
const errorLink = buildErrorLink(onAuthError);
const link = ApolloLink.from([apollosApiLink, errorLink, authLink, httpLink]);

const client = new ApolloClient({
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
console.log('client', client);
export default client;
