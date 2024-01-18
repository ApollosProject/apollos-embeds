import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, ResourceCard, Box } from '../../../ui-kit';
import Styled from './ActionListFeature.styles';
import { useNavigate } from 'react-router-dom';

function ScriptureFeature(props = {}) {
  const navigate = useNavigate();

  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  if (props?.feature?.actions?.length === 0 || !props?.feature?.actions) {
    return null;
  }

  return (
    <Box>
      <Box padding="xs" fontWeight="600" color="base.gray" id="results">
        {props.feature.title || props.feature.subtitle}
      </Box>
      <Styled.List>
        {props.feature?.actions?.map((item, index) => {
          return (
            <Styled.Wrapper key={index}>
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

ScriptureFeature.propTypes = {
  ...systemPropTypes,
};

export default ScriptureFeature;
