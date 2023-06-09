import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { ContentCard, Box, H3, systemPropTypes, Button } from '../../../ui-kit';
import Styled from './ChipList.styles';
import { ArrowUpRight } from 'phosphor-react';

function ChipList(props = {}) {
  //   const temp = ['Give', 'Service Times', 'Childcare', 'Chip', 'Test'];
  return (
    <Styled.List>
      {props.items.map((label) => {
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

ChipList.propTypes = {
  ...systemPropTypes,
};

export default ChipList;
