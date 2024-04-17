import React from 'react';
import get from 'lodash/get';

import { Box, H2, systemPropTypes, Button, MediaItem, ButtonGroup } from '../../../ui-kit';
import Carousel from 'react-multi-carousel';
import { CaretRight } from '@phosphor-icons/react';

import useHandleActionPress, {
  useHandlePrimaryActionPress,
} from '../../../hooks/useHandleActionPress';

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
  const handleActionPress = useHandleActionPress();
  const handlePrimaryActionPress = useHandlePrimaryActionPress(props.feature);

  if (props?.feature?.items?.length === 0 || !props?.feature?.items) {
    return null;
  }

  return (
    <Box pb="xl" mb="l" {...props}>
      <Box display="flex" alignItems="center" mb="xs">
        <H2 flex="1" mr="xs">
          {props.feature.title || props.feature.subtitle}
        </H2>
        {props?.feature?.items?.length >= SHOW_VIEW_ALL_LIMIT && props?.feature?.primaryAction ? (
          <Button
            title="View All"
            variant="link"
            onClick={handlePrimaryActionPress}
            icon={<CaretRight className="primary-action-icon" size={18} weight="bold" />}
            className="primary-action-button"
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
        <Box width="100%" display="flex" justifyContent="center" pt="l" px="l" textAlign="center">
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
