import React, { useEffect, useState } from 'react';

import { useForm, useUpdateProfileFields } from '../../hooks';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Box, Button, Input } from '../../ui-kit';

import { useNavigate } from 'react-router-dom';

import AuthLayout from './AuthLayout';

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function AuthDetails() {
  const router = useNavigate();
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [state, dispatch] = useAuth();
  const [updateProfileFields] = useUpdateProfileFields();

  const onError = (e) => {
    setStatus('ERROR');
    setError(e);
  };

  const { values, handleSubmit, setFieldValue } = useForm(async () => {
    setStatus('LOADING');

    const userProfile = Object.keys(values).map((key) => ({
      field: upperFirst(key),
      value: values[key],
    }));

    try {
      dispatch(
        updateAuth({
          userProfile,
        })
      );
      await updateProfileFields({ variables: { input: userProfile } });
      router.push('/welcome');
    } catch (e) {
      onError(e);
      console.log(JSON.stringify(e));
    }
  });

  const isLoading = status === 'LOADING';

  return (
    <AuthLayout
      heading="Complete your profile"
      subHeading="Help us learn a little more about you so we can connect you with the
      best ministries and events."
    >
      <Box mt="xxl">
        <Box mt="l" textAlign="left">
          <Box mb="base">
            <Input
              id="firstName"
              placeholder="First Name"
              handleOnChange={(text) => setFieldValue('firstName', text)}
              required
              autoFocus={true}
              error={error?.identity}
            />
          </Box>
          <Box mb="l">
            <Input
              id="lastName"
              placeholder="Last Name"
              handleOnChange={(text) => setFieldValue('lastName', text)}
              required
              autoFocus={true}
              error={error?.identity}
            />
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="flex-end">
          <Button
            status={status}
            title={`Finish${isLoading ? 'ing...' : ''}`}
            onClick={handleSubmit}
            disabled={!(values.firstName && values.lastName) || isLoading}
          />
        </Box>
      </Box>
    </AuthLayout>
  );
}

export default AuthDetails;
