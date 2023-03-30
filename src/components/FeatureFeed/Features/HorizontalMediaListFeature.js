import React from 'react';
import get from 'lodash/get';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import {
  ContentCard,
  Box,
  H3,
  systemPropTypes,
  Button,
  MediaItem,
} from '../../../ui-kit';
import { useLivestreamIsActive } from '../../../hooks';
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
    breakpoint: { max: 1024, min: 600 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

function HorizontalMediaListFeature(props = {}) {
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
        {props?.feature?.items?.length >= 5 && props?.feature?.primaryAction ? (
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
        {props.feature?.items?.map((item, index) => {
          const isLive = useLivestreamIsActive(item?.relatedNode);
          return (
            <MediaItem
              isLive={isLive}
              key={item.id}
              image={item.coverImage}
              title={item.title}
              summary={item.summary}
              onClick={() => handleActionPress(item)}
              videoMedia={get(item, 'relatedNode?.videos[0]', null)}
            />
          );
        })}
      </Carousel>
    </Box>
  );
}

HorizontalMediaListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalMediaListFeature;
