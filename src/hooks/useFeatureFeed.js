import { gql, useQuery } from '@apollo/client';

export const FEED_FEATURES = gql`
  query featureFeed($itemId: ID!) {
    node(id: $itemId) {
      ... on FeatureFeed {
        features {
          id
          order
          __typename

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
          ... on VerticalCardListFeature {
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
        }
      }
    }
  }
`;

function useFeatureFeed(options = {}) {
  const query = useQuery(FEED_FEATURES, {
    fetchPolicy: 'cache-and-network',
    ...options,
  });
  console.log('query', query);

  return {
    features: query?.data?.node || {},
    ...query,
  };
}

export default useFeatureFeed;
