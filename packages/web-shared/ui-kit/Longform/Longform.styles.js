import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';
import { TypeStyles } from '../Typography';

const Longform = styled.div`
  ${TypeStyles.BodyText};
  max-width: 700px;
  margin-bottom: ${themeGet('space.xl')};

  a {
    color: ${themeGet('colors.text.action')} !important;
    text-decoration: none !important;
  }

  h1 {
    margin-bottom: ${themeGet('space.xl')};
    margin-top: ${themeGet('space.xl')};
  }
  h2 {
    margin-bottom: ${themeGet('space.l')};
    margin-top: ${themeGet('space.l')};
  }
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${themeGet('space.base')};
    margin-top: ${themeGet('space.base')};
  }

  > p:not(:last-child),
  > ul:not(:last-child),
  > ol:not(:last-child) {
    margin-bottom: ${themeGet('space.base')};
  }

  > ul,
  > ol {
    margin-left: ${themeGet('space.base')} !important;

    > li:not(:last-child) {
      margin-bottom: ${themeGet('space.xs')};

      > ul,
      > ol {
        margin-top: ${themeGet('space.base')};
        margin-left: ${themeGet('space.base')};

        > li:not(:last-child) {
          margin-bottom: ${themeGet('space.xs')};
        }
      }
    }
  }
  ${system}
`;

export default Longform;
