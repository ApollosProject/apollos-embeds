import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import ReactPlayer from 'react-player';

import { systemPropTypes } from '../../ui-kit';
import Styled from './VideoPlayer.styles';

function VideoPlayer(props = {}) {
  if (props.videos?.embedHtml) {
    const sanitizedHTML = DOMPurify.sanitize(props.videos?.embedHtml, {
      ALLOWED_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    });

    return (
      <Styled {...props} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
  } else if (props.videos.sources[0].uri) {
    return (
      <ReactPlayer
        url={props.videos.sources[0].uri}
        controls
        light={<img src={props.coverImage} alt="Thumbnail" />}
        width="100%"
        height="auto"
      />
    );
  }

  return null;
}

VideoPlayer.propTypes = {
  dangerouslySetInnerHTML: PropTypes.string,
  ...systemPropTypes,
};

export default VideoPlayer;
