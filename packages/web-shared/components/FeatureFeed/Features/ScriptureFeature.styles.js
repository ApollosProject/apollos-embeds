import styled, { css, keyframes } from 'styled-components';
import { withTheme } from 'styled-components';
import { system } from '../../../ui-kit/_lib/system';
import { themeGet } from '@styled-system/theme-get';

const expandAnimation = keyframes`
  from {
    max-height: var(--collapsed-max-height, 100px);
  }
  to {
    max-height: var(--expanded-max-height, 1000px);
  }
`;

const collapseAnimation = keyframes`
  from {
    max-height: var(--expanded-max-height, 1000px);
  }
  to {
    max-height: var(--collapsed-max-height, 100px);
  }
`;

const expandedStyles = ({ isExpanded }) => css`
  overflow: hidden;
  max-height: ${isExpanded ? 'var(--expanded-max-height)' : '100px'};
  transition: max-height 0.3s ease;
`;

const Scripture = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  background-color: #67678614;
  padding-right: 16px;
  padding-left: 16px;
  border-radius: 8px;
  position: relative;
  ${expandedStyles}

  ${system}
`);

const ScriptureItem = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${system}
`);

const ScriptureItemHeader = withTheme(styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${system}
`);

const ScriptureItemTitle = withTheme(styled.div`
  font-size: 24px;
  font-weight: 700;
`);

const ScriptureItemVerses = withTheme(styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #27272e99;
`);

const ScriptureItemText = withTheme(styled.div`
  font-family: 'New York Small';
  font-size: 18px;
  line-height: 200%;
  padding-bottom: 16px;

  .p {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 18px;
    line-height: 2;
  }

  .v {
    font-weight: bold;
    margin-right: 4px;
    color: ${themeGet('colors.text.tertiary')};
    font-size: 65%;
  }

  .q1 {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 20px;
  }

  .q2 {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 40px;
  }
`);

const ScriptureItemExpandButton = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 8px;
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 16px;
  opacity: 1;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  &:hover {
    opacity: 0.6;
    background-color: ${themeGet('colors.base.secondary')};
  }
  cursor: pointer;
`);

const Styled = {
  Scripture,
  ScriptureItem,
  ScriptureItemHeader,
  ScriptureItemTitle,
  ScriptureItemVerses,
  ScriptureItemText,
  ScriptureItemExpandButton,
};

export default Styled;
