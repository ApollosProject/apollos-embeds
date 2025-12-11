import { themeGet } from '@styled-system/theme-get';
import styled, { withTheme } from 'styled-components';

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

export const ParentTitle = withTheme(styled.div`
  ${TypeStyles.H3}
  margin-bottom: ${themeGet('space.xxs')};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    ${TypeStyles.H3}
    margin-bottom: ${themeGet('space.xxs')};
  }

  ${system}
`);

export const ParentSummary = withTheme(styled.div`
  ${TypeStyles.SmallBodyText}
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${system}
`);
