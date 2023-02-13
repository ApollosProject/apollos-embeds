import React, { useState, useEffect } from 'react';

import { useForm, useUpdateProfileFields, useCurrentUser } from '../../hooks';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Box, Button, Input } from '../../ui-kit';
import authSteps from '../Auth/authSteps';

import AuthLayout from './AuthLayout';

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function AuthDetails() {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [state, dispatch] = useAuth();
  const [updateProfileFields] = useUpdateProfileFields();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

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
      dispatch(updateAuth({ step: authSteps.Success }));
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
      <Box textAlign="left">
        {user?.profile?.firstName === null ? (
          <Box mb="base">
            <Input
              id="firstName"
              placeholder="First Name"
              handleOnChange={(text) => setFieldValue('firstName', text)}
              required
              error={error?.identity}
            />
          </Box>
        ) : null}
        {!user?.profile?.lastName ? (
          <Box mb="base">
            <Input
              id="lastName"
              placeholder="Last Name"
              handleOnChange={(text) => setFieldValue('lastName', text)}
              required
              error={error?.identity}
            />
          </Box>
        ) : null}
        {!user?.profile?.gender ? (
          <Box mb="base">
            <Input
              id="gender"
              placeholder="Gender"
              handleOnChange={(text) => setFieldValue('gender', text)}
              required
              error={error?.identity}
            />
          </Box>
        ) : null}
        {!user?.profile?.birthDate ? (
          <Box mb="base">
            <Input
              id="birthDate"
              placeholder="Birthdate"
              handleOnChange={(text) => setFieldValue('birthDate', text)}
              required
              error={error?.identity}
            />
          </Box>
        ) : null}
      </Box>
      <Button
        status={status}
        title={`Finish${isLoading ? 'ing...' : ''}`}
        onClick={handleSubmit}
        disabled={!(values.firstName && values.lastName) || isLoading}
      />
    </AuthLayout>
  );
}

export default AuthDetails;
