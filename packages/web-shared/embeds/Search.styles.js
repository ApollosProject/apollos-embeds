import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const Search = styled(CSSTransition)`
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.fade-enter-done {
    opacity: 1;
  }
`;

const Styled = {
  Search,
};

export default Styled;
