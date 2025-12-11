import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const SmallSystemText = withTheme(styled.p`
  ${TypeStyles.SmallSystemText}
  ${system}
`);

SmallSystemText.propTypes = {
  ...systemPropTypes,
};

export default SmallSystemText;
