import React from 'react';
import get from 'lodash/get';
import { useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { ContentCard, Box, H2, systemPropTypes, Button, ButtonGroup } from '../../../ui-kit';
import { add as addBreadcrumb, useBreadcrumbDispatch } from '../../../providers/BreadcrumbProvider';
import { open as openModal, set as setModal, useModal } from '../../../providers/ModalProvider';
import { CaretRight } from 'phosphor-react';
import { useAnalytics } from '../../../providers/AnalyticsProvider';

import Carousel from 'react-multi-carousel';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();
  const [state, dispatch] = useModal();
  const analytics = useAnalytics();

  const handleActionPress = (item) => {
    if (item.action === 'OPEN_URL') {
      analytics.track('OpenUrl', {
        url: item?.relatedNode?.url,
      });
      return window.open(getURLFromType(item.relatedNode), '_blank');
    }

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
    if (searchParams.get('id') !== getURLFromType(props?.feature?.primaryAction.relatedNode)) {
      if (props?.feature?.title) {
        dispatchBreadcrumb(
          addBreadcrumb({
            url: `?id=${getURLFromType(props?.feature?.primaryAction.relatedNode)}`,
            title: props?.feature?.title,
          })
        );
      }
      const id = getURLFromType(props?.feature?.primaryAction.relatedNode);
      if (props.feature?.primaryAction?.action === 'OPEN_FEED') {
        analytics.track('OpenFeatureFeed', {
          featureFeedId: props.feature?.primaryAction?.relatedNode?.id,
          fromFeatureId: props.feature?.id,
          title: props.feature?.title,
        });
      }

      state.modal ? setSearchParams({ id }) : setSearchParams({ id, action: 'viewall' });
    }
  };

  if (props?.feature?.cards?.length === 0 || !props?.feature?.cards) {
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
      {props?.feature?.primaryAction && props?.feature?.cards?.length <= 2 ? (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          mt="xs"
          mb={{ _: '0', md: 'l' }}
        >
          {props?.feature?.cards?.length === 1 ? (
            <ContentCard
              key={props?.feature?.cards[0].title}
              image={props?.feature?.cards[0].coverImage}
              title={props?.feature?.cards[0].title}
              summary={props?.feature?.cards[0].subtitle}
              channelLabel={props?.feature?.cards[0]?.relatedNode?.parentItem?.title}
              videoMedia={get(props?.feature?.cards[0], 'relatedNode?.videos[0]', null)}
              onClick={() => handleActionPress(props?.feature?.cards[0])}
              horizontal={true}
            />
          ) : (
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
          )}
        </Box>
      ) : props?.feature?.cards?.length >= 1 ? (
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
              channelLabel={item?.relatedNode?.parentItem?.title}
              onClick={() => handleActionPress(item)}
              videoMedia={get(item, 'relatedNode?.videos[0]', null)}
              m={'0 20px 0 1px'}
            />
          ))}
        </Carousel>
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

HorizontalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalCardListFeature;
