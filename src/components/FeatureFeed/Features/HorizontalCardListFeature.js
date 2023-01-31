import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { ContentCard, Box, H3, systemPropTypes, Button } from '../../../ui-kit';

function HorizontalCardListFeature(props = {}) {
  const navigate = useNavigate();

  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  const handlePrimaryActionPress = (action) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(
        props?.feature?.primaryAction.relatedNode
      )}`,
    });
  };

  return (
    <Box pb="l" {...props}>
      <Box display="flex">
        <H3 flex="1" mb="xs">
          {props.feature.title}
        </H3>
        {props?.feature?.cards.length >= 5 && props?.feature?.primaryAction ? (
          <Button
            title="View All >"
            type="link"
            onClick={handlePrimaryActionPress}
          />
        ) : null}
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="20px">
        {props.feature?.cards?.map((item, index) => (
          <ContentCard
            key={item.title}
            image={item.coverImage}
            title={item.title}
            summary={item.summary}
            onClick={() => handleActionPress(item)}
          />
        ))}
      </Box>
    </Box>
  );
}

HorizontalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalCardListFeature;
