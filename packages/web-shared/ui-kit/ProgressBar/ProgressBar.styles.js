import { themeGet } from '@styled-system/theme-get';
import styled, { withTheme, css } from 'styled-components';

import { system } from '../_lib/system';

export const Container = withTheme(styled.div`
  background-color: ${themeGet('colors.text.tertiary')};
  box-shadow: ${themeGet('shadows.low')};
  border-radius: ${themeGet('radii.base')};
  ${system}
`);

const barFill = ({ percent }) => {
  if (percent) {
    return css`
      width: ${percent * 100}%;
    `;
  }
  return null;
};

export const Bar = withTheme(styled.div`
  background-color: ${themeGet('colors.base.secondary')};
  border-radius: ${themeGet('radii.base')};
  /* Prevent awkwardness, always show or leave slivers at the ends */
  min-width: 2%;
  max-width: 98%;
  height: ${themeGet('space.xxs')};
  ${barFill}
`);
