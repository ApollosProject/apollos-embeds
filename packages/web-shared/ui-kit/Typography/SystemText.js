import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const SystemText = withTheme(styled.p`
  ${TypeStyles.SystemText}
  ${system}
`);

SystemText.propTypes = {
  ...systemPropTypes,
};

export default SystemText;
