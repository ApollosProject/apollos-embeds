import React from 'react';
import get from 'lodash/get';
import { useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import {
  Box,
  H3,
  systemPropTypes,
  Button,
  MediaItem,
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
import { CaretRight } from 'phosphor-react';
const SHOW_VIEW_ALL_LIMIT = 5;

const responsive = {
  lg: {
    breakpoint: { max: 3000, min: 800 },
    items: 3,
  },
  md: {
    breakpoint: { max: 800, min: 428 },
    items: 2,
  },
  sm: {
    breakpoint: { max: 428, min: 0 },
    items: 1,
  },
};

function HorizontalMediaListFeature(props = {}) {
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
      const id = getURLFromType(props?.feature?.primaryAction.relatedNode);
      state.modal
        ? setSearchParams({ id })
        : setSearchParams({ id, action: 'viewall' });
    }
  };

  if (props?.feature?.items?.length === 0 || !props?.feature?.items) {
    return null;
  }

  return (
    <Box pb="xl" {...props}>
      <Box display="flex" alignItems="center" mb="xs">
        <H3 flex="1" mr="xs">
          {props.feature.title || props.feature.subtitle}
        </H3>
        {props?.feature?.items?.length >= SHOW_VIEW_ALL_LIMIT &&
        props?.feature?.primaryAction ? (
          <Button
            title="View All"
            variant="link"
            onClick={handlePrimaryActionPress}
            icon={<CaretRight size={18} weight="bold" />}
          />
        ) : null}
      </Box>

      {props?.feature?.items?.length >= 1 ? (
        <Box ml={'-10px'}>
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
            {props.feature?.items?.map((item, index) => {
              return (
                <MediaItem
                  m={'0 10px'}
                  key={item.id}
                  relatedNode={item.relatedNode}
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

HorizontalMediaListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalMediaListFeature;
