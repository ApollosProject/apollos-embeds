import { withTheme } from "styled-components";
import styled, { css } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { H4, TypeStyles } from "../../ui-kit/Typography";
import { utils } from "../../ui-kit";
import { system } from "../../ui-kit/_lib/system";

const showDropdown = ({ dropdown }) => {
  if (dropdown) {
    return css`
      border-radius: ${themeGet("radii.xxl")} ${themeGet("radii.xxl")} 0px 0px;
      @media screen and (max-width: ${themeGet("breakpoints.sm")}) {
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
      border-radius: ${themeGet("radii.xxl")};
    `;
  }
};

const showPanel = ({ dropdown }) => {
  if (dropdown) {
    return css`
      @media screen and (min-width: ${themeGet("breakpoints.sm")}) {
        height: 600px;
      }
      @media screen and (max-width: ${themeGet("breakpoints.sm")}) {
        height: 100vh;
        z-index: 1000;
      }
    `;
  } else {
    return css`
      height: 0px;
    `;
  }
};

const Wrapper = withTheme(styled.div`
  align-items: center;
  background: ${themeGet("colors.base.white")};
  box-shadow: ${themeGet("shadows.medium")};
  display: flex;
  height: 60px;
  justify-content: space-between;
  width: 100%;
  z-index: 100;
  ${showDropdown}

  ${system}

  // Algolia autocomplete styles
  
  .aa-Panel {
    width: 100%;
    left: 0;
    background: ${themeGet("colors.base.white")};
    box-shadow: ${themeGet("shadows.mediumBottom")};
    transition: 0s;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 0px 0px 15px 15px;
    ${showPanel}
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
`);

const TextPrompt = withTheme(styled.div`
  ${TypeStyles.BodyText}

  display: flex;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  text-overflow: ellipsis;
  top: 50%;
  transform: translate(0, -50%);
  white-space: nowrap;
  width: 100%;

  @media screen and (max-width: ${themeGet("breakpoints.md")}) {
    max-width: 50%;
  }

  @media screen and (max-width: ${themeGet("breakpoints.sm")}) {
    max-width: 47%;
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
    color: ${themeGet("colors.base.secondary")};
    cursor: pointer;
  }
  ${system}
`);

const Title = withTheme(styled(H4)`
  font-size: ${utils.rem("16px")};
  color: ${themeGet("colors.text.secondary")};
`);

const IconWrapper = withTheme(styled.div`
  color: #27272e54;
  transition: 0.2s;
  &:hover {
    color: ${themeGet("colors.base.secondary")};
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