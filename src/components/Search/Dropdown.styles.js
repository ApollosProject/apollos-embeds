import { withTheme } from 'styled-components';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import Card from '../../ui-kit/Card';

import { system } from '../../ui-kit/_lib/system';

const Wrapper = withTheme(styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 60px; //NOTE: Magic number to offset search results down below the search input
  transition: opacity 0.3s ease;
  z-index: 9999;

  ${system};
`);

const Dropdown = withTheme(styled(Card)`
  border-radius: 0 0 ${themeGet('radii.xxl')} ${themeGet('radii.xxl')};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${themeGet('space.xs')};
  width: 520px;
`);

const Styled = {
  Dropdown,
  Wrapper,
};

export default Styled;