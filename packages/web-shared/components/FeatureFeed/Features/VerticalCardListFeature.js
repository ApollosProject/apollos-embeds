import React from 'react';

import { CaretRight } from '@phosphor-icons/react';

import Styled from './VerticalCardListFeature.styles';
import useHandleActionPress, {
  useHandlePrimaryActionPress,
} from '../../../hooks/useHandleActionPress';
import { ContentCard, Box, H2, systemPropTypes, Button } from '../../../ui-kit';

function VerticalCardListFeature(props = {}) {
  const handleActionPress = useHandleActionPress();
  const handlePrimaryActionPress = useHandlePrimaryActionPress(props.feature);

  const cards = props.feature?.cards;
  return (
    <Box pb="l" {...props}>
      <Box display="flex">
        <H2 flex="1" mb="xs">
          {props.feature.title || props.feature.subtitle}
        </H2>
        {props?.feature?.cards?.length >= 5 && props?.feature?.primaryAction ? (
          <Button
            title="View All"
            variant="link"
            onClick={handlePrimaryActionPress}
            icon={<CaretRight size={18} weight="bold" />}
            className="primary-action-button"
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
              videoMedia={item.relatedNode?.videos?.[0]}
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
