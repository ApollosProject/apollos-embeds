import React from 'react';

import * as Icon from '@phosphor-icons/react';
import camelCase from 'lodash/camelCase';
import flow from 'lodash/flow';
import upperFirst from 'lodash/upperFirst';

import { systemPropTypes } from '../_lib/system';

const pascalCase = (string) => flow(camelCase, upperFirst)(string);

const PhospherIcon = ({ name, weight, size, color }) => {
  const normalizedName = pascalCase(name);
  const IconToRender = Icon[normalizedName];

  if (!IconToRender) {
    console.warn(`Icon ${name} not found in @phosphor-icons/react`);
    return null;
  }

  return <IconToRender color={color} weight={weight} size={size} />;
};

PhospherIcon.propTypes = {
  ...systemPropTypes,
};

export default PhospherIcon;
