import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { ContentCard, Box, H3, systemPropTypes, Button } from '../../../ui-kit';
import {
  add as addBreadcrumb,
  useBreadcrumb,
} from '../../../providers/BreadcrumbProvider';

import Carousel from 'react-multi-carousel';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

function HorizontalCardListFeature(props = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useBreadcrumb();
  const handleActionPress = (item) => {
    dispatch(
      addBreadcrumb({
        url: `?id=${getURLFromType(item.relatedNode)}`,
        title: item.relatedNode?.title,
      })
    );
    setSearchParams(`?id=${getURLFromType(item.relatedNode)}`);
  };

  const handlePrimaryActionPress = () => {
    dispatch(
      addBreadcrumb({
        url: `?id=${getURLFromType(props?.feature?.primaryAction.relatedNode)}`,
        title: props?.feature?.title,
      })
    );
    setSearchParams(
      `?id=${getURLFromType(props?.feature?.primaryAction.relatedNode)}`
    );
  };

  return (
    <Box pb="l" {...props}>
      <Box display="flex">
        <H3 flex="1" mb="xs">
          {props.feature.title}
        </H3>
        {props?.feature?.cards?.length >= 5 && props?.feature?.primaryAction ? (
          <Button
            title="View All >"
            type="link"
            onClick={handlePrimaryActionPress}
          />
        ) : null}
      </Box>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
      >
        {props.feature?.cards?.map((item, index) => (
          <ContentCard
            key={item.title}
            image={item.coverImage}
            title={item.title}
            summary={item.summary}
            onClick={() => handleActionPress(item)}
            videoMedia={item.relatedNode?.videos[0]}
          />
        ))}
      </Carousel>
    </Box>
  );
}

HorizontalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalCardListFeature;
