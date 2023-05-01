import React from 'react';
import { withTheme } from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { getURLFromType } from '../../../utils';

import {
  BodyText,
  Box,
  Button,
  H1,
  H2,
  H3,
  H4,
  systemPropTypes,
  Search,
} from '../../../ui-kit';

function HeroListFeature(props = {}) {
  const navigate = useNavigate();

  // Event Handlers
  const handleWatchNowPress = () => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(props.feature?.heroCard?.relatedNode)}`,
    });
  };
  const handlePrimaryActionClick = () => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(props.feature.primaryAction.relatedNode)}`,
    });
  };

  return (
    <Box mb="base" minWidth="180px" {...props}>
      {/* Content */}
      <Search />
      <Box
        position="relative"
        backgroundColor="neutral.gray6"
        borderRadius="l"
        overflow="hidden"
      >
        {/* Image */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          width="100%"
          maxHeight="700px"
          overflow="hidden"
        >
          <Box
            as="img"
            src={props.feature.heroCard.coverImage?.sources[0]?.uri}
            width="100%"
            height="100%"
          />
        </Box>
        {/* Masthead */}
        <Box
          padding="base"
          backgroundColor="neutral.gray6"
          backdrop-filter="blur(64px)"
        >
          <H3>{props.feature.heroCard.title}</H3>
          <BodyText>{props.feature.heroCard.summary}</BodyText>

          {/* CTAs */}
          <Box
            display="flex"
            alignSelf="flex-start"
            flexDirection={{
              _: 'column',
              md: 'row',
            }}
            mt="base"
          >
            <Button
              mr={{
                _: '0',
                md: 'base',
              }}
              mb={{
                _: 'base',
                md: '0',
              }}
              title="Watch now"
              onClick={handleWatchNowPress}
            />
            {props.feature.primaryAction ? (
              <Button
                title={props.feature.primaryAction.title}
                onClick={handlePrimaryActionClick}
                type="secondary"
              />
            ) : null}
          </Box>
        </Box>
        {/* Actions / Cards list */}
        {props.feature.actions?.length ? (
          <Box>
            {/* List Header */}
            {props.feature.title || props.feature.subtitle ? (
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
                mb="s"
                px="base"
              >
                <Box>
                  <H4 color="text.secondary">{props.feature.subtitle}</H4>
                  <H3>{props.feature.title}</H3>
                </Box>
              </Box>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

HeroListFeature.propTypes = {
  ...systemPropTypes,
};

export default withTheme(HeroListFeature);
