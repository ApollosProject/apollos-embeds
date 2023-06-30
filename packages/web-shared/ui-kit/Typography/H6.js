import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const H6 = withTheme(styled.h6`
  ${TypeStyles.H6}
  ${system}
`);

H6.propTypes = {
  ...systemPropTypes,
};

export default H6;
