import React, { useEffect, useRef, useState } from 'react';
import { systemPropTypes, Box } from '../../../ui-kit';
import PropTypes from 'prop-types';
import Styled from './ScriptureFeature.styles';
import { ArrowsInSimple, ArrowsOutSimple } from 'phosphor-react';

function ScriptureFeature(props = {}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const scriptures = props?.feature?.scriptures;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function parseBibleReference(reference) {
    const regex = /^([\w\s]+)\s(\d+):(\d+)-?(\d+)?$/;
    const match = reference.match(regex);

    if (!match) {
      return null; // Invalid format
    }

    const [_, book, chapter, startVerse, endVerse] = match;
    const title = `${book} ${chapter}`;
    const verses = `${endVerse ? `Verses ${startVerse}-${endVerse}` : `Verse ${startVerse}`}`;

    const result = {
      title,
      verses,
    };

    return result;
  }

  const ScriptureItem = ({ scripture }) => {
    const html = scripture.html;
    const reference = parseBibleReference(scripture.reference);
    return (
      <Styled.ScriptureItem>
        <Styled.ScriptureItemHeader>
          <Styled.ScriptureItemTitle>{reference.title}</Styled.ScriptureItemTitle>
          <Styled.ScriptureItemVerses>{reference.verses}</Styled.ScriptureItemVerses>
        </Styled.ScriptureItemHeader>

        <Styled.ScriptureItemText dangerouslySetInnerHTML={{ __html: html }} />
      </Styled.ScriptureItem>
    );
  };

  return (
    <Styled.Scripture
      isExpanded={isExpanded}
      style={{ '--expanded-max-height': `${contentHeight}px` }}
      ref={contentRef}
    >
      {scriptures.map((scripture) => (
        <ScriptureItem scripture={scripture} />
      ))}
      <Styled.ScriptureItemExpandButton onClick={handleExpand}>
        {isExpanded ? <ArrowsInSimple size={20} /> : <ArrowsOutSimple size={20} />}
      </Styled.ScriptureItemExpandButton>
    </Styled.Scripture>
  );
}

ScriptureFeature.propTypes = {
  ...systemPropTypes,
  isExpanded: PropTypes.bool,
};

export default ScriptureFeature;
