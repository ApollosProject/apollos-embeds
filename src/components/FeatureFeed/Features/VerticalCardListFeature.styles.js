import styled from "styled-components";
import { space } from "styled-system";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { withTheme } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { TypeStyles } from "../../../ui-kit/Typography";

const VerticalCarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
  position: relative;
`;

const VerticalCarouselList = styled(Carousel)`
  display: flex;
  align-items: center;
  transform: rotate(90deg);
  width: 800px;
  min-width: 800px;
  height: 400px;

  .react-multi-carousel-track {
    align-items: center;
  }

  .react-multi-carousel-item {
  }
`;

const VerticalCarouselItem = styled.div`
  transform: rotate(-90deg);
`;

const VerticalCardList = {
  VerticalCarouselContainer,
  VerticalCarouselList,
  VerticalCarouselItem,
};

export default VerticalCardList;
