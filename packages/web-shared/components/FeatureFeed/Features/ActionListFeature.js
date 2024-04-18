import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, ResourceCard, Box, H5 } from '../../../ui-kit';
import Styled from './ActionListFeature.styles';
import { useNavigation } from '../../../providers/NavigationProvider';

function ActionListFeature({ feature, emptyPlaceholderText }) {
  const { navigate } = useNavigation();

  const handleActionPress = (item) => {
    navigate({
      id: getURLFromType(item.relatedNode),
    });
  };

  if (feature?.actions?.length === 0 || !feature?.actions) {
    if (emptyPlaceholderText) {
      return (
        <Box className="empty-placeholder-text-container">
          <H5 className="empty-placeholder-text">{emptyPlaceholderText}</H5>
        </Box>
      );
    }
    return null;
  }

  return (
    <Box>
      <Box padding="xs" fontWeight="600" color="base.gray" id="results">
        {feature.title || feature.subtitle}
      </Box>
      <Styled.List>
        {feature?.actions?.map((item, index) => {
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

ActionListFeature.propTypes = {
  ...systemPropTypes,
};

export default ActionListFeature;
