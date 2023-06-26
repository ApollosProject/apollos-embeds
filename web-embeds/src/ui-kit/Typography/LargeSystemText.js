import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const LargeSystemText = withTheme(styled.p`
  ${TypeStyles.LargeSystemText}
  ${system}
`);

LargeSystemText.propTypes = {
  ...systemPropTypes,
};

export default LargeSystemText;
