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
    // This regex handles cases like 'Genesis 1-3' and 'Genesis 1:1-3:24'
    const regex = /^([\w\s]+)\s(\d+)(?::(\d+))?(?:-(\d+)(?::(\d+))?)?$/;
    const match = reference.match(regex);

    if (!match) {
      return null; // Invalid format
    }

    const [_, book, startChapter, startVerse, endChapter, endVerse] = match;
    let title, verses;

    if (endChapter || endVerse) {
      // Case for a range
      if (endChapter && !endVerse) {
        // Range of chapters, e.g., 'Genesis 1-3'
        title = `${book} ${startChapter}-${endChapter}`;
        verses = `Chapters ${startChapter}-${endChapter}`;
      } else if (startChapter !== endChapter) {
        // Range of chapters and verses, e.g., 'Genesis 1:1-3:24'
        title = `${book} ${startChapter}:${startVerse}-${endChapter}:${endVerse}`;
        verses = `Verses ${startChapter}:${startVerse}-${endChapter}:${endVerse}`;
      } else {
        // Range within a single chapter, e.g., 'Genesis 1:1-24'
        title = `${book} ${startChapter}:${startVerse}-${endVerse}`;
        verses = `Verses ${startChapter}:${startVerse}-${endVerse}`;
      }
    } else {
      // Single chapter and verse, e.g., 'Genesis 1:1'
      title = `${book} ${startChapter}${startVerse ? `:${startVerse}` : ''}`;
      verses = startVerse ? `Verse ${startChapter}:${startVerse}` : `Chapter ${startChapter}`;
    }

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
