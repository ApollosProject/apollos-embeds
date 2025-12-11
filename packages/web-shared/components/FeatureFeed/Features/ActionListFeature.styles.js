import { themeGet } from '@styled-system/theme-get';
import styled, { withTheme } from 'styled-components';

import { system } from '../../../ui-kit/_lib/system';
import { TypeStyles } from '../../../ui-kit/Typography';

const List = withTheme(styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${system}
`);

const Wrapper = withTheme(styled.div`
  border-radius: 8px;
  &:focus,
  &:hover {
    background: #efeef7;
  }
  ${system}
`);

const Styled = {
  List,
  Wrapper,
};

export default Styled;
