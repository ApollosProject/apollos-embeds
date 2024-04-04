import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import authSteps from '../components/Auth/authSteps';
import { ANONYMOUS_ID, AUTH_REFRESH_TOKEN_KEY, AUTH_TOKEN_KEY } from '../config/keys';
import { useApolloClient } from '@apollo/client';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  initialized: false,
  authenticated: false,
  identity: null,
  step: authSteps.Welcome,
  token: null,
  refreshToken: null,
  type: null,
  userExists: false,
  onSuccess: () => false,
  userProfile: [],
  sharedProfiles: [],
  anonymousId: null,
};

const actionTypes = {
  update: 'update',
  logout: 'logout',
  reset: 'reset',
};

const update = (payload) => ({
  type: 'update',
  payload,
});

const logout = () => ({
  type: 'logout',
});

const reset = () => ({
  type: 'reset',
});

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.update: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actionTypes.logout: {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      return {
        ...initialState,
        initialized: true,
      };
    }
    case actionTypes.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider(props = {}) {
  const client = useApolloClient();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { initialized, authenticated, token, refreshToken, anonymousId } = state;

  // Initialize auth state
  useEffect(() => {
    function restoreAuthentication() {
      const storedToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
      const storedRefreshToken = window.localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
      const storedAnonymousId = window.localStorage.getItem(ANONYMOUS_ID);

      if (storedToken) {
        dispatch(
          update({
            initialized: true,
            authenticated: true,
            token: storedToken,
            refreshToken: storedRefreshToken,
            anonymousId: storedAnonymousId,
          })
        );
      } else {
        dispatch(update({ initialized: true, authenticated: false }));
      }
    }

    if (!initialized) {
      restoreAuthentication();
    }
  }, [initialized]);

  // Respond to changes in auth state (login/logout)
  useEffect(() => {
    function setTokensInLocalStorage() {
      if (token && token !== window.localStorage.getItem(AUTH_TOKEN_KEY)) {
        window.localStorage.setItem(AUTH_TOKEN_KEY, token);
        client.refetchQueries({ include: 'active' });

        if (!authenticated) {
          dispatch(update({ authenticated: true }));
        }
      }
      if (refreshToken) {
        window.localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
      }
      if (!anonymousId) {
        const storedAnonymousId = window.localStorage.getItem(ANONYMOUS_ID);
        dispatch(update({ anonymousId: storedAnonymousId }));
      }
    }
    setTokensInLocalStorage();
  }, [token, refreshToken, authenticated, anonymousId]);

  useEffect(() => {
    function getAnonymousId() {
      const storedAnonymousId = window.localStorage.getItem(ANONYMOUS_ID);
      if (storedAnonymousId) {
        dispatch(
          update({
            anonymousId: storedAnonymousId,
          })
        );
      } else {
        const newAnonymousId = uuidv4();
        window.localStorage.setItem(ANONYMOUS_ID, newAnonymousId);
        dispatch(
          update({
            anonymousId: newAnonymousId,
          })
        );
      }
    }
    getAnonymousId();
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{props.children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

// const state = useAuthState();
function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

// const dispatch = useAuthDispatch();
function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

// const [state, dispatch] = useAuth();
function useAuth() {
  const context = [useAuthState(), useAuthDispatch()];
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export {
  AuthProvider as default,
  useAuth,
  useAuthState,
  useAuthDispatch,
  actionTypes,
  update,
  logout,
  reset,
};
