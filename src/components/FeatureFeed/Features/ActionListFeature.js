import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, ResourceCard, Box } from '../../../ui-kit';
import Styled from './ActionListFeature.styles';
import { useNavigate } from 'react-router-dom';

function ActionListFeature(props = {}) {
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
    <Box>
      <Box padding="xs" fontWeight="600" color="base.gray" id="results">
        Title
      </Box>
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
    </Box>
  );
}

ActionListFeature.propTypes = {
  ...systemPropTypes,
};

export default ActionListFeature;
