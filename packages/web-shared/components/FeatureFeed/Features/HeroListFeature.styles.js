import styled, { css } from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../../../ui-kit/_lib/system';
import { TypeStyles } from '../../../ui-kit/Typography';

const twoCardlayout = ({ length }) => {
  if (length === 2) {
    return css`
      grid-template-columns: repeat(2, 1fr);
    `;
  } else {
    return null;
  }
};

const Title = withTheme(styled.h3`
  ${TypeStyles.H3}
  margin-bottom: ${themeGet('space.xxs')};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    ${TypeStyles.H3}
    margin-bottom: ${themeGet('space.xxs')};
  }
  @media screen and (min-width: ${themeGet('breakpoints.lg')}) {
    ${TypeStyles.H2}
    margin-bottom: ${themeGet('space.s')};
  }

  ${system}
`);

const Summary = withTheme(styled.div`
  ${TypeStyles.SmallBodyText}
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (min-width: ${themeGet('breakpoints.lg')}) {
    ${TypeStyles.LargeBodyText}
  }

  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    ${TypeStyles.BodyText}
  }

  ${system}
`);

const Container = styled.div`
  display: grid;

  grid-template-rows: auto;
  grid-gap: 70px 20px;

  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: ${themeGet('breakpoints.sm')}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    grid-template-columns: repeat(3, 1fr);
    ${twoCardlayout}
  }
`;

const Item = styled.div`
  margin-right: 0;

  @media screen and (min-width: ${themeGet('breakpoints.md')}) {
    margin-bottom: 0;
  }
`;

export default {
  Title,
  Summary,
  Container,
  Item,
};
