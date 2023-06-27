import React from 'react';

import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Box, Button } from '../../ui-kit';
import AuthLayout from './AuthLayout';
import steps from './authSteps';

const AuthWelcome = () => {
  const [state, dispatch] = useAuth();

  const handleSubmit = async ({ step, type }) => {
    dispatch(updateAuth({ step, type }));
  };

  return (
    <AuthLayout>
      <Box flexDirection="row">
        <Button
          mr="base"
          title={'Login'}
          onClick={() => handleSubmit({ step: steps.Identity, type: 'login' })}
        />
        <Button
          title={'Sign up'}
          onClick={() => handleSubmit({ step: steps.Identity, type: 'signup' })}
        />
      </Box>
    </AuthLayout>
  );
};

export default AuthWelcome;
