import { gql } from '@apollo/client';

import useAuthQuery from './useAuthQuery';

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      profile {
        id
        email
        firstName
        lastName
        gender
        birthDate
        photo {
          uri
        }
      }
      rock {
        authToken
      }
    }
  }
`;

function useCurrentUser(options = {}) {
  const query = useAuthQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    ...options,
  });

  return {
    currentUser: query?.data?.currentUser || null,
    ...query,
  };
}

export default useCurrentUser;
