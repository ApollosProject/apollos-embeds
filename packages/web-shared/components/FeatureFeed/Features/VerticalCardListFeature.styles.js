import styled, { css } from 'styled-components';
import 'react-multi-carousel/lib/styles.css';
import { themeGet } from '@styled-system/theme-get';

const twoCardlayout = ({ length }) => {
  if (length === 2) {
    return css`
      grid-template-columns: repeat(2, 1fr);
    `;
  } else {
    return null;
  }
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-gap: 20px;
  ${twoCardlayout}

  @media screen and (max-width: ${themeGet('breakpoints.lg')}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Styled = {
  Container,
};

export default Styled;
