import React from 'react';

import { systemPropTypes, PhospherIcon } from '../../../ui-kit';
import Styled from './ActionBarFeature.styles';

function ActionBarFeature(props = {}) {
  const handleActionPress = (url) => {
    window.open(props.transformLink(url), '_blank');
  };

  return (
    <Styled.ActionBar class="chip-list-feature">
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
