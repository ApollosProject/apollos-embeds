import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';

const ResourceCard = withTheme(styled.div`
  display: flex;
  padding: ${themeGet('space.xxs')} ${themeGet('space.xs')};
  padding-right: ${themeGet('space.s')};
  border-radius: 8px;
  background: ${themeGet('colors.neutral.gray6')};
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  gap: ${themeGet('space.xs')};
  ${system};
`);

const LeadingAsset = withTheme(styled.div`
  height: 32px;
  width: 32px;
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
  width: 100%;
  ${system};
`);

const Title = withTheme(styled.div`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27272e;
  width: 100%;
  padding-right: 3%;
  ${system};
`);

const Subtitle = withTheme(styled.div`
  display: flex;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(39, 39, 46, 0.6);
  width: 100%;
  padding-right: 3%;
  ${system};
`);

const Ellipse = withTheme(styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${system};
`);

const Styled = {
  ResourceCard,
  LeadingAsset,
  TailingIcon,
  Wrapper,
  Heading,
  Title,
  Subtitle,
  Ellipse,
};

export default Styled;
