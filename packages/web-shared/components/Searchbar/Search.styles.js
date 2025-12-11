import { themeGet } from '@styled-system/theme-get';
import styled, { withTheme, css } from 'styled-components';

import { utils } from '../../ui-kit';
import { system } from '../../ui-kit/_lib/system';
import { H4, TypeStyles } from '../../ui-kit/Typography';

const showDropdown = ({ dropdown }) => {
  if (dropdown) {
    return css`
      border-radius: ${themeGet('radii.xxl')} ${themeGet('radii.xxl')} 0px 0px;
      @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
        border-radius: 0px;
        position: fixed;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1000;
      }
    `;
  } else {
    return css`
      border-radius: ${themeGet('radii.xxl')};
    `;
  }
};

const showPanel = ({ dropdown }) => {
  if (dropdown) {
    return css`
      @media screen and (min-width: ${themeGet('breakpoints.sm')}) {
        max-height: 600px;
        padding-bottom: 15px;
      }
      @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
        max-height: 80vh;
        z-index: 1000;
        padding-bottom: 15px;
      }
    `;
  } else {
    return css`
      height: 0px;
    `;
  }
};

const Wrapper = withTheme(styled.div`
  background: ${themeGet('colors.base.white')};
  box-shadow: ${themeGet('shadows.medium')};
  height: 60px;
  width: 100%;
  z-index: 100;
  ${showDropdown}

  ${system}

  // Algolia autocomplete styles
  
  .aa-Panel {
    width: 100%;
    left: 0;
    background: ${themeGet('colors.base.white')};
    box-shadow: ${themeGet('shadows.mediumBottom')};
    transition: 0s;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 0px 0px 15px 15px;
    ${showPanel}
    position: relative;
    display: inline-block;
    margin: 0px;
  }

  .aa-Form:focus-within {
    box-shadow: none;
  }
  .aa-Form {
    border: none;
  }
  .aa-Item {
    border-radius: 0;
  }

  .chip-list-feature ul {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;

    & > *:first-child {
      margin-left: 1rem;
    }
    & > *:last-child {
      margin-right: 1rem;
    }
  }
`);

const TextPrompt = withTheme(styled.div`
  ${TypeStyles.BodyText}

  display: flex;
  overflow: hidden;
  pointer-events: none;
  text-overflow: ellipsis;
  top: 50%;
  transform: translate(0, -50%);
  white-space: nowrap;
  width: 100%;
  position: absolute;

  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    max-width: 70%;
  }

  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    max-width: 65%;
  }

  ${system}
`);

const Profile = withTheme(styled.div`
  background: ${(props) => props.theme.colors.base.primary};
  border-radius: 50%;
  color: ${(props) => props.theme.colors.base.white};
  line-height: 0;
  padding: 9px;

  ${system}
`);

const SearchIcon = withTheme(styled.div`
  background: ${(props) => props.theme.colors.base.primary};
  padding: 9px;
  border-radius: 50%;
  line-height: 0;
  color: ${(props) => props.theme.colors.base.white};
  ${system}
`);

const Interface = withTheme(styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${system}
`);

const InterfaceWrapper = withTheme(styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  ${system}
`);

const Input = withTheme(styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 20px;
  ${system}
`);

const X = withTheme(styled.div`
  color: #27272e54;
  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system}
`);

const Title = withTheme(styled(H4)`
  font-size: ${utils.rem('16px')};
  color: ${themeGet('colors.text.secondary')};
`);

const IconWrapper = withTheme(styled.div`
  color: #27272e54;
  transition: 0.2s;
  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system}
`);

const Styled = {
  Input,
  Interface,
  InterfaceWrapper,
  IconWrapper,
  Profile,
  SearchIcon,
  TextPrompt,
  Title,
  Wrapper,
  X,
};

export default Styled;
