import React from 'react';
import get from 'lodash/get';
import { useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import {
  ContentCard,
  Box,
  H3,
  systemPropTypes,
  Button,
  ButtonGroup,
} from '../../../ui-kit';
import {
  add as addBreadcrumb,
  useBreadcrumbDispatch,
} from '../../../providers/BreadcrumbProvider';
import {
  open as openModal,
  set as setModal,
  useModal,
} from '../../../providers/ModalProvider';

import Carousel from 'react-multi-carousel';

const SHOW_VIEW_ALL_LIMIT = 5;

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

function HorizontalCardListFeature(props = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();
  const [state, dispatch] = useModal();

  const handleActionPress = (item) => {
    if (searchParams.get('id') !== getURLFromType(item.relatedNode)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(item.relatedNode)}`,
          title: item.relatedNode?.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(item.relatedNode)}`);
    }
    if (state.modal) {
      const url = getURLFromType(item.relatedNode);
      dispatch(setModal(url));
      dispatch(openModal());
    }
  };

  const handlePrimaryActionPress = () => {
    if (
      searchParams.get('id') !==
      getURLFromType(props?.feature?.primaryAction.relatedNode)
    ) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(
            props?.feature?.primaryAction.relatedNode
          )}`,
          title: props?.feature?.title,
        })
      );
      setSearchParams(
        `?id=${getURLFromType(props?.feature?.primaryAction.relatedNode)}`
      );
    }
  };

  if (props?.feature?.cards?.length === 0 || !props?.feature?.cards) {
    return null;
  }

  return (
    <Box pb="l" {...props}>
      <Box display="flex" alignItems="center" mb="xs">
        <H3 flex="1" mr="xs">
          {props.feature.title}
        </H3>
        {props?.feature?.cards?.length >= SHOW_VIEW_ALL_LIMIT &&
        props?.feature?.primaryAction ? (
          <Button
            title="View All >"
            variant="link"
            onClick={handlePrimaryActionPress}
          />
        ) : null}
      </Box>

      {props?.feature?.cards?.length >= 1 ? (
        <Carousel
          arrows={false}
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          keyBoardControl={true}
          customButtonGroup={<ButtonGroup />}
          renderButtonGroupOutside
        >
          {props.feature?.cards?.map((item, index) => (
            <ContentCard
              key={item.title}
              image={item.coverImage}
              title={item.title}
              summary={item.summary}
              onClick={() => handleActionPress(item)}
              videoMedia={get(item, 'relatedNode?.videos[0]', null)}
            />
          ))}
        </Carousel>
      ) : (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          pt="l"
          px="l"
          textAlign="center"
        >
          {props.feature.title === 'Continue Watching' ? (
            <Box fontSize="16px" fontWeight="600" color="base.primary">
              All caught up? Check out our other sections for more content!
            </Box>
          ) : (
            <Box fontStyle="italic" fontSize="14px">
              Sorry, there is no media available at this time.
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

HorizontalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalCardListFeature;
