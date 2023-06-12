import { gql, useQuery } from '@apollo/client';
import { VIDEO_MEDIA_FIELDS } from '../fragments';

export const FEED_FEATURES = gql`
  ${VIDEO_MEDIA_FIELDS}

  query featureFeed($itemId: ID!) {
    node(id: $itemId) {
      ... on FeatureFeed {
        features {
          id
          order
          __typename

          ... on ChipListFeature {
            title
            subtitle
          }

          ... on ActionListFeature {
            title
          }

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
                  videos {
                    ...VideoMediaFields
                  }
                }
                ... on Url {
                  url
                }
              }
            }
          }
          ... on VerticalCardListFeature {
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
                  videos {
                    ...VideoMediaFields
                  }
                }
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
`;

function useFeatureFeed(options = {}) {
  const query = useQuery(FEED_FEATURES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    ...options,
  });

  return {
    features: query?.data?.node || {},
    ...query,
  };
}

export default useFeatureFeed;
