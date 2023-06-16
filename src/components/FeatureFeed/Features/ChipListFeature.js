import React from 'react';

import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box } from '../../../ui-kit';
import Styled from './ChipListFeature.styles';
import { ArrowUpRight } from 'phosphor-react';

import { useNavigate } from 'react-router-dom';

function ChipListFeature(props = {}) {
  return (
    <Box>
      <Box padding="xs" fontWeight="600" color="base.gray" id="results">
        {props.feature.title}
      </Box>
      <Styled.List>
        {props.feature?.chips?.map(
          ({ title, iconName, relatedNode }, index) => {
            if (index === 0) {
              return (
                <Styled.Chip ml="xs" href={relatedNode.url}>
                  <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
                  <span>{title}</span>
                </Styled.Chip>
              );
            }

            if (index === props.feature?.chips.length - 1) {
              return (
                <Styled.Chip mr="xs" href={relatedNode.url}>
                  <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
                  <span>{title}</span>
                </Styled.Chip>
              );
            }

            return (
              <Styled.Chip href={relatedNode.url}>
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
