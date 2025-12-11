import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import { useValidateLogin, useValidateRegister } from '../../hooks';
import { useAnalytics } from '../../providers/AnalyticsProvider';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Box, Button, Input } from '../../ui-kit';
import AuthLayout from './AuthLayout';
import authSteps from './authSteps';

const AuthConfirm = (props) => {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [state, dispatch] = useAuth();

  /* OTP */
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const codeLength = 6;

  const analytics = useAnalytics();

  useEffect(() => {
    setIsPinReady(otpCode.length === codeLength);

    return () => {
      setIsPinReady(false);
    };
  }, [otpCode]);

  const [validateLogin] = useValidateLogin();
  const [validateRegister] = useValidateRegister();

  const onError = () => {
    setStatus('ERROR');
    setError({
      passcode: 'The code you entered is incorrect.',
    });
  };

  const onSuccess = ({ token, user, sharedProfiles }) => {
    const needsOnboarding = isEmpty(user.firstName) || isEmpty(user.lastName);
    if (state.userExists) {
      analytics.track('UserLogin', {
        userId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phone: user?.phone,
      });
      if (needsOnboarding) {
        dispatch(updateAuth({ token, step: authSteps.Details }));
      } else {
        dispatch(updateAuth({ token, step: authSteps.Success }));
      }
    } else {
      if (sharedProfiles.length > 1) {
        analytics.track('ExistingUserRegister', {
          userId: user?.id,
          email: user?.email,
          phone: user?.phone,
          numberOfSharedProfiles: sharedProfiles.length,
        });
        dispatch(
          updateAuth({
            token,
            step: authSteps.Merge,
            userExists: true,
            sharedProfiles: sharedProfiles,
          })
        );
      } else {
        analytics.track('NewUserRegister', {
          userId: user?.id,
          email: user?.email,
          phone: user?.phone,
        });
        if (needsOnboarding) {
          dispatch(
            updateAuth({
              token,
              step: authSteps.Details,
              userExists: true,
              user,
            })
          );
        } else {
          dispatch(updateAuth({ token, step: authSteps.Success, userExists: true }));
        }
      }
    }
  };

  const handleSignInSubmit = async () => {
    setStatus('LOADING');
    try {
      if (state.userExists) {
        await validateLogin({
          variables: { identity: state.identity, otp: otpCode },
          update: (cache, { data: { validateLogin: { accessToken, person } = {} } = {} }) => {
            onSuccess({ token: accessToken, user: person });
          },
          onError,
        });
      } else {
        await validateRegister({
          variables: { identity: state.identity, otp: otpCode },
          update: (
            cache,
            { data: { validateRegister: { accessToken, person, sharedProfiles } = {} } = {} }
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
      {...props}
      heading="We sent you a code..."
      subHeading={`Verify the code we sent to your ${state.type === 'email' ? 'email' : 'phone'}.`}
    >
      <Box mb="base">
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
      <Button
        title={`Verify${isLoading ? 'ing...' : ''}`}

        // disabled={!isPinReady}
        onClick={handleSignInSubmit}
      />
    </AuthLayout>
  );
};

export default AuthConfirm;
