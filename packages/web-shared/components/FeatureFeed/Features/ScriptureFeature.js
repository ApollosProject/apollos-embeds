import React, { useState } from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box } from '../../../ui-kit';
import PropTypes from 'prop-types';
import Styled from './ScriptureFeature.styles';
import { useNavigate } from 'react-router-dom';
import { ArrowsOutSimple } from 'phosphor-react';

function ScriptureFeature(props = {}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scriptures = props?.feature?.scriptures;
  //   console.log(scriptures);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const ScriptureItem = ({ scripture }) => {
    const text = scripture.text;
    console.log(text);
    return (
      <Styled.ScriptureItem>
        <Styled.ScriptureItemHeader>
          <Styled.ScriptureItemTitle>Acts 20</Styled.ScriptureItemTitle>
          <Styled.ScriptureItemVerses>Verses 1-24</Styled.ScriptureItemVerses>
        </Styled.ScriptureItemHeader>

        <Styled.ScriptureItemText>{text}</Styled.ScriptureItemText>
      </Styled.ScriptureItem>
    );
  };

  return (
    <Styled.Scripture isExpanded={isExpanded}>
      {scriptures.map((scripture) => (
        <ScriptureItem scripture={scripture} />
      ))}
      <Styled.ScriptureItemExpandButton onClick={handleExpand}>
        <ArrowsOutSimple size={16} />
      </Styled.ScriptureItemExpandButton>
    </Styled.Scripture>
  );
}

ScriptureFeature.propTypes = {
  ...systemPropTypes,
  isExpanded: PropTypes.bool,
};

export default ScriptureFeature;
