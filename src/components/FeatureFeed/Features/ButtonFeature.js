import React from "react";
import { withTheme } from "styled-components";

import { useNavigate } from "react-router-dom";
import { getURLFromType } from "../../../utils";

import { Button, systemPropTypes } from "../../../ui-kit";

function ButtonFeature(props = {}) {
  const navigate = useNavigate();

  // Event Handlers
  const handleActionPress = () => {
    navigate({
      pathname: "/",
      search: `?id=${getURLFromType(props.relatedNode)}`,
    });
  };

  return (
    <Button
      title={props.title}
      type="primary"
      icon={props.icon}
      cursor={props.relatedNode ? "pointer" : "default"}
      onClick={props.relatedNode && handleActionPress}
      width="100%"
    />
  );
}

ButtonFeature.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ButtonFeature);
