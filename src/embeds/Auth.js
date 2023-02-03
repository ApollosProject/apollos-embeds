import React from 'react';
import { AuthManager } from '../components';
import { AUTH_TOKEN_KEY } from '../config/keys';

const Auth = (props) => {
  if (
    process.env.REACT_APP_ENABLE_AUTH === 'true' &&
    !window.localStorage.getItem(AUTH_TOKEN_KEY)
  ) {
    return <AuthManager />;
  }
  return null;
};

Auth.propTypes = {};

export default Auth;
