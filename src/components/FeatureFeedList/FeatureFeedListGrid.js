import React from 'react';

import { useSearchParams, useLocation } from 'react-router-dom';
import { withTheme } from 'styled-components';

import { getURLFromType } from '../../utils';
import { Box, ContentCard, H3 } from '../../ui-kit';

function FeatureFeedListGrid(props = {}) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // const [viewWidth, setViewWidth] = React.useState(0);
  // const boxWidth = viewWidth * 0.25 - 66;
  console.log('location2', location);

  const handleActionPress = (item) => {
    setSearchParams(`?id=${getURLFromType(item.relatedNode)}`, {
      state: {
        ...location.state,
        ...{
          [window.history.state.idx - 1]: {
            url: `?id=${getURLFromType(item.relatedNode)}`,
            title: item.title,
          },
        },
      },
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
