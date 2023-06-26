import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const H3 = withTheme(styled.h3`
  ${TypeStyles.H3}
  ${system}
`);

H3.propTypes = {
  ...systemPropTypes,
};

export default H3;
