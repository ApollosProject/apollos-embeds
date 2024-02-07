import { gql, useQuery } from '@apollo/client';
import {
  VIDEO_MEDIA_FIELDS,
  CONTENT_NODE_FRAGMENT,
  CONTENT_SINGLE_FRAGMENT,
  EVENT_FRAGMENT,
} from '../fragments';

export const GET_CONTENT_ITEM = gql`
  ${VIDEO_MEDIA_FIELDS}
  ${CONTENT_NODE_FRAGMENT}
  ${CONTENT_SINGLE_FRAGMENT}
  ${EVENT_FRAGMENT}

  fragment SubCardFragment on ContentItem {
    id
    title
    summary
    coverImage {
      sources {
        uri
      }
    }
    parentItem {
      title
    }
    videos {
      ...VideoMediaFields
    }
  }

  query getContentItem($id: ID!) {
    node(id: $id) {
      id
      __typename

      ...ContentNodeFragment
      ...ContentSingleFragment
      ... on Event {
        ...eventFragment
      }
      ... on MediaContentItem {
        originId
      }
      ... on Livestream {
        __typename
        title
        start
        durationInSeconds
        stream {
          id
          sources {
            uri
          }
        }
      }
      ... on ContentItem {
        title
        originId
        htmlContent
        summary
        coverImage {
          sources {
            uri
          }
        }
        parentChannel {
          id
          name
        }
        videos {
          ...VideoMediaFields
        }
        parentItem {
          ...SubCardFragment
        }
        childContentItemsConnection {
          edges {
            node {
              ...SubCardFragment
            }
          }
        }
        siblingContentItemsConnection {
          edges {
            node {
              ...SubCardFragment
            }
          }
        }
        ... on FeaturesNode {
          featureFeed {
            id
          }
        }
      }
    }
  }
`;

function useContentItem(options = {}) {
  const query = useQuery(GET_CONTENT_ITEM, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    ...options,
  });

  return {
    item: query?.data?.node,
    ...query,
  };
}

export default useContentItem;
