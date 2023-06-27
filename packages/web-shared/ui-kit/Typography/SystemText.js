import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const SystemText = withTheme(styled.p`
  ${TypeStyles.SystemText}
  ${system}
`);

SystemText.propTypes = {
  ...systemPropTypes,
};

export default SystemText;
