import React, { useState, useCallback } from 'react';

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
  const [checked, setChecked] = useState(false);

  const onChange = () => setChecked(!checked);

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
  const [requestLogin] = useRequestLogin();

  const { values, handleSubmit, setFieldValue } = useForm(() => {
    const { identity } = values;
    const validEmail = validateEmail(identity);
    const validPhoneNumber = validatePhoneNumber(identity);
    const validIdentity = validEmail || validPhoneNumber;

    if (validIdentity) {
      setStatus('LOADING');
      if (state.type === 'login') {
        try {
          requestLogin({
            variables: {
              identity: validEmail
                ? { email: values.identity }
                : { phone: values.identity },
            },
          });
          onSuccess({
            identity: validEmail ? { email: identity } : { phone: identity },
            userExists: true,
            nextStep: authSteps.Confirm,
            type: validEmail ? 'email' : 'phone',
          });
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      }
      if (state.type === 'signup') {
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
      }
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
      <Box display="flex" mb="base" alignItems="baseline">
        <Box
          as="input"
          id="policy"
          type="radio"
          mr="xxs"
          key="policy"
          value={checked}
          checked={checked === true}
          onClick={onChange}
          onChange={onChange}
        />

        <SmallSystemText color="text.secondary">
          I agree to the{' '}
          <Box as="span" display="inline" fontWeight={700}>
            terms of use
          </Box>{' '}
          and{' '}
          <Box as="span" display="inline" fontWeight={700}>
            privacy policy
          </Box>{' '}
          laid out by this church.
        </SmallSystemText>
      </Box>
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
            Already have an account?
            <span>
              {' '}
              <Button
                display="inline"
                title="Log in →"
                type="link"
                size="micro"
              />
            </span>
          </SmallSystemText>
        </>
      ) : (
        <>
          <SmallSystemText color="text.secondary" textAlign="center">
            Having trouble?
            <span>
              {' '}
              <Button
                display="inline"
                title="Create Account →"
                type="link"
                size="micro"
              />
            </span>
          </SmallSystemText>
        </>
      )}
    </AuthLayout>
  );
};

export default AuthIdentity;
