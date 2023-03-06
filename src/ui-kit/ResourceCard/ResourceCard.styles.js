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
  overflow: hidden;
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
  display: flex;
  justify-content: center;
  align-items: center;
  ${system};
`);

const Wrapper = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${themeGet("space.xs")};
  ${system};
`);

const Heading = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${system};
`);

const Title = withTheme(styled.div`
  display: block;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27272e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
  max-width: 100%;
  ${system};
`);

const Subtitle = withTheme(styled.div`
  display: block;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(39, 39, 46, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
  max-width: 100%;
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
};

export default Styled;
