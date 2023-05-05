import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { H4, utils } from '../../ui-kit';
import { system } from '../../ui-kit/_lib/system';

const Profile = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.1);
  ${system};
`);

const Title = withTheme(styled(H4)`
  font-size: ${utils.rem('16px')};
  color: ${themeGet('colors.text.secondary')};
`);
const Icon = withTheme(styled.div`
  padding-left: ${themeGet('space.xxs')};
  display: flex;
  justify-content: center;
  align-items: center;
  ${system}
`);

const Styled = {
  Profile,
  Title,
  Icon,
};

export default Styled;
