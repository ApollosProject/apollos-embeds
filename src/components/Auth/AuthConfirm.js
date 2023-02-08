import React, { useEffect, useState } from 'react';

import { useValidateLogin, useValidateRegister } from '../../hooks';
// import amplitude from '../../libs/amplitude';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input } from '../../ui-kit';
import AuthLayout from './AuthLayout';

import authSteps from './authSteps';

const AuthConfirm = () => {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [state, dispatch] = useAuth();

  /* OTP */
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const codeLength = 6;

  useEffect(() => {
    setIsPinReady(otpCode.length === codeLength);

    return () => {
      setIsPinReady(false);
    };
  }, [otpCode]);

  const navigate = useNavigate();
  const [validateLogin] = useValidateLogin();
  const [validateRegister] = useValidateRegister();

  const onError = () => {
    setStatus('ERROR');
    setError({
      passcode: 'The code you entered is incorrect.',
    });
  };

  const onSuccess = ({ token, user, sharedProfiles }) => {
    setStatus('SUCCESS');
    if (state.userExists) {
      dispatch(updateAuth({ token, step: authSteps.Success }));
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
    } else {
      if (sharedProfiles.length > 1) {
        dispatch(
          updateAuth({
            token,
            step: authSteps.Merge,
            userExists: true,
            sharedProfiles: sharedProfiles,
          })
        );
      } else {
        dispatch(
          updateAuth({
            token,
            step: authSteps.Details,
            userExists: true,
          })
        );
      }
    }
  };

  const handleSignInSubmit = async () => {
    setStatus('LOADING');
    try {
      if (state.userExists) {
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
      } else {
        await validateRegister({
          variables: { identity: state.identity, otp: otpCode },
          update: (
            cache,
            {
              data: {
                validateRegister: { accessToken, person, sharedProfiles } = {},
              } = {},
            }
          ) => {
            onSuccess({
              token: accessToken,
              user: person,
              sharedProfiles,
            });
          },
          onError,
        });
      }
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
          <Input
            id="passcode"
            placeholder="6-Digit Code"
            value={otpCode || ''}
            handleOnChange={(text) => setOTPCode(text)}
            required
            maxLength={codeLength}
            autoFocus={true}
            error={error?.passcode}
          />
        </Box>
        <Box alignSelf="center">
          <Button
            title={isLoading ? 'Signing in...' : 'Sign in'}
            // disabled={!isPinReady}
            onClick={handleSignInSubmit}
          />
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default AuthConfirm;
