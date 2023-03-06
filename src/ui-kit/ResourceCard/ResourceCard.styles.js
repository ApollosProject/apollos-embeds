import { withTheme } from "styled-components";
import styled, { css } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Color from "color";

import { TypeStyles } from "../Typography";
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
  min-width: 48px;
  height: 48px;
  width: 48px;
  height: 48px;
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
  ${system};
`);

const Heading = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  ${system};
`);

const Title = withTheme(styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27272e;
  ${system};
`);

const Subtitle = withTheme(styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(39, 39, 46, 0.6);
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
