import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Color from 'color';

import { TypeStyles } from '../Typography';
import { system } from '../_lib/system';

const labelColor = ({ theme, focused, error }) => {
  if (error) {
    return css`
      color: ${theme.colors.base.alert};
    `;
  }

  return css`
    color: ${focused ? theme.colors.base.primary : theme.colors.text.secondary};
  `;
};

const labelStateStyle = ({ focused, hasValue }) => css`
  ${focused || hasValue ? TypeStyles.SystemText() : undefined};
  top: ${focused || hasValue ? '7px' : '50%'}; /* // TODO Fix brittle value. */
  font-weight: ${focused ? 600 : 'inherit'};
`;

const Label = withTheme(styled.p`
  ${TypeStyles.LargeSystemText}
  position: absolute;
  transform: translate(0, -14px); /* // TODO Fix brittle value. */

  pointer-events: none;
  transition: all ${themeGet('timing.base')} ease-out;
  ${labelStateStyle};
  ${labelColor};
`);

const textInputStateStyle = ({ theme, focused, error }) => {
  if (error) {
    return css`
      border-bottom: 2px solid ${theme.colors.base.alert};
    `;
  }

  return css`
    border-bottom: 2px solid
      ${focused ? theme.colors.text.action : theme.colors.text.secondary};
  `;
};

const Input = withTheme(styled.input`
  ${TypeStyles.LargeSystemText}
  padding: ${themeGet('space.xs')} 0;
  transition: all ${themeGet('timing.xl')} ease-out;
  placeholder-text-color: ${({ theme }) =>
    Color(theme.colors.text.secondary).alpha(0)};
  caret-color: ${themeGet('colors.base.primary')};
  border: 0;
  ${textInputStateStyle};

  ${system};
`);

const Styled = {
  Label,
  Input,
};

export default Styled;