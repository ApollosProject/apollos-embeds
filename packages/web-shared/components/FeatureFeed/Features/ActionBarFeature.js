import React from 'react';

import Styled from './ActionBarFeature.styles';
import { systemPropTypes, PhospherIcon } from '../../../ui-kit';

function ActionBarFeature(props = {}) {
  const handleActionPress = (url) => {
    window.open(props.transformLink(url), '_blank');
  };

  return (
    <Styled.ActionBar>
      {props.feature?.actions?.map((item) => {
        return (
          <Styled.ActionBarItem flex="1" onClick={() => handleActionPress(item?.relatedNode?.url)}>
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
