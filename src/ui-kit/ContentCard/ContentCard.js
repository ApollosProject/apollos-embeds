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
    <Box flex={1} cursor={props.onClick ? 'pointer' : 'default'} {...props}>
      {/* Content */}
      <Box
        position="relative"
        backgroundColor="neutral.gray6"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="medium"
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
    </Box>
  );
}

ContentCard.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ContentCard);
