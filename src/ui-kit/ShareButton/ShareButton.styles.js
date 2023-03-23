import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';

const List = withTheme(styled.div`
  width: 100%;
`);

const Option = withTheme(styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  padding: 10px 30px 10px 10px;
  border-bottom: 1px solid ${themeGet('colors.neutral.gray3')};
  &:hover {
    color: ${themeGet('colors.base.secondary')};
  }
`);

const BorderlessOption = withTheme(styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  padding: 10px 30px 10px 10px;
  &:hover {
    color: ${themeGet('colors.base.secondary')};
  }
`);

const Icon = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`);

const Label = withTheme(styled.div`
  margin-left: 10px;
  min-width: 100px;
`);

const Wrapper = withTheme(styled.div`
  position: absolute;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 20px;
  top: 113%;

  ::before {
    content: '';
    position: absolute;
    left: 15px;
    top: -11px;
    border-width: 0 11px 11px 11px;
    border-style: solid;
    border-color: transparent transparent ${themeGet(
      'colors.neutral.gray3'
    )}; transparent;
  }

  ::after {
    content: '';
    position: absolute;
    left: 16px;
    top: -9px;
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  }

  border: 1px solid ${themeGet('colors.neutral.gray3')};
  box-sizing: border-box;
`);

const Styled = {
  Option,
  BorderlessOption,
  List,
  Label,
  Icon,
  Wrapper,
};

export default Styled;
