import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const H1 = withTheme(styled.h1`
  ${TypeStyles.H1}
  ${system}
`);

H1.propTypes = {
  ...systemPropTypes,
};

export default H1;
