import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const H2 = withTheme(styled.h2`
  ${TypeStyles.H2}
  ${system}
`);

H2.propTypes = {
  ...systemPropTypes,
};

export default H2;
