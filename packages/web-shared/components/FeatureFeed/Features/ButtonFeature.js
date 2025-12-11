import React from 'react';

import { withTheme } from 'styled-components';

import { useNavigation } from '../../../providers/NavigationProvider';
import { Button, systemPropTypes } from '../../../ui-kit';
import { getURLFromType } from '../../../utils';

function ButtonFeature(props = {}) {
  const { navigate } = useNavigation();
  const relatedNode = props.feature?.action?.relatedNode;

  // Event Handlers
  const handleActionPress = () => {
    if (relatedNode?.url) {
      window.open(props.transformLink(relatedNode.url), '_blank');
    } else if (relatedNode) {
      navigate({
        id: getURLFromType(relatedNode),
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
