import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const H5 = withTheme(styled.h5`
  ${TypeStyles.H5}
  ${system}
`);

H5.propTypes = {
  ...systemPropTypes,
};

export default H5;
