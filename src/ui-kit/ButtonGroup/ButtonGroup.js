import React, { useState, useEffect } from 'react';

import { systemPropTypes } from '../_lib/system';
import { Box } from '..';
import Styled from './ButtonGroup.styles';
import { CaretLeft, CaretRight } from 'phosphor-react';

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  console.log(rest);
  const {
    carouselState: { currentSlide, deviceType, totalItems },
  } = rest;
  if (deviceType === 'desktop' && totalItems < 3) {
    return <></>;
  }
  return (
    <Styled.ButtonGroup>
      <Styled.Button onClick={() => goToSlide(currentSlide - 1)}>
        {<CaretLeft weight="bold" size={20} />}
      </Styled.Button>
      <Styled.Button onClick={() => goToSlide(currentSlide + 1)}>
        {<CaretRight weight="bold" size={20} />}
      </Styled.Button>
    </Styled.ButtonGroup>
  );
};

ButtonGroup.propTypes = {
  ...systemPropTypes,
};

export default ButtonGroup;
