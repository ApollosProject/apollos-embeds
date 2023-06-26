import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const H4 = withTheme(styled.h4`
  ${TypeStyles.H4}
  ${system}
`);

H4.propTypes = {
  ...systemPropTypes,
};

export default H4;
