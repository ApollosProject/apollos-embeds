import { withTheme } from "styled-components";
import styled, { css } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { system } from "../_lib/system";

const ResourceCard = withTheme(styled.div`
  display: flex;
  padding: ${themeGet("space.xs")};
  border-radius: 8px;
  background: rgba(242, 242, 247, 0.65);
  align-items: center;
  width: 100%;
  height: 72px;

  gap: ${themeGet("space.xs")};
  ${system};
`);

const LeadingIcon = withTheme(styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  ${system};
`);

const TailingIcon = withTheme(styled.div`
  height: 24px;
  min-width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${system};
`);

const Wrapper = withTheme(styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${system};
`);

//TODO: Find a better way to keep TailingIcon from from displaying outside of the Resource Card
const Heading = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 55px);
  ${system};
`);

const Title = withTheme(styled.div`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27272e;
  max-width: 100%;
  padding-right: 3%;
  ${system};
`);

const Subtitle = withTheme(styled.div`
  display: flex;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(39, 39, 46, 0.6);
  max-width: 100%;
  padding-right: 3%;
  ${system};
`);

const Ellipse = withTheme(styled.div`
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${system};
`);

const Styled = {
  ResourceCard,
  LeadingIcon,
  TailingIcon,
  Wrapper,
  Heading,
  Title,
  Subtitle,
  Ellipse,
};

export default Styled;
