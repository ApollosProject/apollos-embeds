import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const H2 = withTheme(styled.h2.attrs({
  className: 'heading-style-h2',
})`
  ${TypeStyles.H2}
  ${system}
`);

H2.propTypes = {
  ...systemPropTypes,
};

export default H2;
