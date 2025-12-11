import { themeGet } from '@styled-system/theme-get';
import Color from 'color';
import styled, { withTheme, css } from 'styled-components';

import { system } from '../_lib/system';
import { TypeStyles } from '../Typography';

const labelColor = ({ theme, focused, hasValue, error }) => {
  if (error) {
    return css`
      color: ${theme.colors.base.alert};
    `;
  }

  return css`
    color: ${focused || hasValue ? theme.colors.text.action : theme.colors.text.secondary};
  `;
};

const labelStateStyle = ({ focused, hasValue }) => css`
  ${focused || hasValue ? TypeStyles.SystemText() : undefined};
  top: 50%
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

const textSelectStateStyle = ({ theme, error }) => {
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

const Select = withTheme(styled.select`
  ${TypeStyles.LargeSystemText}
  padding: ${themeGet('space.xs')} 0;
  transition: all ${themeGet('timing.xl')} ease-out;
  placeholder-text-color: ${({ theme }) => Color(theme.colors.text.secondary).alpha(0)};
  caret-color: ${themeGet('colors.base.primary')};
  border-top: 0;
  border-left: 0;
  border-right: 0;
  ${textSelectStateStyle};

  ${system};
`);

const Styled = {
  Label,
  Select,
};

export default Styled;
