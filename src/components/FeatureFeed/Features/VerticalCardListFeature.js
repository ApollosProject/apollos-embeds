import React from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import { getURLFromType } from "../../../utils";
import { ContentCard, Box, H3, systemPropTypes, Button } from "../../../ui-kit";
import {
  add as addBreadcrumb,
  useBreadcrumb,
} from "../../../providers/BreadcrumbProvider";

import VerticalCardList from "./VerticalCardListFeature.styles";

function VerticalCardListFeature(props = {}) {
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
  const cards = props.feature?.cards;
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
      {cards.length === 1 ? (
        <ContentCard
          key={cards[0].title}
          image={cards[0].coverImage}
          title={cards[0].title}
          summary={cards[0].summary}
          onClick={() => handleActionPress(cards[0])}
          videoMedia={cards[0].relatedNode?.videos[0]}
          horizontal={true}
        />
      ) : (
        <VerticalCardList.VerticalListContainer>
          {cards.map((item, index) => {
            if (index >= 6) return <></>;
            return (
              <ContentCard
                key={item.title}
                image={item.coverImage}
                title={item.title}
                summary={item.summary}
                onClick={() => handleActionPress(item)}
                videoMedia={item.relatedNode?.videos[0]}
              />
            );
          })}
        </VerticalCardList.VerticalListContainer>
      )}
    </Box>
  );
}

VerticalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default VerticalCardListFeature;