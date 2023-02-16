import React from 'react';
import { AuthManager } from '../components';
import { AUTH_TOKEN_KEY } from '../config/keys';

const Auth = () => {
  if (window.localStorage.getItem(AUTH_TOKEN_KEY)) {
    return null;
  }
  return <AuthManager />;
};

Auth.propTypes = {};

export default Auth;
