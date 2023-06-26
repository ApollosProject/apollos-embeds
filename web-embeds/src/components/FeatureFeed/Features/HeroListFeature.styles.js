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

export default {
  Title,
  Summary,
};
