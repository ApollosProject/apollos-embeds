import React, { useState, useEffect } from 'react';

import { systemPropTypes } from '../_lib/system';
import { Box } from '..';
import Styled from './ButtonGroup.styles';
import { CaretLeft, CaretRight } from 'phosphor-react';

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide, slidesToShow, totalItems },
  } = rest;

  const isRightEndReach = !(currentSlide + slidesToShow < totalItems);

  if (totalItems <= slidesToShow) {
    return <></>;
  }
  return (
    <Styled.ButtonGroup>
      <Styled.Button
        disabled={currentSlide === 0}
        onClick={() => goToSlide(currentSlide - 1)}
      >
        {<CaretLeft weight="bold" size={20} />}
      </Styled.Button>
      <Styled.Button
        disabled={isRightEndReach}
        onClick={() => goToSlide(currentSlide + 1)}
      >
        {<CaretRight weight="bold" size={20} />}
      </Styled.Button>
    </Styled.ButtonGroup>
  );
};

ButtonGroup.propTypes = {
  ...systemPropTypes,
};

export default ButtonGroup;
