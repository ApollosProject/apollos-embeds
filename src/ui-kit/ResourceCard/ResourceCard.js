import React from "react";

import { systemPropTypes } from "../_lib/system";
import { Box } from "..";
import Styled from "./ResourceCard.styles";
import { getURLFromType } from "../../utils";
import { useNavigate } from "react-router-dom";

function ResourceCard({
  title,
  subtitle,
  leadingIcon,
  tailingIcon,
  node,
  ...props
}) {
  const navigate = useNavigate();
  const handleActionPress = (item) => {
    navigate({
      pathname: "/",
      search: `?id=${getURLFromType(node)}`,
    });
  };

  return (
    <Box
      cursor={props.onClick ? "pointer" : "default"}
      onClick={props.onClick && handleActionPress}
    >
      <Styled.ResourceCard>
        <Styled.LeadingIcon>{leadingIcon}</Styled.LeadingIcon>
        <Styled.Wrapper>
          <Styled.Heading>
            <Styled.Title>{title}</Styled.Title>
            <Styled.Subtitle>{subtitle}</Styled.Subtitle>
          </Styled.Heading>
          <Styled.TailingIcon>
            {tailingIcon}
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L8.5 9L1 16.5"
                stroke="#AFAFB3"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Styled.TailingIcon>
        </Styled.Wrapper>
      </Styled.ResourceCard>
    </Box>
  );
}

ResourceCard.propTypes = {
  ...systemPropTypes,
};

export default ResourceCard;
