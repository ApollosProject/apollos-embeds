import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';
import styled, { withTheme } from 'styled-components';

import { system } from '../../../ui-kit/_lib/system';

export const Container = withTheme(styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: ${themeGet('space.base')};
  color: ${themeGet('colors.text.primary')};
  border-radius: ${themeGet('radii.xl')};
  background-color: ${themeGet('colors.fill.paper')};
  box-shadow: ${themeGet('shadows.medium')};
  ${system}
`);

export const LineItem = withTheme(styled.li`
  // flex flex-wrap items-center justify-center gap-x-3 self-stretch pl-3
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: ${themeGet('space.s')};
  padding-left: ${themeGet('space.s')};
  ${system}
`);

export const IconContainer = withTheme(styled.div`
  display: flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: ${themeGet('radii.l')};
  background-color: ${(props) => rgba(themeGet('colors.base.primary')(props), 0.15)};
  ${system}
`);

export const SeparatorContainer = withTheme(styled.div`
  // flex flex-1 items-center gap-x-3 self-stretch py-3 pr-3 border-b border-gray-100
  display: flex;
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: ${themeGet('space.s')};
  padding: ${themeGet('space.s')} ${themeGet('space.s')} ${themeGet('space.s')} 0;
  border-bottom: 1px solid ${themeGet('colors.fill.system2')};

  ${({ last }) =>
    last &&
    `
    border-bottom: none;
  `}
`);

export const Details = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  align-self: center;
  ${system}
`);

export const ActionIcon = withTheme(styled.a`
  // flex items-center justify-center p-2 bg-gray-50 rounded-full
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${themeGet('colors.fill.system4')};
  transition: background-color ${themeGet('timing.xl')};
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${themeGet('colors.fill.system2')};
  }
  ${system}
`);
