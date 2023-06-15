import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, ResourceCard, Box } from '../../../ui-kit';
import Styled from './ActionListFeature.styles';
import { useNavigate } from 'react-router-dom';

function ActionListFeature(props = {}) {
  console.log('action', props);
  const navigate = useNavigate();

  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  return (
    <Box>
      <Box padding="xs" fontWeight="600" color="base.gray" id="results">
        {props.feature.title}
      </Box>
      <Styled.List>
        {props.feature?.actions?.map((item) => {
          return (
            <Styled.Wrapper>
              <ResourceCard
                title={item.title}
                subtitle={item.subtitle}
                leadingAsset={item?.image}
                onClick={() => handleActionPress(item)}
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
