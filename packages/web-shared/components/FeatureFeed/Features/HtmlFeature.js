import React from 'react';
import { withTheme } from 'styled-components';

import { Longform, systemPropTypes } from '../../../ui-kit';
import { useHTMLContent } from '../../../hooks';

function HtmlFeature(props = {}) {
  const parseHTMLContent = useHTMLContent();

  return (
    <Longform
      dangerouslySetInnerHTML={{
        __html: parseHTMLContent(props?.feature?.content),
      }}
    />
  );
}

HtmlFeature.propTypes = {
  ...systemPropTypes,
};

export default withTheme(HtmlFeature);
