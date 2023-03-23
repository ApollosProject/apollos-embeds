import styled from "styled-components";
import { space } from "styled-system";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { withTheme } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { TypeStyles } from "../../../ui-kit/Typography";

const VerticalListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-gap: 20px;
  @media screen and (max-width: ${themeGet("breakpoints.lg")}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: ${themeGet("breakpoints.md")}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const VerticalCardList = {
  VerticalListContainer,
};

export default VerticalCardList;
