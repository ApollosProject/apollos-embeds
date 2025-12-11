import React from 'react';

import PropTypes from 'prop-types';

import Styled from './ChipListFeature.styles';
import { systemPropTypes, Box, PhospherIcon } from '../../../ui-kit';

function ChipListFeature({ feature }) {
  if (feature?.chips?.length === 0 || !feature?.chips) {
    return null;
  }

  const title = feature.title || feature.subtitle;
  const origin = window.location.origin;

  return (
    <Box className="chip-list-feature">
      {!!title ? (
        <Box padding="xs" fontWeight="600" color="base.gray" id="results">
          {title}
        </Box>
      ) : null}
      <Styled.List>
        {feature?.chips?.map(({ title, iconName, relatedNode }, index) => {
          const linkOrigin = new URL(relatedNode.url).origin;
          const external = linkOrigin !== origin;
          return (
            <Styled.Chip href={relatedNode.url} key={index} target={external ? '_blank' : '_self'}>
              <PhospherIcon
                name={iconName || 'arrow-up-right'}
                size={20}
                weight="bold"
                color="#8E8E93"
              />
              <span>{title}</span>
            </Styled.Chip>
          );
        })}
      </Styled.List>
    </Box>
  );
}

ChipListFeature.propTypes = {
  ...systemPropTypes,
  feature: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    chips: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        iconName: PropTypes.string,
        relatedNode: PropTypes.shape({
          url: PropTypes.string,
        }),
      })
    ),
  }),
};

export default ChipListFeature;
