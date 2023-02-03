import React from 'react';

import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system, TypeStyles, utils } from '../../../ui-kit';

const Container = withTheme(styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  ${system};
`);

// :: Church Branding Panel
const BrandPanel = withTheme(styled.div`
  padding: ${themeGet('space.l')} ${themeGet('space.l')};
  width: 53%;
  ${system};
`);

const LogoSlot = withTheme(styled.div`
  height: 96px;
  width: 96px;
  margin-bottom: 'space.xxl';
`);

const Heading = withTheme(styled.h2`
  ${TypeStyles.H2}
  color: ${themeGet('colors.base.white')};
  font-size: ${utils.rem('64px')};
  line-height: ${utils.rem('88px')};
  margin-bottom: ${themeGet('space.s')};
`);

const SubHeading = withTheme(styled.h3`
  ${TypeStyles.H3};
  color: ${themeGet('colors.neutral.gray')};
  font-weight: 500;
  opacity: 0.9;
`);

// :: Main Instructions Panel
const InstructionsPanel = withTheme(styled.div`
  display: flex;
  justify-content: center;
  background-color: ${themeGet('colors.fill.screen')};
  padding-top: ${themeGet('space.xxl')};
  padding-left: ${themeGet('space.xl')};
  padding-right: ${themeGet('space.xl')};
  flex: 1;
  ${system};
`);

const InstructionsHeading = withTheme(styled.h2`
  ${TypeStyles.H2};
  color: ${themeGet('colors.text.secondary')};
`);

const Steps = withTheme(styled.div`
  margin-top: ${themeGet('space.l')}; ;
`);

const Step = withTheme(styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${themeGet('space.l')};
`);

const StepNumber = withTheme(styled.h3`
  ${TypeStyles.H3};
  letter-spacing: '10px'
  margin-right: ${themeGet('space.s')};
`);

const StepText = withTheme(styled.h3`
  ${TypeStyles.H3};
  ${system}
`);

const MobileAppContainer = withTheme(styled.div`
  display: flex;
  margin-top: ${themeGet('space.base')};
  flex-direction: row;
  align-items: center;
`);

const MobileAppLogoContainer = withTheme(styled.div`
  display: flex;
  align-self: flex-start;
  box-shadow: ${themeGet('shadows.medium')};
`);

const MobileAppTitle = withTheme(styled.h3`
  ${TypeStyles.H3};
  font-weight: bold;
  margin-left: ${themeGet('space.xs')};
`);

const codeBoxErrorState = ({ error, theme }) => {
  if (error) {
    return css`
      border-color: ${theme.colors.base.alert};
    `;
  }
  return null;
};

const CodeBox = withTheme(styled.div`
  display: flex;
  align-self: flex-start;
  border-color: ${themeGet('colors.base.secondary')};
  border-radius: ${themeGet('radii.base')};
  border-width: 3px;
  margin: ${themeGet('space.s')} 0;
  padding: ${themeGet('space.xs')} ${themeGet('space.s')};
  ${codeBoxErrorState}
`);

const CodeText = withTheme(styled.h1`
  ${TypeStyles.H1};
  font-weight: 600;
  margin-bottom: 0;
  text-align: center;
`);

const CodeSubText = withTheme(styled.p`
  ${TypeStyles.BodyText}
  color: ${themeGet('colors.text.secondary')};
  ${system}
`);

const GradientOverlay = withTheme(styled.div`
  background: ${themeGet('colors.text.secondary')};
  ${system}
`);

export {
  Container,
  BrandPanel,
  Heading,
  SubHeading,
  LogoSlot,
  InstructionsPanel,
  InstructionsHeading,
  Steps,
  Step,
  StepNumber,
  StepText,
  MobileAppContainer,
  MobileAppLogoContainer,
  MobileAppTitle,
  CodeBox,
  CodeText,
  CodeSubText,
  GradientOverlay,
};
