import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, ResourceCard, Box } from '../../../ui-kit';
import Styled from './ActionListFeature.styles';
import { useNavigate } from 'react-router-dom';

function ScriptureFeature(props = {}) {
  console.log(props);

  return <Box></Box>;
}

ScriptureFeature.propTypes = {
  ...systemPropTypes,
};

export default ScriptureFeature;
