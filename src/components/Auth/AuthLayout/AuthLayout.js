import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo';
import { Layout, Icons } from '../../../ui-kit';

import {
  BrandPanel,
  Container,
  Heading,
  InstructionsPanel,
  LogoSlot,
  SubHeading,
  GradientOverlay,
} from './AuthLayout.styles';
import customizations from './customizations';

function AuthLayout(props = {}) {
  return (
    <Layout backgroundColor="#1C1C1E">
      <GradientOverlay />

      <Container>
        <BrandPanel>
          <Icons.Dot
            linearGradient
            opacity={0.05}
            size={1250}
            position="absolute"
            bottom={-410}
            left={-430}
          />
          <Icons.Dot
            fill="base.primary"
            opacity={0.9}
            size={200}
            position="absolute"
            bottom={290}
            left={680}
          />
          <Icons.Dot
            fill="base.secondary"
            opacity={0.5}
            size={100}
            position="absolute"
            bottom={230}
            left={770}
          />
          <LogoSlot>
            <Logo size={96} fill="base.secondary" alignSelf="center" />
          </LogoSlot>
          <Heading>{props.heading || customizations.defaulthHeading}</Heading>
          <SubHeading>
            {props.subHeading || customizations.defaultSubHeading}
          </SubHeading>
        </BrandPanel>

        <InstructionsPanel>{props.children}</InstructionsPanel>
      </Container>
    </Layout>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  subHeading: PropTypes.string,
};

export default AuthLayout;
