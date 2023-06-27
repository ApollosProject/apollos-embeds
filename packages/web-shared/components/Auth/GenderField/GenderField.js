import React from 'react';
import PropTypes from 'prop-types';

import { Box, LargeSystemText, Select } from '../../../ui-kit';

function GenderField(props = {}) {
  return (
    <>
      <LargeSystemText>Gender</LargeSystemText>
      <Box display="flex" mt="base">
        <Select
          id="genderSelect"
          name="gender"
          onChange={props.onChange}
          defaultValue=""
        >
          <Select.Option value="" disabled>
            Select...
          </Select.Option>
          <Select.Option key="male" value="Male">
            Male
          </Select.Option>
          <Select.Option key="female" value="Female">
            Female
          </Select.Option>
          <Select.Option key="Prefer not to say" value="Prefer not to say">
            Prefer not to say
          </Select.Option>
        </Select>
      </Box>
    </>
  );
}

GenderField.propTypes = {
  onChange: PropTypes.func,
};

export default GenderField;
