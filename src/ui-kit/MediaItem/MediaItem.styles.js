import styled, { css } from 'styled-components';
import { withTheme } from 'styled-components';

import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';
import { rem } from '../_utils';
import { unit } from '../../utils';
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

export const Ellipsis = withTheme(styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${system}
`);

// :: Chip
export const LiveChipContainer = withTheme(styled.div`
  position: absolute;
  top: ${unit(4)};
  left: ${unit(4)};
  z-index: 1;
  background-color: ${themeGet('colors.base.live')};
  border-radius: ${unit(1)};
  padding: ${unit(1)} ${unit(3)};
`);
