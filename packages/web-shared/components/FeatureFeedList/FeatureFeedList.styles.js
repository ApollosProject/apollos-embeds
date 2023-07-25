import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Feed = styled.div`
  animation: 0.3s linear ${fade};
`;

const Styled = {
  Feed,
};

export default Styled;
