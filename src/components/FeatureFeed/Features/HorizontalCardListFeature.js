import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getURLFromType } from '../../../utils';
import { ContentCard, Box, H3, systemPropTypes, Button } from '../../../ui-kit';
import CardCarousel from '../../CardCarousel';
import { useBreakpoint } from '../../../providers/BreakpointProvider';

function HorizontalCardListFeature(props = {}) {
  const navigate = useNavigate();
  const { responsive } = useBreakpoint();

  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  const handlePrimaryActionPress = (action) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(
        props?.feature?.primaryAction.relatedNode
      )}`,
    });
  };

  return (
    <Box pb="l" {...props}>
      <Box display="flex">
        <H3 flex="1" mb="xs">
          {props.feature.title}
        </H3>
        {props?.feature?.cards.length >= 5 && props?.feature?.primaryAction ? (
          <Button
            title="View All >"
            type="link"
            onClick={handlePrimaryActionPress}
          />
        ) : null}
      </Box>
      <CardCarousel
        data={props.feature.cards}
        primaryAction={props.feature.primaryAction}
        featureTitle={props.feature.title}
        outerGap={responsive({
          _: 'base',
          lg: 'xl',
        })}
        visibleCount={responsive({
          _: 1,
          md: 2,
          lg: 4,
          xl: 5,
        })}
        renderItem={({ item }) => (
          <ContentCard
            image={item.coverImage}
            title={item.title}
            // onClick={() => handleActionPress(item)}
          />
        )}
      />
    </Box>
  );
}

HorizontalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalCardListFeature;
