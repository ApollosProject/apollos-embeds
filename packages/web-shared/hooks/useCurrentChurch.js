import { gql, useQuery } from '@apollo/client';

export const GET_CURRENT_CHURCH = gql`
  query {
    currentChurch {
      mobileAppStoreUrl
      mobilePlayStoreUrl
      webAmplitudeKey
      webSegmentKey
      name
      slug
      theme
      logo
    }
  }
`;

function useCurrentChurch(options = {}) {
  const query = useQuery(GET_CURRENT_CHURCH, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    ...options,
  });

  return {
    currentChurch: query?.data?.currentChurch,
    ...query,
  };
}

export default useCurrentChurch;
