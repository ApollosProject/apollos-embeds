import { gql, useMutation } from '@apollo/client';

export const REQUEST_REGISTER = gql`
  mutation requestRegister($identity: AuthenticationIdentityInput!) {
    requestRegister(identity: $identity) {
      result
    }
  }
`;

function useRequestRegister(options = {}) {
  return useMutation(REQUEST_REGISTER, options);
}

export default useRequestRegister;
