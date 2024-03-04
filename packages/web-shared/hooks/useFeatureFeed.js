import { gql, useQuery } from '@apollo/client';
import { VIDEO_MEDIA_FIELDS, CONTENT_CARD_FRAGMENT } from '../fragments';

export const FEED_FEATURES = gql`
  ${VIDEO_MEDIA_FIELDS}
  ${CONTENT_CARD_FRAGMENT}

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

          ... on ActionBarFeature {
            title
            actions {
              id
              icon
              title
              action
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

          ... on EventBlockFeature {
            id
            start
            duration
            allDay
            location
            title
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
                ... on Livestream {
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
              ...ContentCard
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
              ...ContentCard
            }
          }
          ... on PrayerListFeature {
            id
            title
            subtitle
            order
            isCard
            prayers {
              __typename
              id
              text
              isPrayed
              isAnonymous
              requestor {
                firstName
                lastName
                gender
                birthDate
                photo {
                  uri
                }
              }
            }
          }
          ... on HeroListFeature {
            id
            title
            subtitle
            heroCard {
              ...ContentCard
              relatedNode {
                ... on ContentItem {
                  originId
                  originType
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
          ... on HtmlFeature {
            content
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
