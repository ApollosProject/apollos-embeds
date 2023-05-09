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
  position: absolute;
  ${system};
`);

const Title = withTheme(styled(H4)`
  font-size: ${utils.rem('16px')};
  color: ${themeGet('colors.text.secondary')};
`);

const CloseIcon = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 9px;
  background: rgba(242, 242, 247, 0.8);
  transition: 0.2s;

  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system};
`);

const Styled = {
  Profile,
  Title,
  CloseIcon,
};

export default Styled;
