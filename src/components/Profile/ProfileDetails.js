import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useForm, useUpdateProfileFields, useCurrentUser } from '../../hooks';
import { Box, Button, Input } from '../../ui-kit';

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ProfileDetails(props) {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

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
      await updateProfileFields({ variables: { input: userProfile } });
    } catch (e) {
      onError(e);
      console.log(JSON.stringify(e));
    }
  });

  const isLoading = status === 'LOADING';
  const { firstName, lastName } = user || {};

  return (
    <Box as="form" id="profileDetails" onSubmit={handleSubmit}>
      <Box mb="l">
        <Box mb="base">
          <Input
            id="firstName"
            placeholder="First Name"
            value={values.firstName || firstName || ''}
            handleOnChange={(text) => setFieldValue('firstName', text)}
            required
            error={error?.identity}
          />
        </Box>

        <Box mb="base">
          <Input
            id="lastName"
            placeholder="Last Name"
            value={values.lastName || lastName || ''}
            handleOnChange={(text) => setFieldValue('lastName', text)}
            required
            error={error?.identity}
          />
        </Box>

        <Button
          title={`Finish${isLoading ? 'ing...' : ''}`}
          type="submit"
          disabled={
            !user || !(values.firstName && values.lastName) || isLoading
          }
        />
      </Box>
    </Box>
  );
}

ProfileDetails.propTypes = {
  currentPerson: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ProfileDetails;
