import React, { useState } from 'react';

import authSteps from './authSteps';
import { useForm, useRequestLogin, useRequestRegister } from '../../hooks';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Box, Button } from '../../ui-kit';
import { validateEmail, validatePhoneNumber } from '../../utils';

import AuthLayout from './AuthLayout';

const AuthIdentity = () => {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [state, dispatch] = useAuth();

  const onSuccess = ({ identity, type, userExists, userProfile, nextStep }) => {
    setStatus('SUCCESS');
    dispatch(
      updateAuth({
        identity,
        type,
        userExists,
        userProfile,
        step: nextStep,
      })
    );
  };

  const [requestRegister] = useRequestRegister();
  const [requestLogin] = useRequestLogin({
    fetchPolicy: 'network-only',
    onCompleted: async (data) => {
      const { identity } = values;
      const userExists = data?.requestLogin.result !== 'NO_USER';

      const validEmail = validateEmail(identity);

      if (!userExists) {
        try {
          requestRegister({
            variables: {
              identity: validEmail ? { email: identity } : { phone: identity },
            },
          });
          onSuccess({
            identity: validEmail ? { email: identity } : { phone: identity },
            userExists: false,
            nextStep: authSteps.Confirm,
            type: validEmail ? 'email' : 'phone',
          });
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      } else {
        onSuccess({
          identity: validEmail ? { email: identity } : { phone: identity },
          userExists: true,
          nextStep: authSteps.Confirm,
          type: validEmail ? 'email' : 'phone',
        });
      }
    },
  });

  const { values, handleSubmit, setFieldValue } = useForm(() => {
    const { identity } = values;
    const validEmail = validateEmail(identity);
    const validPhoneNumber = validatePhoneNumber(identity);
    const validIdentity = validEmail || validPhoneNumber;

    if (validIdentity) {
      setStatus('LOADING');
      requestLogin({
        variables: {
          identity: validEmail
            ? { email: values.identity }
            : { phone: values.identity },
        },
      });
    } else {
      setStatus('ERROR');
      setError({ identity: 'Please enter a valid email or phone number.' });
    }
  });

  const isLoading = status === 'LOADING';

  return (
    <AuthLayout
      heading={state.type === 'login' ? 'Login' : 'Sign up'}
      subHeading={`Enter your email or phone number to ${
        state.type === 'login' ? 'log in' : 'sign up'
      }. We will send you a code to verify your identity.`}
    >
      <Box mt="xxl">
        <input
          id="identity"
          placeholder="Enter your email or phone number..."
          maxLength={128}
          value={values.identity || ''}
          error={error?.identity}
          onChange={(text) => setFieldValue('identity', text)}
          mb="base"
          mt="l"
        />
        <Box alignSelf="center">
          <Button
            title={isLoading ? 'Submitting...' : 'Submit'}
            disabled={!values.identity}
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default AuthIdentity;
