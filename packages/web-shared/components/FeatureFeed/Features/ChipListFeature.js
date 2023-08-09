import React from 'react';

import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box } from '../../../ui-kit';
import Styled from './ChipListFeature.styles';
import { ArrowUpRight } from 'phosphor-react';

import { useNavigate } from 'react-router-dom';

function ChipListFeature(props = {}) {
  if (props?.feature?.chips?.length === 0 || !props?.feature?.chips) {
    return null;
  }

  return (
    <Box>
      <Box padding="xs" fontWeight="600" color="base.gray" id="results">
        {props.feature.title || props.feature.subtitle}
      </Box>
      <Styled.List>
        {props.feature?.chips?.map(
          ({ title, iconName, relatedNode }, index) => {
            if (index === 0) {
              return (
                <Styled.Chip ml="xs" href={relatedNode.url} key={index}>
                  <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
                  <span>{title}</span>
                </Styled.Chip>
              );
            }

            if (index === props.feature?.chips.length - 1) {
              return (
                <Styled.Chip mr="xs" href={relatedNode.url} key={index}>
                  <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
                  <span>{title}</span>
                </Styled.Chip>
              );
            }

            return (
              <Styled.Chip href={relatedNode.url} key={index}>
                <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
                <span>{title}</span>
              </Styled.Chip>
            );
          }
        )}
      </Styled.List>
    </Box>
  );
}

ChipListFeature.propTypes = {
  ...systemPropTypes,
};

export default ChipListFeature;
