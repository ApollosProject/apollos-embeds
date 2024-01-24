import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';;

const DEFAULT_ICON_SIZE = '80px';

const imageStyles = ({ size }) => {
  const newSize = size || DEFAULT_ICON_SIZE;

  return css`
    max-height: ${newSize};
    max-width: 80%;
  `;
};

const Image = withTheme(styled.img`
  resizemode: 'contain';
  ${imageStyles};
`);

const Styled = {
  Image,
};

export default Styled;
