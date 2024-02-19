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
    const regex = /^([\w\s]+)\s(\d+)(?::(\d+))?(?:-(\d+)?(?::(\d+))?)?$/;
    const match = reference.match(regex);

    if (!match) {
      return null; // Invalid format
    }

    const [_, book, startChapter, startVerse = '', endChapterOrVerse, endVerse = ''] = match;

    let title, verses;
    let isRangeWithinSingleChapter = false;
    let actualEndVerse = endVerse;

    // Determine if it's a range within the same chapter
    if (startChapter === endChapterOrVerse || (startVerse && endChapterOrVerse && !endVerse)) {
      isRangeWithinSingleChapter = true;
      // If endChapterOrVerse is not empty and endVerse is empty, it means endChapterOrVerse is actually the endVerse
      actualEndVerse = endChapterOrVerse && !endVerse ? endChapterOrVerse : endVerse;
    }

    if (isRangeWithinSingleChapter) {
      // Range within the same chapter
      title = `${book} ${startChapter}:${startVerse}-${actualEndVerse}`;
      verses = `Verses ${startChapter}:${startVerse}-${actualEndVerse}`;
    } else if (startVerse && endVerse) {
      // Range spans chapters and verses
      title = `${book} ${startChapter}:${startVerse}-${endChapterOrVerse}:${endVerse}`;
      verses = `Verses ${startChapter}:${startVerse}-${endChapterOrVerse}:${endVerse}`;
    } else if (!startVerse && endChapterOrVerse) {
      // Range spans entire chapters
      title = `${book} ${startChapter}-${endChapterOrVerse}`;
      verses = `Chapters ${startChapter}-${endChapterOrVerse}`;
    } else {
      // Single chapter or verse
      title = `${book} ${startChapter}${startVerse ? ':' + startVerse : ''}`;
      verses = startVerse ? `Verse ${startChapter}:${startVerse}` : `Chapter ${startChapter}`;
    }

    return {
      title,
      verses,
    };
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
