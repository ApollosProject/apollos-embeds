import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../../../ui-kit/Typography';
import { system } from '../../../ui-kit/_lib/system';

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
