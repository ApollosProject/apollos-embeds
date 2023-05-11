import React, { useState } from 'react';

import authSteps from './authSteps';
import { useForm, useRequestLogin, useRequestRegister } from '../../hooks';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Button, Input, SmallSystemText, Box } from '../../ui-kit';
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
        prevStep: state.step,
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
      heading={
        state.type === 'login' ? 'Welcome back!' : 'We’re glad you’re here.'
      }
      subHeading={
        state.type === 'login'
          ? 'Use the same phone number or email that you used when logging into the app before.'
          : 'If you’ve attended with us before, we’ll sync your history and help personalize what’s next.'
      }
    >
      <Input
        id="identity"
        placeholder="Phone or Email"
        value={values.identity || ''}
        handleOnChange={(text) => setFieldValue('identity', text)}
        required
        autoFocus={true}
        error={error?.identity}
        mb="xs"
      />
      <SmallSystemText fontWeight={700} color="text.secondary" mb="s">
        We’ll text or email you a code to continue.
      </SmallSystemText>
      <Button
        title={isLoading ? 'Submitting...' : 'Next'}
        onClick={handleSubmit}
        mt="base"
        mb="xs"
      />
      {state.type === 'login' ? (
        <>
          <SmallSystemText color="text.secondary" textAlign="center">
            Having trouble?
            <span>
              {' '}
              <Button
                display="inline"
                title="Create Account →"
                variant="link"
                size="micro"
                onClick={() => dispatch(updateAuth({ type: 'signup' }))}
              />
            </span>
          </SmallSystemText>
        </>
      ) : (
        <>
          <SmallSystemText color="text.secondary" textAlign="center">
            Already have an account?
            <span>
              {' '}
              <Button
                display="inline"
                title="Log in →"
                variant="link"
                size="micro"
                onClick={() => dispatch(updateAuth({ type: 'login' }))}
              />
            </span>
          </SmallSystemText>
        </>
      )}
    </AuthLayout>
  );
};

export default AuthIdentity;
