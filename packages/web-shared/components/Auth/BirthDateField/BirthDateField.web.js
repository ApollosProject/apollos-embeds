import React from 'react';

import PropTypes from 'prop-types';
import { Box, LargeSystemText } from 'shared/ui-kit';

import Styled from './BirthDateField.styles.web';

function BirthDateField(props = {}) {
  return (
    <>
      <LargeSystemText>Birth Date</LargeSystemText>
      <Box display="flex" mt="base">
        <Styled.Input id="birthDate" label="Birth Date" type="date" {...props} />
        {props.error ? (
          <Box as="p" color="alert" fontSize="s" mt="s">
            {props.error}
          </Box>
        ) : null}
      </Box>
    </>
  );
}

BirthDateField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

BirthDateField.defaultProps = {
  required: true,
};

export default BirthDateField;
