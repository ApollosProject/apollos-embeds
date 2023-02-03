import React, { useState } from 'react';

import authSteps from './authSteps';
import { useForm, useRequestLogin, useRequestRegister } from '../../hooks';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Box, Button, Card, H2, H5, Input } from '../../ui-kit';
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
    <Box
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      background="red"
      zIndex={9999}
      justifyContent="center"
      display="flex"
      alignItems="center"
      backgroundColor="neutral.gray6"
    >
      <Card p="l" display="flex" flexDirection="column" width="440px">
        <H2>We’re glad you’re here.</H2>
        <H5>
          If you’ve attended with us before, we’ll sync your history and help
          personalize what’s next.
        </H5>
        <Input
          id="email"
          placeholder="Phone or Email"
          required
          autoFocus={true}
        />
        <Button
          title={isLoading ? 'Submitting...' : 'Submit'}
          onClick={handleSubmit}
          mt="base"
        />
      </Card>
    </Box>
  );
};

export default AuthIdentity;
