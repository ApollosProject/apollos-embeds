import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const SmallBodyText = withTheme(styled.p`
  ${TypeStyles.SmallBodyText}
  ${system}
`);

SmallBodyText.propTypes = {
  ...systemPropTypes,
};

export default SmallBodyText;
