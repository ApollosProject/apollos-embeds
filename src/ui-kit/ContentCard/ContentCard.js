import React from 'react';
import { withTheme } from 'styled-components';

import {
  BodyText,
  SmallBodyText,
  Box,
  H4,
  systemPropTypes,
} from '../../ui-kit';

function ContentCard(props = {}) {
  return (
    <Box
      flex={1}
      m={'0 10px'}
      cursor={props.onClick ? 'pointer' : 'default'}
      borderRadius="xl"
      overflow="hidden"
      backgroundColor="neutral.gray6"
      boxShadow="medium"
      height="100%"
      {...props}
    >
      {/* Image */}
      <Box
        backgroundSize="cover"
        paddingBottom="56.25%"
        backgroundPosition="center"
        backgroundImage={`url(${
          props.image?.sources[0].uri ? props.image.sources[0].uri : null
        })`}
      />
      {/* Masthead */}
      <Box
        padding="base"
        background="material.regular"
        backdrop-filter="blur(64px)"
      >
        <SmallBodyText color="text.secondary">{props.subtitle}</SmallBodyText>
        <H4>{props.title}</H4>
        <SmallBodyText color="text.secondary">{props.summary}</SmallBodyText>
      </Box>
    </Box>
  );
}

ContentCard.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ContentCard);
