import { gql, useQuery } from '@apollo/client';

export const GET_VIDEO_MEDIA_PROGRESS = gql`
  query getVideoMediaProgress($id: ID!) {
    node(id: $id) {
      id
      ... on VideoMedia {
        userProgress {
          playhead
          complete
        }
      }
    }
  }
`;

function useVideoMediaProgress(options = {}) {
  const query = useQuery(GET_VIDEO_MEDIA_PROGRESS, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    ...options,
  });

  return {
    userProgress: query?.data?.node?.userProgress || {
      playhead: 0,
      complete: false,
    },
    ...query,
  };
}

export default useVideoMediaProgress;
