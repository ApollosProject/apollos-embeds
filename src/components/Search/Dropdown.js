import React from 'react';
import { systemPropTypes, Box } from '../../ui-kit';
import { withTheme } from 'styled-components';

import Styled from './Dropdown.styles';

const Dropdown = ({ theme, value, ...rest }) => {
  return (
    <Styled.Wrapper>
      <Styled.Dropdown id="dropdown">
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          First item
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
        <Box
          p="s"
          onClick={() => console.log('clicked!')}
          border="1px solid black"
          width="100%"
        >
          {value}
        </Box>
      </Styled.Dropdown>
    </Styled.Wrapper>
  );
};

Dropdown.propTypes = {
  ...systemPropTypes,
};
export default withTheme(Dropdown);
