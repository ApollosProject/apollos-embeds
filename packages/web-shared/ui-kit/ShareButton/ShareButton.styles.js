import { themeGet } from '@styled-system/theme-get';
import styled, { withTheme, css } from 'styled-components';

import { system } from '../_lib/system';

const List = withTheme(styled.div`
  width: 100%;
  ${system}
`);

const Option = withTheme(styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  padding: ${themeGet('space.xs')} ${themeGet('space.base')} ${themeGet('space.xs')}
    ${themeGet('space.xs')};
  border-bottom: 1px solid ${themeGet('colors.neutral.gray3')};
  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system}
`);

const BorderlessOption = withTheme(styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  padding: ${themeGet('space.xs')} ${themeGet('space.base')} ${themeGet('space.xs')}
    ${themeGet('space.xs')};
  &:hover {
    color: ${themeGet('colors.base.secondary')};
  }
  ${system}
`);

const Icon = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${system}
`);

const Label = withTheme(styled.div`
  margin-left: ${themeGet('space.xs')};
  min-width: 100px;
  ${system}
`);

const Wrapper = withTheme(styled.div`
  position: absolute;
  background-color: ${themeGet('colors.base.white')};
  border-radius: 4px;
  margin-bottom: 20px;
  top: 113%;
  z-index: 9999;

  ::before {
    content: '';
    position: absolute;
    left: 15px;
    top: -11px;
    border-width: 0 11px 11px 11px;
    border-style: solid;
    border-color: transparent transparent ${themeGet('colors.neutral.gray3')}; transparent;
  }

  ::after {
    content: '';
    position: absolute;
    left: 16px;
    top: -9px;
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent ${themeGet('colors.base.white')} transparent;
  }

  border: 1px solid ${themeGet('colors.neutral.gray3')};
  box-sizing: border-box;
  ${system}
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
