import styled, { css } from 'styled-components';
import { withTheme } from 'styled-components';
import { system } from '../../../ui-kit/_lib/system';

const expandedStyles = ({ isExpanded }) => {
  if (isExpanded) {
    return css`
      padding-bottom: 16px;
    `;
  } else {
    return css`
      max-height: 365px;
      overflow: hidden;
    `;
  }
};

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
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.6;
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
