import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { Box, systemPropTypes, ResourceCard } from '../../../ui-kit';
import Styled from './VerticalResourceCardListFeature.styles';
import { ArrowUpRight } from 'phosphor-react';

function VerticalResourceCardListFeature(props = {}) {
  const temp = [
    { title: 'Title', subtitle: 'Subtitle' },
    { title: 'Title', subtitle: 'Subtitle' },
    { title: 'Title', subtitle: 'Subtitle' },
  ];
  return (
    <Styled.List>
      {temp.map((item) => {
        return (
          <Styled.Wrapper>
            <ResourceCard
              title={item.title}
              subtitle={item.subtitle}
              background="none"
            />
          </Styled.Wrapper>
        );
      })}
    </Styled.List>
  );
}

VerticalResourceCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default VerticalResourceCardListFeature;
