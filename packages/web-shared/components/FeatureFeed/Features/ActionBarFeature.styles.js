import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../../../ui-kit/Typography';
import { system } from '../../../ui-kit/_lib/system';

const ActionBar = withTheme(styled.div`
  display: flex;
  border-radius: 6px;
  box-shadow: ${themeGet('shadows.medium')};
  padding: ${themeGet('space.xs')};
  ${system}
`);

const ActionBarItem = withTheme(styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${themeGet('colors.base.primary')};
  opacity: 1;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
  ${system};
`);

const Styled = {
  ActionBar,
  ActionBarItem,
};

export default Styled;
