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
      await completeRegister({ variables: { profileInput: userProfile } });

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
        <Box mb="base">
          <Input
            id="firstName"
            placeholder="First Name"
            handleOnChange={(text) => setFieldValue('firstName', text)}
            required
            error={error?.firstName}
            editable={!isLoading}
          />
        </Box>

        <Box mb="base">
          <Input
            id="lastName"
            placeholder="Last Name"
            handleOnChange={(text) => setFieldValue('lastName', text)}
            required
            error={error?.lastName}
            editable={!isLoading}
          />
        </Box>
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
