import styled from 'styled-components';
import { withTheme } from 'styled-components';

import { system } from '../ui-kit/_lib/system';

import { TypeStyles } from '../ui-kit/Typography';

export const Title = withTheme(styled.h1`
  ${TypeStyles.H2}
  text-wrap: pretty;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${system}
`);
