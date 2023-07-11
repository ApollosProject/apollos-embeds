import { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import * as utils from '../_utils';

// :: Shared/Common
// --------------------------------------------------------

const shared = css`
  font-family: ${themeGet('fonts.heading')};
  color: ${themeGet('colors.text.primary')};
  transition: all ${themeGet('timing.base')};
  margin: 0;
  padding: 0;
`;

// --------------------------------------------------------

// :: Headings
const H1 = () => css`
  ${shared}

  font-size: ${utils.rem('43px')};
  line-height: ${utils.rem('56px')};
  font-weight: 800;
`;

const H2 = () => css`
  ${shared}

  font-size: ${utils.rem('36px')};
  line-height: ${utils.rem('45px')};
  font-weight: 700;
`;

const H3 = () => css`
  ${shared}

  font-size: ${utils.rem('24px')};
  line-height: ${utils.rem('28px')};
  font-weight: 700;
`;

const H4 = () => css`
  ${shared}

  font-size: ${utils.rem('20px')};
  line-height: ${utils.rem('28px')};
  font-weight: 600;
`;

const H5 = () => css`
  ${shared}

  font-size: ${utils.rem('16px')};
  line-height: ${utils.rem('24px')};
  font-weight: 500;
`;

const H6 = () => css`
  ${shared}

  font-size: ${utils.rem('14px')};
  line-height: ${utils.rem('21px')};
  font-weight: 600;
`;

// :: Body Text
const BodyText = () => css`
  ${shared}

  font-size: ${utils.rem('16px')};
  line-height: ${utils.rem('24px')};
  font-weight: 400;
`;

const SmallBodyText = () => css`
  ${shared}

  font-size: ${utils.rem('14px')};
  line-height: ${utils.rem('21px')};
  font-weight: 400;
`;

// :: System Text
const LargeSystemText = () => css`
  ${shared}

  font-size: ${utils.rem('18px')};
  line-height: ${utils.rem('24px')};
  letter-spacing: ${utils.rem('-0.25px')};
  font-weight: 400;
`;

const SystemText = () => css`
  ${shared}

  font-size: ${utils.rem('16px')};
  line-height: ${utils.rem('24px')};
  font-weight: 400;
`;

const SmallSystemText = () => css`
  ${shared}

  font-size: ${utils.rem('14px')};
  line-height: ${utils.rem('21px')};
  font-weight: 400;
`;

export default {
  BodyText,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  LargeSystemText,
  SmallBodyText,
  SmallSystemText,
  SystemText,
};
