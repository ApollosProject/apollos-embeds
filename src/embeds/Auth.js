import React from 'react';
import { AuthManager } from '../components';
import { AUTH_TOKEN_KEY } from '../config/keys';
import { useAuth } from '../providers/AuthProvider';
import authSteps from '../components/Auth/authSteps';

const Auth = (props) => {
  const [{ step }] = useAuth();

  if (
    process.env.REACT_APP_ENABLE_AUTH === 'true' &&
    !window.localStorage.getItem(AUTH_TOKEN_KEY)
  ) {
    return <AuthManager />;
  }
  if (
    step === authSteps.Success &&
    window.localStorage.getItem(AUTH_TOKEN_KEY)
  ) {
    return null;
  }
  return null;
};

Auth.propTypes = {};

export default Auth;
