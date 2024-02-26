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
      ... on FeaturesNode {
        featureFeed {
          id
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
  console.log(query, 'query', GET_CONTENT_ITEM.loc.source);

  return {
    item: query?.data?.node,
    ...query,
  };
}

export default useContentItem;
