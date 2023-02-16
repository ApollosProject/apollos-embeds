import React from 'react';

import { useNavigate } from 'react-router-dom';
import { withTheme } from 'styled-components';

import { getURLFromType } from '../../utils';
import { Box, ContentCard, H3 } from '../../ui-kit';

function FeatureFeedListGrid(props = {}) {
  const navigate = useNavigate();

  // const [viewWidth, setViewWidth] = React.useState(0);
  // const boxWidth = viewWidth * 0.25 - 66;

  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  return (
    <Box pb="l" {...props}>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="20px">
        {props.data.features[0]?.cards?.map((item, index) => (
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

export default withTheme(FeatureFeedListGrid);
