import React, { useState, useEffect } from 'react';

import { systemPropTypes } from '../_lib/system';
import { Box } from '..';
import Styled from './ButtonGroup.styles';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide, slidesToShow, totalItems },
  } = rest;

  const isRightEndReach = !(currentSlide + slidesToShow < totalItems);

  if (totalItems <= slidesToShow) {
    return <></>;
  }
  return (
    <Styled.ButtonGroup className="slide-button-group">
      <Styled.Button
        disabled={currentSlide === 0}
        onClick={() => goToSlide(currentSlide - 1)}
        className="slide-button-left"
      >
        {<CaretLeft weight="bold" size={20} />}
      </Styled.Button>
      <Styled.Button
        disabled={isRightEndReach}
        onClick={() => goToSlide(currentSlide + 1)}
        className="slide-button-right"
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
