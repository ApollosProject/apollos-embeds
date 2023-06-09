import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../../../ui-kit/Typography';

const Chip = withTheme(styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: rgba(103, 103, 134, 0.08);
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 10px;
  white-space: nowrap;
`);

const List = withTheme(styled.ul`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  width: 100%;
  gap: 8px;

  scrollbar-width: thin; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0); /* Adjust the color as needed */
  }
`);

const Styled = {
  Chip,
  List,
};

export default Styled;
