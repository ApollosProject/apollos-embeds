import styled, { css } from 'styled-components';
import { withTheme } from 'styled-components';

import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';
import { rem } from '../_utils';
import { TypeStyles } from '../Typography';

export const BottomSlot = withTheme(styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${themeGet('space.xs')};
`);

export const CompleteIndicator = withTheme(styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: ${rem('28px')};
  height: ${rem('28px')};
  border-radius: ${themeGet('radii.xxl')};
  background-color: ${themeGet('colors.text.action')};
  box-shadow: ${themeGet('shadows.medium')};
  ${system}
`);

export const Summary = withTheme(styled.div`
  ${TypeStyles.SmallBodyText}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${system}
`);

export const Title = withTheme(styled.div`
  ${TypeStyles.H4}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${system}
`);
