import React, { useState, useEffect } from 'react';

import {
  useForm,
  useUpdateProfileFields,
  useCurrentUser,
  useCompleteRegister,
} from '../../hooks';
import { update as updateAuth, useAuth } from '../../providers/AuthProvider';
import { Box, Button, Input, Select } from '../../ui-kit';
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
  const [completeRegister] = useCompleteRegister();
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
      await completeRegister();

      dispatch(updateAuth({ step: authSteps.Success }));
    } catch (e) {
      onError(e);
      console.log(JSON.stringify(e));
    }
  });

  const isLoading = status === 'LOADING';
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Prefer not to say', label: 'Prefer not to say' },
  ];

  const isProfileCompleted =
    user?.profile?.firstName &&
    user?.profile?.lastName &&
    user?.profile?.gender &&
    user?.profile?.birthDate
      ? true
      : false;

  return (
    <AuthLayout
      heading={
        user && isProfileCompleted ? 'Welcome back!' : 'Complete your profile'
      }
      subHeading={
        user && isProfileCompleted
          ? 'Your login has been verified.'
          : 'Help us learn a little more about you so we can connect you with the best ministries and events.'
      }
    >
      <Box textAlign="left">
        {!isProfileCompleted ? (
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
        {!isProfileCompleted ? (
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
        {!isProfileCompleted ? (
          <Box mb="base">
            <Select
              id="gender"
              placeholder="Gender"
              options={genderOptions}
              handleOnChange={(text) => setFieldValue('gender', text)}
              required
              error={error?.identity}
            />
          </Box>
        ) : null}
        {!isProfileCompleted ? (
          <Box mb="base">
            <Input
              id="birthDate"
              type="date"
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
        disabled={
          !user ||
          !(
            isProfileCompleted ||
            (values.firstName &&
              values.lastName &&
              values.gender &&
              values.birthDate)
          ) ||
          isLoading
        }
      />
    </AuthLayout>
  );
}

export default AuthDetails;
