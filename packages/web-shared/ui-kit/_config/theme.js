import { rem } from '../_utils';
import colors from './colors';

const theme = {
  breakpoints: {
    // Pixel values defining the maximum device width for each breakpoint
    sm: rem('428px'), // Accommodates ~iPhone 12 Max
    md: rem('768px'),
    lg: rem('1280px'),
    xl: rem('1440px'),
    xxl: rem('2048px'),
  },
  colors,
  fonts: {
    heading: 'Inter',
  },
  radii: {
    xs: rem('2px'),
    s: rem('4px'),
    base: rem('6px'),
    l: rem('10px'),
    xl: rem('16px'),
    xxl: rem('30px'),
    round: rem('999px'),
  },
  shadows: {
    low: '0px 3px 6px rgba(0, 0, 0, 0.25);',
    medium: '0px 20px 48px rgba(0, 0, 0, 0.09);',
    mediumBottom: '0px 60px 48px rgba(0, 0, 0, 0.09);',
    high: '0px 16px 38px rgba(0, 0, 0, 0.22);',
  },
  space: {
    xxxs: rem('4px'),
    xxs: rem('6px'),
    xs: rem('14px'),
    s: rem('18px'),
    base: rem('24px'),
    l: rem('36px'),
    xl: rem('48px'),
    xxl: rem('66px'),
    xxxl: rem('108px'),
  },
  timing: {
    base: '0.132s',
    l: '0.2s',
    xl: '0.3s',
  },
};

export default theme;
