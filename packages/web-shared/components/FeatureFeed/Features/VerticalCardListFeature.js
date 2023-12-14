import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { ContentCard, Box, H3, systemPropTypes, Button } from '../../../ui-kit';
import { add as addBreadcrumb, useBreadcrumbDispatch } from '../../../providers/BreadcrumbProvider';
import { open as openModal, set as setModal, useModal } from '../../../providers/ModalProvider';
import amplitude from '../../../analytics/amplitude';
import Styled from './VerticalCardListFeature.styles';
import { CaretRight } from 'phosphor-react';
function VerticalCardListFeature(props = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();
  const [state, dispatch] = useModal();

  const handleActionPress = (item) => {
    if (item.action === 'OPEN_URL') {
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
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(props?.feature?.primaryAction.relatedNode)}`,
          title: props?.feature?.title,
        })
      );
      const id = getURLFromType(props?.feature?.primaryAction.relatedNode);

      if (props.feature?.primaryAction?.action === 'OPEN_FEED') {
        amplitude.trackEvent({
          eventName: 'FeatureFeed',
          properties: {
            featureFeedId: props.feature?.primaryAction?.relatedNode?.id,
            featureId: props.feature?.id,
            title: props.feature?.title,
          },
        });
      }

      state.modal ? setSearchParams({ id }) : setSearchParams({ id, action: 'viewall' });
    }
  };

  const cards = props.feature?.cards;
  return (
    <Box pb="l" {...props}>
      <Box display="flex">
        <H3 flex="1" mb="xs">
          {props.feature.title || props.feature.subtitle}
        </H3>
        {props?.feature?.cards?.length >= 5 && props?.feature?.primaryAction ? (
          <Button
            title="View All"
            variant="link"
            onClick={handlePrimaryActionPress}
            icon={<CaretRight size={18} weight="bold" />}
          />
        ) : null}
      </Box>
      {cards.length === 1 ? (
        <ContentCard
          key={cards[0].title}
          image={cards[0].coverImage}
          title={cards[0].title}
          summary={cards[0].summary}
          onClick={() => handleActionPress(cards[0])}
          videoMedia={cards[0].relatedNode?.videos ? cards[0].relatedNode.videos[0] : null}
          horizontal={true}
        />
      ) : (
        <Styled.Container length={cards.length}>
          {cards.map((item) => (
            <ContentCard
              key={item.title}
              image={item.coverImage}
              title={item.title}
              summary={item.summary}
              onClick={() => handleActionPress(item)}
              videoMedia={item.relatedNode?.videos[0]}
            />
          ))}
        </Styled.Container>
      )}
    </Box>
  );
}

VerticalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default VerticalCardListFeature;
