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

const Styled = {
  List,
};

export default Styled;
