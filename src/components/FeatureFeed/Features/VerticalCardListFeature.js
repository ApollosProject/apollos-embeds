import React from "react";
import { useNavigate } from "react-router-dom";

import { getURLFromType } from "../../../utils";
import { ContentCard, Box, H3, systemPropTypes, Button } from "../../../ui-kit";

import VerticalCardList from "./VerticalCardListFeature.styles";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    partialVisibilityGutter: 30,
  },
};

function VerticalCardListFeature(props = {}) {
  const navigate = useNavigate();

  const handleActionPress = (item) => {
    navigate({
      pathname: "/",
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  const handlePrimaryActionPress = (action) => {
    navigate({
      pathname: "/",
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
        {props?.feature?.cards?.length >= 5 && props?.feature?.primaryAction ? (
          <Button
            title="View All >"
            type="link"
            onClick={handlePrimaryActionPress}
          />
        ) : null}
      </Box>
      <VerticalCardList.VerticalCarouselContainer>
        <VerticalCardList.VerticalCarouselList
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
        >
          {props.feature?.cards?.map((item, index) => (
            <VerticalCardList.VerticalCarouselItem>
              <ContentCard
                key={item.title}
                image={item.coverImage}
                title={item.title}
                summary={item.summary}
                onClick={() => handleActionPress(item)}
                videoMedia={item.relatedNode?.videos[0]}
              />
            </VerticalCardList.VerticalCarouselItem>
          ))}
        </VerticalCardList.VerticalCarouselList>
      </VerticalCardList.VerticalCarouselContainer>
    </Box>
  );
}

VerticalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default VerticalCardListFeature;
