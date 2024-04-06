import React from 'react';

import { useAuth } from '../../providers/AuthProvider';
import { Box } from '../../ui-kit';
import Confirm from './AuthConfirm';
import Details from './AuthDetails';
import Merge from './AuthMerge';
import Identity from './AuthIdentity';
import authSteps from './authSteps';
import Welcome from './AuthWelcome';

function AuthManager(props = {}) {
  const [{ step }] = useAuth();

  const render = () => {
    switch (step) {
      case authSteps.Welcome: {
        return <Welcome {...props} />;
      }
      case authSteps.Identity: {
        return <Identity {...props} />;
      }
      case authSteps.Details: {
        return <Details {...props} />;
      }
      case authSteps.Merge: {
        return <Merge {...props} />;
      }
      case authSteps.Confirm: {
        return <Confirm {...props} />;
      }
      case authSteps.Success: {
        return null;
      }
      default: {
        return <Welcome {...props} />;
      }
    }
  };

  return <Box>{render()}</Box>;
}

AuthManager.propTypes = {};

export default AuthManager;
