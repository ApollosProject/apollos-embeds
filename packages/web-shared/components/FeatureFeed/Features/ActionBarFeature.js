import React from 'react';

import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box } from '../../../ui-kit';
import Styled from './ActionBarFeature.styles';
import { ArrowUpRight } from 'phosphor-react';

import { useNavigate } from 'react-router-dom';

function ActionBarFeature(props = {}) {
  console.log(props);
  return (
    <Box width="100%" display="flex">
      {props.feature?.actions?.map((item, index) => (
        <Box flex="1">hi</Box>
      ))}
    </Box>
  );
}

ActionBarFeature.propTypes = {
  ...systemPropTypes,
};

export default ActionBarFeature;
