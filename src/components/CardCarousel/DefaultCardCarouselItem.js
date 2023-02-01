import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  SmallSystemText,
  LargeSystemText,
  systemPropTypes,
} from '../../ui-kit';

const Label = (props = {}) => (
  <SmallSystemText
    position="absolute"
    top="0"
    left={props.alignment === 'left' ? 0 : null}
    right={props.alignment === 'right' ? 0 : null}
    bg="text.action"
    color="text.primary"
    py="xxs"
    px="xs"
    borderBottomLeftRadius={props.alignment === 'right' ? 's' : null}
    borderBottomRightRadius={props.alignment === 'left' ? 's' : null}
    fontWeight="bold"
    letterSpacing="1px"
    {...props}
  >
    {props.text}
  </SmallSystemText>
);
Label.propTypes = {
  ...systemPropTypes,
  text: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'right']),
};

function DefaultCardCarouselItem(props = {}) {
  return (
    <Box
      bg="base.primary"
      height="100%"
      justifyContent="flex-end"
      onClick={() => null}
      pt="xl"
      width="100%"
      pressableContainerProps={{
        flex: 1,
        flexBasis: 'content',
      }}
      {...props}
    >
      {props.first ? <Label text="FIRST" alignment="left" /> : null}
      {props.last ? <Label text="LAST" alignment="right" /> : null}
      <SmallSystemText color="text.secondary">
        item.id: {props.item.id}
      </SmallSystemText>
      <LargeSystemText>Item #{props.index + 1}</LargeSystemText>
    </Box>
  );
}

DefaultCardCarouselItem.propTypes = {
  ...systemPropTypes,
  item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  index: PropTypes.number,
  first: PropTypes.bool,
  last: PropTypes.bool,
};

export default DefaultCardCarouselItem;
