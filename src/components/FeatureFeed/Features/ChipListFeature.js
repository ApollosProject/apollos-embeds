import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { ContentCard, Box, H3, systemPropTypes, Button } from '../../../ui-kit';
import Styled from './ChipListFeature.styles';
import { ArrowUpRight } from 'phosphor-react';

function ChipListFeature(props = {}) {
  //   const temp = ['Give', 'Service Times', 'Childcare', 'Chip', 'Test'];
  return (
    <Styled.List>
      {props.items.map((label, index) => {
        if (index === 0) {
          return (
            <Styled.Chip ml="xs">
              <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
              <span>{label}</span>
            </Styled.Chip>
          );
        }

        if (index === props.items.length - 1) {
          return (
            <Styled.Chip mr="xs">
              <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
              <span>{label}</span>
            </Styled.Chip>
          );
        }

        return (
          <Styled.Chip>
            <ArrowUpRight size={20} weight="bold" color="#8E8E93" />
            <span>{label}</span>
          </Styled.Chip>
        );
      })}
    </Styled.List>
  );
}

ChipListFeature.propTypes = {
  ...systemPropTypes,
};

export default ChipListFeature;
