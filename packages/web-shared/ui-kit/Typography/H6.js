import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const H6 = withTheme(styled.h6.attrs({
  className: 'heading-style-h6',
})`
  ${TypeStyles.H6}
  ${system}
`);

H6.propTypes = {
  ...systemPropTypes,
};

export default H6;
