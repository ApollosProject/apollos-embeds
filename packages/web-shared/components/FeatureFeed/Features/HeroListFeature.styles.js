import styled, { css } from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../../../ui-kit/_lib/system';
import { TypeStyles } from '../../../ui-kit/Typography';

const twoCardlayout = ({ length }) => {
  if (length === 2) {
    return css`
      grid-template-columns: repeat(2, 1fr);

      @media screen and (min-width: ${themeGet('breakpoints.md')}) {
        margin-right: -11px;
      }
    `;
  } else {
    return null;
  }
};

const Title = withTheme(styled.div`
  ${TypeStyles.H3}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${system}
`);

const Summary = withTheme(styled.div`
  ${TypeStyles.SmallBodyText}
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${system}
`);

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  ${twoCardlayout}

  @media screen and (max-width: ${themeGet('breakpoints.lg')}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Item = styled.div`
  margin-bottom: ${themeGet('space.l')};
  margin-right: 0;

  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    margin-bottom: 0;
    margin-right: 11px;
  }
`;

export default {
  Title,
  Summary,
  Container,
  Item,
};
