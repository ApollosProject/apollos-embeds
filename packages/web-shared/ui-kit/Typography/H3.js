import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const H3 = withTheme(styled.h3.attrs({
  className: 'heading-style-h3',
})`
  ${TypeStyles.H3}
  ${system}
`);

H3.propTypes = {
  ...systemPropTypes,
};

export default H3;
