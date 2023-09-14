import React from 'react';

import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box, PhospherIcon } from '../../../ui-kit';
import Styled from './ActionBarFeature.styles';

import { useNavigate } from 'react-router-dom';

function ActionBarFeature(props = {}) {
  const handleActionPress = (item) => {
    window.open(item, '_blank');
  };

  return (
    <Styled.ActionBar>
      {props.feature?.actions?.map((item) => {
        return (
          <Styled.ActionBarItem
            flex="1"
            onClick={() => handleActionPress(item?.relatedNode?.url)}
          >
            <PhospherIcon name={item.icon} size={30} />
            {item?.title}
          </Styled.ActionBarItem>
        );
      })}
    </Styled.ActionBar>
  );
}

ActionBarFeature.propTypes = {
  ...systemPropTypes,
};

export default ActionBarFeature;
