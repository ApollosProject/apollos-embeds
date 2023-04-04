import React, { useState, useEffect } from 'react';

import { systemPropTypes } from '../_lib/system';
import { Box } from '../../ui-kit';

const CustomArrow = ({ direction, onClick, ...props }) => {
  console.log(props);
  //   const {
  //     onMove,
  //     carouselState: { currentSlide, deviceType },
  //   } = rest;
  //   // onMove means if dragging or swiping in progress.

  const leftArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#000000"
      viewBox="0 0 256 256"
      style={{
        fontSize: '50px',
      }}
    >
      <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
    </svg>
  );

  const rightArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#000000"
      viewBox="0 0 256 256"
      style={{
        fontSize: '50px',
      }}
    >
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
    </svg>
  );

  return (
    <Box
      as="button"
      onClick={onClick}
      position="absolute"
      top="50%"
      left={direction === 'left' ? 0 : ''}
      right={direction === 'right' ? 0 : ''}
      minWidth="40px"
      maxWidth="40px"
      width="40px"
      fontSize="80px"
      color="#fff"
      background="transparent"
      border={0}
    >
      {direction === 'left' ? leftArrow : rightArrow}
    </Box>
  );
};

CustomArrow.propTypes = {
  ...systemPropTypes,
};

export default CustomArrow;
