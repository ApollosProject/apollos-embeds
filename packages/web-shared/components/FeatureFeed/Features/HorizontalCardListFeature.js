import React from 'react';

import { CaretRight } from '@phosphor-icons/react';
import get from 'lodash/get';
import Carousel from 'react-multi-carousel';

import useHandleActionPress, {
  useHandlePrimaryActionPress,
} from '../../../hooks/useHandleActionPress';
import { ContentCard, Box, H2, systemPropTypes, Button, ButtonGroup } from '../../../ui-kit';

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

function HorizontalCardListFeature(props = {}) {
  const handleActionPress = useHandleActionPress();
  const handlePrimaryActionPress = useHandlePrimaryActionPress(props.feature);

  if (!props?.feature?.cards?.length) {
    return null;
  }

  return (
    <Box pb="xxl" mb="l" className="apollos-widget-feature" {...props}>
      <Box display="flex" alignItems="center" mb="xs">
        <H2 flex="1" mr="xs">
          {props.feature.title || props.feature.subtitle}
        </H2>
        {props?.feature?.primaryAction ? (
          <Button
            title="View All"
            variant="link"
            onClick={handlePrimaryActionPress}
            icon={<CaretRight className="primary-action-icon" size={18} weight="bold" />}
            className="primary-action-button"
          />
        ) : null}
      </Box>
      {props?.feature?.cards?.length <= 2 ? (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          mt="xs"
          mb={{ _: '0', md: 'l' }}
        >
          <Box
            display="grid"
            gridGap="20px"
            gridTemplateColumns={{
              _: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
            {props?.feature?.cards?.map((item) => (
              <ContentCard
                key={item.title}
                image={item.coverImage}
                title={item.title}
                channelLabel={item?.relatedNode?.parentItem?.title}
                summary={item.summary}
                onClick={() => handleActionPress(item)}
                videoMedia={get(item, 'relatedNode?.videos[0]', null)}
              />
            ))}
          </Box>
        </Box>
      ) : (
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
          {props.feature?.cards?.map((item) => (
            <ContentCard
              key={item.title}
              image={item.coverImage}
              title={item.title}
              summary={item.summary}
              channelLabel={item?.relatedNode?.parentItem?.title}
              onClick={() => handleActionPress(item)}
              videoMedia={get(item, 'relatedNode?.videos[0]', null)}
              m={'0 20px 0 1px'}
            />
          ))}
        </Carousel>
      )}
    </Box>
  );
}

HorizontalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalCardListFeature;
