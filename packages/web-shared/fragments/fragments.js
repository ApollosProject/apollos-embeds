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

const CONTENT_CARD_FRAGMENT = gql`
  fragment ContentCard on CardListItem {
    id
    title
    labelText
    summary
    coverImage {
      name
      sources {
        uri
      }
    }
    hasAction
    action
    actionIcon
    relatedNode {
      id
      __typename
      ... on ContentItem {
        parentItem {
          title
        }
        title
        videos {
          ...VideoMediaFields
        }
      }
      ... on Url {
        url
      }
    }
  }
`;

const CONTENT_NODE_FRAGMENT = gql`
  fragment ContentNodeFragment on ContentNode {
    title
    htmlContent
    coverImage {
      sources {
        uri
        blurHash
      }
    }
  }
`;

const CONTENT_SINGLE_FRAGMENT = gql`
  fragment ContentSingleFragment on ContentItem {
    title
    htmlContent
    coverImage {
      sources {
        uri
        blurHash
      }
    }
  }
`;

const EVENT_FRAGMENT = gql`
  fragment eventFragment on Event {
    id
    title
    location
    start
    end
    htmlContent
    coverImage {
      id
      sources {
        uri
        blurHash
      }
    }
  }
`;

export {
  VIDEO_MEDIA_FIELDS,
  CONTENT_NODE_FRAGMENT,
  CONTENT_SINGLE_FRAGMENT,
  EVENT_FRAGMENT,
  CONTENT_CARD_FRAGMENT,
};
