import React from 'react';
import { systemPropTypes } from '../../ui-kit';
import { withTheme } from 'styled-components';

import Styled from './Dropdown.styles';

const Dropdown = ({ theme, ...rest }) => {
  return (
    <>
      <Styled.Wrapper>
        <Styled.Dropdown>
          <p mt="xxs">Put Search Results and Search Feature Feed Here</p>
        </Styled.Dropdown>
      </Styled.Wrapper>
    </>
  );
};

Dropdown.propTypes = {
  ...systemPropTypes,
};
export default withTheme(Dropdown);
