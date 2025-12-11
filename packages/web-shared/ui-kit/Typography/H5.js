import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const H5 = withTheme(styled.h5.attrs({
  className: 'heading-style-h5',
})`
  ${TypeStyles.H5}
  ${system}
`);

H5.propTypes = {
  ...systemPropTypes,
};

export default H5;
