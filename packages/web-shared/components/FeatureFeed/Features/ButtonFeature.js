import React from 'react';
import { withTheme } from 'styled-components';

import { getURLFromType } from '../../../utils';

import { Button, systemPropTypes } from '../../../ui-kit';
import { useNavigation } from '../../../providers/NavigationProvider';

function ButtonFeature(props = {}) {
  const { navigate } = useNavigation();
  // Event Handlers
  const handleActionPress = () => {
    if (props.feature?.action?.relatedNode?.url) {
      window.open(props.transformLink(props.feature?.action?.relatedNode?.url), '_blank');
    } else {
      navigate({
        id: getURLFromType(item.relatedNode),
        ,
      });
    }
  };

  return (
    <Button
      title={props.title || props.feature?.action?.title}
      icon={props.icon}
      cursor={props.feature.action.relatedNode ? 'pointer' : 'default'}
      onClick={props.feature.action.relatedNode && handleActionPress}
      width="100%"
    />
  );
}

ButtonFeature.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ButtonFeature);
