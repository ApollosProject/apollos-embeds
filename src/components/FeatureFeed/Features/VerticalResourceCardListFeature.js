import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, ResourceCard } from '../../../ui-kit';
import Styled from './VerticalResourceCardListFeature.styles';
import { useNavigate } from 'react-router-dom';

function VerticalResourceCardListFeature(props = {}) {
  const navigate = useNavigate();
  const handleActionPress = () => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(props.relatedNode)}`,
    });
  };
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
