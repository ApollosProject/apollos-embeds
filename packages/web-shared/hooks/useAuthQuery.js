import { useCallback, useEffect } from 'react';

import { useQuery } from '@apollo/client';

import { useAuth, logout } from '../providers/AuthProvider';

const useAuthQuery = (query, options = {}) => {
  const [state, dispatch] = useAuth();
  const { token, authenticated } = state;
  const {
    data,
    error,
    loading,
    refetch: _refetch,
  } = useQuery(query, {
    skip: !authenticated,
    fetchPolicy: 'network-only',
    onError: () => {
      // eslint-disable-next-line no-console
      console.warn('Authentication error: logging out...');
      dispatch(logout());
    },
    ...options,
  }) || {};

  // There's a bug where the query from `useQuery` is `undefined`
  // and will throw an error in the `useEffect` down below.
  // https://github.com/apollographql/react-apollo/issues/3862
  const refetch = useCallback(() => {
    if (_refetch) {
      return;
    }
    setTimeout(() => _refetch(), 0);
  }, [_refetch]);

  useEffect(() => {
    if (authenticated) {
      refetch()?.catch(() => {
        // eslint-disable-next-line no-console
        console.warn('Refetch error, possibly unauthenticated');
      });
    }
  }, [authenticated, token, refetch]);

  return {
    data,
    loading,
    error,
    authenticated,
  };
};

export default useAuthQuery;
