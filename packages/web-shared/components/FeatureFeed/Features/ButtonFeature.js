import React from 'react';
import { withTheme } from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { getURLFromType } from '../../../utils';

import { Button, systemPropTypes } from '../../../ui-kit';

function ButtonFeature(props = {}) {
  const navigate = useNavigate();
  // Event Handlers
  const handleActionPress = () => {
    if (props.feature?.action?.relatedNode?.url) {
      window.open(props.feature?.action?.relatedNode?.url, '_blank');
    } else {
      navigate({
        pathname: '/',
        search: `?id=${getURLFromType(props.feature.action.relatedNode)}`,
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
