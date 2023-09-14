import flow from 'lodash/flow';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import React from 'react';

import { systemPropTypes } from '../_lib/system';

import * as Icon from 'phosphor-react';

const pascalCase = (string) => flow(camelCase, upperFirst)(string);

const PhospherIcon = ({ name, weight, size, color }) => {
  const normalizedName = pascalCase(name);
  console.log(normalizedName);
  const IconToRender = Icon[normalizedName];

  return <IconToRender color={color} weight={weight} size={size} />;
};

PhospherIcon.propTypes = {
  ...systemPropTypes,
};

export default PhospherIcon;
