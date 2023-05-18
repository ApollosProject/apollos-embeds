import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { H4, TypeStyles } from '../../ui-kit/Typography';
import { utils } from '../../ui-kit';
import { system } from '../../ui-kit/_lib/system';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

const List = withTheme(styled.div`
  ol {
    list-style: none;
  }
  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system}
`);

const StyledList = {
  List,
};

export default StyledList;
