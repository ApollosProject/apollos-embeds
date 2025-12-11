import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const H4 = withTheme(styled.h4.attrs({
  className: 'heading-style-h4',
})`
  ${TypeStyles.H4}
  ${system}
`);

H4.propTypes = {
  ...systemPropTypes,
};

export default H4;
