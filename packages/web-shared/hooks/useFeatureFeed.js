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
            chips {
              title
              action
              iconName
              id
              relatedNode {
                ... on Url {
                  __typename
                  url
                }
              }
            }
          }

          ... on ActionListFeature {
            title
            subtitle
            actions {
              id
              title
              subtitle
              action
              image {
                sources {
                  uri
                  blurHash
                }
              }
              relatedNode {
                __typename
                id
              }
            }
          }
          ... on HorizontalMediaListFeature {
            id
            title
            items {
              id
              __typename
              title
              coverImage {
                sources {
                  uri
                }
              }
              relatedNode {
                id
                ... on Livestream {
                  __typename
                  title
                  start
                  durationInSeconds
                  stream {
                    id
                    originId
                    originType
                    duration
                    sources {
                      uri
                    }
                  }
                }
              }
            }
          }
          ... on HorizontalCardListFeature {
            title
            subtitle
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
            primaryAction {
              title
              action
              relatedNode {
                id
                __typename
                ... on ContentItem {
                  title
                  videos {
                    ...VideoMediaFields
                  }
                }
              }
            }
          }
          ... on VerticalCardListFeature {
            title
            subtitle
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
          ... on PrayerListFeature {
            id
            title
            subtitle
            isCard
            prayers {
              __typename
              id
              text
              isPrayed
              requestor {
                id
                nickName
                firstName
                lastName
                photo {
                  uri
                  blurHash
                }
              }
            }
          }
          ... on HeroListFeature {
            id
            title
            subtitle
            heroCard {
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
                  title
                  originId
                  originType
                  videos {
                    ...VideoMediaFields
                  }
                }
              }
            }
            # These can be card-like items, not just buttons
            actions {
              id
              title
              subtitle
              action
              relatedNode {
                id
                __typename
                ... on ContentItem {
                  title
                }
              }
              image {
                sources {
                  uri
                }
              }
            }
            primaryAction {
              title
              action
              relatedNode {
                id
                __typename
                ... on ContentItem {
                  title
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

  console.log(query);

  return {
    features: query?.data?.node || {},
    ...query,
  };
}

export default useFeatureFeed;
