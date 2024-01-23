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
        childContentItemsConnection {
          edges {
            node {
              id
              title
              summary
              coverImage {
                sources {
                  uri
                }
              }
              videos {
                ...VideoMediaFields
              }
            }
          }
        }
        siblingContentItemsConnection {
          edges {
            node {
              id
              title
              summary
              coverImage {
                sources {
                  uri
                }
              }
              videos {
                ...VideoMediaFields
              }
            }
          }
        }
        ... on FeaturesNode {
          featureFeed {
            id
            features {
              id
              ... on HorizontalCardListFeature {
                title
                cards {
                  id
                  title
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
                      title
                    }
                    ... on Url {
                      url
                    }
                  }
                }
              }
              ... on ButtonFeature {
                action {
                  title
                  action
                  relatedNode {
                    id
                    __typename
                    ... on Url {
                      url
                    }
                  }
                }
              }
              ... on ScriptureFeature {
                scriptures {
                  id
                  html
                  reference
                  copyright
                  version
                  text
                }
              }
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

  return {
    item: query?.data?.node,
    ...query,
  };
}

export default useContentItem;
