import { gql } from '@apollo/client';

const VIDEO_MEDIA_FIELDS = gql`
  fragment VideoMediaFields on VideoMedia {
    __typename
    id
    key
    name
    sources {
      uri
    }
    duration
    userProgress {
      playhead
      complete
    }
    embedHtml
  }
`;

export { VIDEO_MEDIA_FIELDS };
