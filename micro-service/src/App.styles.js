import { themeGet } from '@styled-system/theme-get';
import { H1, TypeStyles, withTheme, styled } from '@apollosproject/web-shared/ui-kit';

import { system } from '@apollosproject/web-shared/ui-kit/_lib/system';

const Main = withTheme(styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${themeGet('space.l')};
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    margin-top: ${themeGet('space.xs')};
  }
  ${system};
`);

const Content = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;
  margin-right: ${themeGet('space.xxl')};
  margin-bottom: ${themeGet('space.xl')};
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    align-self: center;
    text-align: center;
    margin-right: 0;
  }

  ${system};
`);

const FeedWrapper = withTheme(styled.div`
  max-width: 1180px;
  padding: 40px;
  margin: auto;
  margin-top: 20px;

  ${system};
`);

const Title = withTheme(styled(H1)`
  @media screen and (max-width: ${themeGet('breakpoints.md')}) {
    ${TypeStyles.H2}
  }
  ${system};
`);

const Styled = {
  Main,
  Content,
  FeedWrapper,
  Title,
};

export default Styled;
