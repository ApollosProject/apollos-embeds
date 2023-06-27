import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../../ui-kit';

const DEFAULT_ICON_SIZE = '80px';
const DEFAULT_FILL = 'white';

const imageStyles = ({ size, fill, theme }) => {
  const newSize = size || DEFAULT_ICON_SIZE;
  const themeFillValue = themeGet(`colors.${fill}`)({ theme });
  const newFill = themeFillValue || fill || DEFAULT_FILL;

  return css`
    width: ${newSize};
    height: ${newSize};
    tintcolor: ${newFill};
  `;
};

const Image = withTheme(styled.img`
  resizemode: 'contain';

  ${imageStyles};
  ${system};
`);

const Styled = {
  Image,
};

export default Styled;
