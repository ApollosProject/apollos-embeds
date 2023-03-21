import React from "react";
import { withTheme } from "styled-components";
import isNil from "lodash/isNil";
import { Check } from "phosphor-react";

import {
  BodyText,
  SmallBodyText,
  Box,
  H4,
  systemPropTypes,
  ProgressBar,
} from "../../ui-kit";
import { useVideoMediaProgress } from "../../hooks";
import { getPercentWatched } from "../../utils";
import {
  Title,
  Image,
  BottomSlot,
  CompleteIndicator,
  Ellipsis,
} from "./ContentCard.styles";

function ContentCard(props = {}) {
  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress(
    {
      variables: { id: props.videoMedia?.id },
      skip: !props.videoMedia?.id,
    }
  );

  const percentWatched = getPercentWatched({
    duration: props.videoMedia?.duration,
    userProgress,
  });

  return (
    <Box
      flex={1}
      m={"0 10px"}
      cursor={props.onClick ? "pointer" : "default"}
      borderRadius="xl"
      overflow="hidden"
      backgroundColor="neutral.gray6"
      boxShadow="medium"
      height="100%"
      display={props.horizontal ? "flex" : ""}
      {...props}
    >
      <Box position="relative" width={props.horizontal ? "50%" : ""}>
        {/* Image */}
        <Box
          backgroundSize="cover"
          paddingBottom="56.25%"
          backgroundPosition="center"
          backgroundImage={`url(${
            props.image?.sources[0].uri ? props.image.sources[0].uri : null
          })`}
          height="100%"
        />
        {/* Progress / Completed Indicators */}
        <BottomSlot>
          {userProgress?.complete ? (
            <CompleteIndicator alignSelf="flex-end">
              <Check size={18} />
            </CompleteIndicator>
          ) : null}

          {percentWatched > 0 ? <ProgressBar percent={percentWatched} /> : null}
        </BottomSlot>
      </Box>
      {/* Masthead */}
      <Box
        padding="base"
        background="material.regular"
        backdrop-filter="blur(64px)"
        width={props.horizontal ? "50%" : ""}
      >
        <SmallBodyText color="text.secondary">{props.subtitle}</SmallBodyText>
        <H4>{props.title}</H4>
        <SmallBodyText color="text.secondary">{props.summary}</SmallBodyText>
      </Box>
    </Box>
  );
}

ContentCard.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ContentCard);
