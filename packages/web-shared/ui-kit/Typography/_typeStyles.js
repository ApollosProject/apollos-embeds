import { themeGet } from '@styled-system/theme-get';
import { css } from 'styled-components';

import * as utils from '../_utils';

// :: Shared/Common
// --------------------------------------------------------

const shared = css`
  color: ${themeGet('colors.text.primary')};
  transition: all ${themeGet('timing.base')};
  margin: 0;
  padding: 0;
`;

// --------------------------------------------------------

// :: Headings
const H1 = () => css`
  ${shared}

  font-size: ${utils.rem('48px')};
  line-height: ${utils.rem('72px')};
  font-weight: 800;

  @media screen and (max-width: ${themeGet('breakpoints.lg')}) {
    font-size: ${utils.rem('48px')};
    line-height: ${utils.rem('72px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    font-size: ${utils.rem('34px')};
    line-height: ${utils.rem('51px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    font-size: ${utils.rem('30px')};
    line-height: ${utils.rem('45px')};
  }
`;

const H2 = () => css`
  ${shared}

  font-size: ${utils.rem('48px')};
  line-height: ${utils.rem('56px')};
  font-weight: 700;

  @media screen and (max-width: ${themeGet('breakpoints.lg')}) {
    font-size: ${utils.rem('44px')};
    line-height: ${utils.rem('66px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    font-size: ${utils.rem('28px')};
    line-height: ${utils.rem('42px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    font-size: ${utils.rem('24px')};
    line-height: ${utils.rem('36px')};
  }
`;

const H3 = () => css`
  ${shared}

  font-size: ${utils.rem('30px')};
  line-height: ${utils.rem('36px')};
  font-weight: 700;

  @media screen and (max-width: ${themeGet('breakpoints.lg')}) {
    font-size: ${utils.rem('22px')};
    line-height: ${utils.rem('33px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    font-size: ${utils.rem('20px')};
    line-height: ${utils.rem('30px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    font-size: ${utils.rem('18px')};
    line-height: ${utils.rem('27px')};
  }
`;

const H4 = () => css`
  ${shared}

  font-size: ${utils.rem('20px')};
  line-height: ${utils.rem('30px')};
  font-weight: 600;

  @media screen and (max-width: ${themeGet('breakpoints.lg')}) {
    font-size: ${utils.rem('18px')};
    line-height: ${utils.rem('27px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    font-size: ${utils.rem('17px')};
    line-height: ${utils.rem('25.5px')};
  }
  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    font-size: ${utils.rem('16px')};
    line-height: ${utils.rem('24px')};
  }
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

const LargeBodyText = () => css`
  ${shared}

  font-size: ${utils.rem('19px')};
  line-height: ${utils.rem('28px')};
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
  LargeBodyText,
  SmallSystemText,
  SystemText,
};
