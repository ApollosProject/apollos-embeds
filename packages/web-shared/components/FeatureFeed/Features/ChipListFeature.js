import React from 'react';

import { systemPropTypes, Box, PhospherIcon } from '../../../ui-kit';
import Styled from './ChipListFeature.styles';

function ChipListFeature(props = {}) {
  if (props?.feature?.chips?.length === 0 || !props?.feature?.chips) {
    return null;
  }

  return (
    <Box className="chip-list-feature">
      <Box padding="xs" fontWeight="600" color="base.gray" id="results">
        {props.feature.title || props.feature.subtitle}
      </Box>
      <Styled.List>
        {props.feature?.chips?.map(({ title, iconName, relatedNode }, index) => {
          return (
            <Styled.Chip href={relatedNode.url} key={index}>
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
};

export default ChipListFeature;
