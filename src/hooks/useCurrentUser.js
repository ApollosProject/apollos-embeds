import { gql } from '@apollo/client';

import useAuthQuery from './useAuthQuery';

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id

      # // NOTE: Need a graceful way to control whether the rock
      # // authToken is included in the query

      # rock {
      #   authToken
      # }

      profile {
        email
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
`;

function useCurrentUser(options = {}) {
  const query = useAuthQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    ...options,
  });

  return {
    currentUser: query?.data?.currentUser || null,
    ...query,
  };
}

export default useCurrentUser;
