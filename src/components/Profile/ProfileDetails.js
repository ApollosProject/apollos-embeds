import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useForm, useUpdateProfileFields, useCurrentUser } from '../../hooks';
import { Box, Button, Input } from '../../ui-kit';
import { GET_CURRENT_USER } from '../../hooks/useCurrentUser';

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ProfileDetails(props) {
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
        update: (
          cache,
          {
            data: {
              updateProfileFields: { firstName, lastName },
            },
          }
        ) => {
          const data = cache.readQuery({ query: GET_CURRENT_USER });

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: {
              currentUser: {
                ...data.currentUser,
                profile: {
                  ...data.currentUser.profile,
                  firstName,
                  lastName,
                },
              },
            },
          });
        },
      });
      setStatus('SUCCESS');
    } catch (e) {
      onError(e);
      console.log(JSON.stringify(e));
    }
  });

  const isLoading = status === 'LOADING';

  return (
    <Box id="profileDetails">
      <Box mb="l">
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

        <Box mb="base">
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
          title={`Finish${isLoading ? 'ing...' : ''}`}
          type="submit"
          onClick={handleSubmit}
          disabled={
            !currentUser || !(values.firstName && values.lastName) || isLoading
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
