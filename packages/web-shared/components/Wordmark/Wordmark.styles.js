import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';

const DEFAULT_ICON_SIZE = '80px';

const imageStyles = ({ size }) => {
  const newSize = size || DEFAULT_ICON_SIZE;

  return css`
    max-height: ${newSize};
  `;
};

const Image = withTheme(styled.img`
  resizemode: 'contain';
  max-width: 80%;
  ${imageStyles};
`);

const WrappedImage = withTheme(styled.img`
  resizemode: 'contain';
  max-width: 100%;
  ${imageStyles};
`);

const Styled = {
  Image,
  WrappedImage,
};

export default Styled;
