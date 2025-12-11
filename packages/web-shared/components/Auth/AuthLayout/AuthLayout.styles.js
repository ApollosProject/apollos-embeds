import React from 'react';

import { themeGet } from '@styled-system/theme-get';
import styled, { withTheme } from 'styled-components';

import { TypeStyles, utils } from '../../../ui-kit';

const Heading = withTheme(styled.h2`
  ${TypeStyles.H3}
  margin-bottom: ${themeGet('space.xxs')};
`);

const SubHeading = withTheme(styled.h3`
  ${TypeStyles.H6};
  font-weight: 500;
  color: ${themeGet('colors.neutral.gray')};
  margin-bottom: ${themeGet('space.base')};
`);

export { Heading, SubHeading };
