import React from 'react';

import { getURLFromType } from '../../../utils';
import { systemPropTypes } from '../../../ui-kit';
import Styled from './ChipListFeature.styles';
import { ArrowUpRight } from 'phosphor-react';

import { useNavigate } from 'react-router-dom';

function ChipListFeature(props = {}) {
  const navigate = useNavigate();
  const handleActionPress = () => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(props.relatedNode)}`,
    });
  };

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