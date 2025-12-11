import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const H1 = withTheme(styled.h1.attrs({
  className: 'heading-style-h1',
})`
  ${TypeStyles.H1}
  ${system}
`);

H1.propTypes = {
  ...systemPropTypes,
};

export default H1;
