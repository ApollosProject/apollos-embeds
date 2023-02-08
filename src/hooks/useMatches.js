import { useQuery, gql } from '@apollo/client';

export const GET_USERS = gql`
  query currentUserMatches {
    currentUser {
      id
      sharedProfiles {
        id
        firstName
        lastName
        birthDate
        photo {
          uri
        }
      }
    }
  }
`;

export default function useMatches() {
  const query = useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    ...query,
    data: query.data,
    users: query?.data?.currentUser?.sharedProfiles,
  };
}
