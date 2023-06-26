import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Color from 'color';

import { TypeStyles } from '../Typography';
import { system } from '../_lib/system';

const labelColor = ({ theme, focused, hasValue, error }) => {
  if (error) {
    return css`
      color: ${theme.colors.base.alert};
    `;
  }

  return css`
    color: ${focused || hasValue
      ? theme.colors.text.action
      : theme.colors.text.secondary};
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

const textInputStateStyle = ({ theme, error }) => {
  if (error) {
    return css`
      border-bottom: 1px solid ${theme.colors.base.alert};
    `;
  }

  return css`
    border-bottom: 1px solid ${theme.colors.text.secondary};
    &:focus {
      border-bottom-color: ${theme.colors.text.action};
    }
  `;
};

const Input = withTheme(styled.input`
  ${TypeStyles.LargeSystemText}
  padding: ${themeGet('space.s')} 0 ${themeGet('space.xxs')} 0;
  transition: all ${themeGet('timing.xl')} ease-out;
  placeholder-text-color: ${({ theme }) =>
    Color(theme.colors.text.secondary).alpha(0)};
  caret-color: ${themeGet('colors.base.primary')};
  border-top: 0;
  border-left: 0;
  border-right: 0;
  ${textInputStateStyle};

  ${system};
`);

const Styled = {
  Label,
  Input,
};

export default Styled;
