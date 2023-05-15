import { gql, useLazyQuery } from '@apollo/client';

export const SEARCH = gql`
  query search($query: String!, $first: Int, $after: String) {
    search(query: $query, first: $first, after: $after) {
      totalCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        title
        summary
        coverImage {
          name
          sources {
            uri
          }
        }
        cursor
        node {
          ... on ContentItem {
            id
            __typename
          }
        }
      }
    }
  }
`;

function useSearchQuery(options = {}) {
  const [search, query] = useLazyQuery(SEARCH, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    ...options,
  });

  return [
    search,
    {
      contentItems: query?.data?.search || {},
      ...query,
    },
  ];
}

export default useSearchQuery;
