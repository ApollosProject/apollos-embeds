import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../../../ui-kit/Typography';

const Title = withTheme(styled.h1`
  ${TypeStyles.H1}
  color: ${themeGet('colors.text.primary')};
  overflow: hidden;
`);

const Summary = withTheme(styled.h3`
  ${TypeStyles.H3}
  color: ${themeGet('colors.text.primary')};
  opacity: 0.9;
  overflow: hidden;
`);

const Wrapper = withTheme(styled.div`
  border-radius: 8px;
  &:focus,
  &:hover {
    background: #efeef7;
  }
`);

export default {
  Title,
  Summary,
  Wrapper,
};
