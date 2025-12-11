import React from 'react';

import { Menu } from '@headlessui/react';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';
import styled, { withTheme } from 'styled-components';

import { system } from '../../ui-kit/_lib/system';

export const ActionIcon = withTheme(styled(Menu.Button)`
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
  border: none;
  outline: none;

  &:hover {
    background-color: ${themeGet('colors.fill.system2')};
  }
  ${system}
`);

export const List = withTheme(styled(Menu.Items)`
  position: absolute;
  right: 0;
  top: 38px;
  min-width: 200px;
  color: ${themeGet('colors.text.primary')};
  border-radius: ${themeGet('radii.xl')};
  background-color: ${themeGet('colors.fill.paper')};
  box-shadow: ${themeGet('shadows.medium')};
  overflow: hidden;
  padding: ${themeGet('space.xxs')};
  ${system}
`);

export const MenuContainer = withTheme(styled(Menu)`
  position: relative;
  ${system}
`);

export const MenuLink = withTheme(styled.a`
  display: flex;
  align-items: center;
  padding: ${themeGet('space.xxs')} ${themeGet('space.xs')};
  color: ${themeGet('colors.text.primary')};
  margin-bottom: ${themeGet('space.xxs')};
  border-radius: ${themeGet('radii.base')};
  transition: all ${themeGet('timing.l')};
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => rgba(themeGet('colors.base.secondary')(props), 0.15)};
    color: ${themeGet('colors.base.secondary')};
  }
  ${system}
`);
