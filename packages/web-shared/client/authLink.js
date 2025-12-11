import { setContext } from '@apollo/client/link/context';

import { AUTH_TOKEN_KEY } from '../config/keys';

export default setContext(async (request, { headers }) => {
  let authToken = null;
  try {
    if (typeof window !== 'undefined') {
      authToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    }
    if (!authToken) return {};

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Authorization Failed', err);
    return {};
  }
});
