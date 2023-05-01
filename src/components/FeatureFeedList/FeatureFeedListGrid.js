import React from 'react';

import { useSearchParams } from 'react-router-dom';
import { withTheme } from 'styled-components';

import { getURLFromType } from '../../utils';
import { Box, ContentCard, H3 } from '../../ui-kit';
import {
  add as addBreadcrumb,
  useBreadcrumb,
} from '../../providers/BreadcrumbProvider';

function FeatureFeedListGrid(props = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useBreadcrumb();
  // const [viewWidth, setViewWidth] = React.useState(0);
  // const boxWidth = viewWidth * 0.25 - 66;

  const handleActionPress = (item) => {
    if (searchParams.get('id') !== getURLFromType(item.relatedNode)) {
      dispatch(
        addBreadcrumb({
          url: `?id=${getURLFromType(item.relatedNode)}`,
          title: item.relatedNode?.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(item.relatedNode)}`);
    } else {
      return null;
    }
  };

  return (
    <Box pb="l" {...props}>
      <Box
        display="grid"
        gridGap="20px"
        gridTemplateColumns={{
          _: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
      >
        {props.data.features[0]?.cards?.map((item, index) => (
          <ContentCard
            key={item.title}
            image={item.coverImage}
            title={item.title}
            summary={item.summary}
            onClick={() => handleActionPress(item)}
            videoMedia={item.relatedNode?.videos[0]}
          />
        ))}
      </Box>
    </Box>
  );
}

export default withTheme(FeatureFeedListGrid);
