import React, { useEffect, useState } from 'react';

import { useValidateLogin } from '../../hooks';
// import amplitude from '../../libs/amplitude';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '../../ui-kit';
import AuthLayout from './AuthLayout';
import AuthOTP from './AuthOTP';
import authSteps from './authSteps';

const AuthConfirm = () => {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [state, dispatch] = useAuth();

  /* OTP */
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const codeLength = 6;

  const router = useNavigate();
  const [validateLogin] = useValidateLogin();

  const onError = () => {
    setStatus('ERROR');
    setError({
      passcode: 'The code you entered is incorrect.',
    });
  };

  const onSuccess = ({ token, user }) => {
    setStatus('SUCCESS');

    if (state.userExists) {
      dispatch(updateAuth({ token }));
      // amplitude.trackEvent({
      //   eventName: 'UserLogin',
      //   properties: {
      //     userId: user?.profile?.id,
      //     firstName: user?.profile?.firstName,
      //     lastName: user?.profile?.lastName,
      //     nickName: user?.profile?.nickName,
      //     email: user?.profile?.email,
      //     campusName: user?.profile?.campus?.name || null,
      //   },
      // });
      router.push('/welcome');
    } else {
      dispatch(
        updateAuth({ token, step: authSteps.Details, userExists: true })
      );
    }
  };

  const handleSignInSubmit = async () => {
    setStatus('LOADING');

    try {
      await validateLogin({
        variables: { identity: state.identity, otp: otpCode },
        update: (
          cache,
          { data: { validateLogin: { accessToken, person } = {} } = {} }
        ) => {
          onSuccess({ token: accessToken, user: person });
        },
        onError,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const isLoading = status === 'LOADING';

  return (
    <AuthLayout
      heading="Enter your code"
      subHeading={`We sent a one-time confirmation code to your ${
        state.type === 'email' ? 'email' : 'phone'
      }.`}
    >
      <Box mt="xxl">
        <Box mt="xl" mb="base">
          <AuthOTP
            code={otpCode}
            codeLength={codeLength}
            error={error?.passcode}
            isPinReady={isPinReady}
            setCode={setOTPCode}
            setIsPinReady={setIsPinReady}
          />
        </Box>
        <Box alignSelf="center">
          <Button
            title={isLoading ? 'Signing in...' : 'Sign in'}
            disabled={!isPinReady}
            onClick={handleSignInSubmit}
          />
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default AuthConfirm;
