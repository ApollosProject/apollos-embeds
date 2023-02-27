import { fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import base64 from 'base-64';

import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '../config/keys';

const uri = (
  process.env.REACT_APP_APP_DATA_URL || 'https://cdn.apollos.app'
).replace('localhost');

let isRefreshing = false;
let pendingRequests = [];

const setIsRefreshing = (value) => {
  isRefreshing = value;
};

const addPendingRequest = (pendingRequest) => {
  pendingRequests.push(pendingRequest);
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const clearPendingRequests = () => {
  pendingRequests = [];
};

async function fetchNewAccessToken(church_slug) {
  const refreshToken = window.localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);

  if (!refreshToken) throw new Error('Refresh Token not found.');
  return fetch(uri, {
    method: 'POST',
    headers: {
      'x-church': church_slug,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
    mutation token($refreshToken: String!) {
      refreshSession(refreshToken: $refreshToken){
        accessToken
        refreshToken
      }
    }
    `,
      variables: { refreshToken },
    }),
  });
}

const checkIfUnauthenticatedError = (graphQLErrors) => {
  const expiredError = graphQLErrors.filter(
    (error) => error?.extensions?.code === 'UNAUTHENTICATED'
  );
  if (expiredError.length) return true;
  return false;
};

function getTokenIsExpired(token) {
  if (!token) return null;
  try {
    const encodedPayload = token.split('.')[1];
    const payload = JSON.parse(base64.decode(encodedPayload));
    const expiresAt = payload.exp;
    const now = new Date().getTime();
    return expiresAt * 1000 < now;
  } catch (e) {
    return null;
  }
}

function getAuthTokenFromOperation(operation) {
  const context = operation.getContext();
  const authHeader = context?.headers?.authorization;
  let authToken = null;
  if (authHeader) {
    authToken = authHeader.replace('Bearer ', '');
  }
  return authToken;
}

const buildErrorLink = (onAuthError, church_slug) =>
  onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const hasUnauthenticatedError =
        checkIfUnauthenticatedError(graphQLErrors);
      const token = getAuthTokenFromOperation(operation);
      const tokenIsExpired = getTokenIsExpired(token);
      if (hasUnauthenticatedError && token && tokenIsExpired) {
        if (!isRefreshing) {
          setIsRefreshing(true);
          let newToken = null;
          return fromPromise(
            fetchNewAccessToken(church_slug)
              .then((res) => {
                return res.json();
              })
              .then((response) => {
                newToken = response?.data?.refreshSession?.accessToken;
                if (newToken) {
                  return window.localStorage.setItem(AUTH_TOKEN_KEY, newToken);
                }
                throw new Error('Token could not be refreshed.');
              })
              .then(() => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${newToken}`,
                  },
                });
                return forward(operation);
              })
              .catch(() => {
                clearPendingRequests();
                setIsRefreshing(false);
                onAuthError();
              })
          ).flatMap(() => {
            resolvePendingRequests();
            setIsRefreshing(false);

            return forward(operation);
          });
        }
        return fromPromise(
          new Promise((resolve) => {
            addPendingRequest(() => resolve());
          })
        ).flatMap(() => {
          return forward(operation);
        });
      }
    }
    if (networkError) return null;
    return null;
  });

export default buildErrorLink;
