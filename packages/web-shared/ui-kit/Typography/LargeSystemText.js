import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const LargeSystemText = withTheme(styled.p`
  ${TypeStyles.LargeSystemText}
  ${system}
`);

LargeSystemText.propTypes = {
  ...systemPropTypes,
};

export default LargeSystemText;
