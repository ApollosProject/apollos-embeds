import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Card from '../../ui-kit/Card';
import { system } from '../../ui-kit/_lib/system';
import Color from 'color';

const Profile = withTheme(styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  transition: opacity 0.3s ease;
  z-index: 9999;
  right: -15px;

  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    position: fixed;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
  }

  ${system};
`);

const ProfileCard = withTheme(styled(Card)`
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${themeGet('space.xs')};
  box-sizing: border-box;
  ${system};
`);

const CloseIcon = withTheme(styled.div`
  align-items: center;
  background: rgba(242, 242, 247, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  line-height: 0;
  padding: 9px;
  transition: 0.2s;

  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system};
`);

const UploadIcon = withTheme(styled.label`
  align-items: center;
  background: ${themeGet('colors.base.black')};
  border-radius: 50%;
  bottom: 0;
  color: ${themeGet('colors.base.white')};
  display: flex;
  justify-content: center;
  line-height: 0;
  padding: 6px;
  position: absolute;
  right: 0;
  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => Color(theme.colors.text.action).darken(0.1)};
    cursor: pointer;
  }

  input[type='file'] {
    display: none;
  }
  ${system};
`);

const AppLinks = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${themeGet('space.s')};
`);

const Styled = {
  Profile,
  CloseIcon,
  UploadIcon,
  AppLinks,
  ProfileCard,
};

export default Styled;
