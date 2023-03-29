import { gql, useQuery } from '@apollo/client';
import { VIDEO_MEDIA_FIELDS } from '../fragments';

export const GET_CONTENT_ITEM = gql`
  ${VIDEO_MEDIA_FIELDS}

  query getContentItem($id: ID!) {
    node(id: $id) {
      id
      __typename

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
        publishDate
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
