import { themeGet } from '@styled-system/theme-get';
import { system, utils } from 'shared/ui-kit';
import styled from 'styled-components';

const BirthDateField = styled.div`
  position: relative;

  ${system}
`;

const Input = styled.input`
  background-color: ${themeGet('colors.material.chrome')};
  border-radius: ${themeGet('radii.s')};
  border: none;
  color: ${themeGet('colors.text.secondary')};
  font-size: ${utils.rem('16px')};
  font-weight: 400;
  line-height: ${utils.rem('24px')};
  padding: ${themeGet('space.s')};
  width: 100%;

  &::placeholder {
    color: ${themeGet('colors.text.secondary')};
  }

  &:focus {
    border-color: ${themeGet('colors.text.secondary')};
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    color: transparent;
    background: transparent;
  }

  ${system}
`;

BirthDateField.Input = Input;

export default BirthDateField;
