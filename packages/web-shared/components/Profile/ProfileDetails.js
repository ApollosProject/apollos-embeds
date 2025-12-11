import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useForm, useUpdateProfileFields, useCurrentUser } from '../../hooks';
import { Box, Button, Input } from '../../ui-kit';

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ProfileDetails({ setShowDetails, ...props }) {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const { currentUser } = useCurrentUser();
  const [updateProfileFields] = useUpdateProfileFields();

  useEffect(() => {
    setStatus('IDLE');
    setError(null);
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
      await updateProfileFields({
        variables: { input: userProfile },
      });
      setShowDetails(false);
      setStatus('SUCCESS');
    } catch (e) {
      onError(e);
      console.log(JSON.stringify(e));
    }
  });

  const isLoading = status === 'LOADING';

  return (
    <Box id="profileDetails">
      <Box mb="l" display="flex" flexDirection="column">
        <Box mb="base">
          <Input
            id="firstName"
            placeholder="First Name"
            value={values.firstName || currentUser?.profile?.firstName || ''}
            handleOnChange={(text) => {
              setFieldValue('firstName', text);
            }}
            required
            error={error?.identity}
          />
        </Box>

        <Box mb="xl">
          <Input
            id="lastName"
            placeholder="Last Name"
            value={values.lastName || currentUser?.profile?.lastName || ''}
            handleOnChange={(text) => {
              setFieldValue('lastName', text);
            }}
            required
            error={error?.identity}
          />
        </Box>

        <Button
          title={isLoading ? 'Saving' : 'Save'}
          type="submit"
          onClick={() => handleSubmit()}
          disabled={!currentUser || !(values.firstName || values.lastName) || isLoading}
        />
      </Box>
    </Box>
  );
}

ProfileDetails.propTypes = {
  currentPerson: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ProfileDetails;
