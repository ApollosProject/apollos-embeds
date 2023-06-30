import { gql, useMutation } from '@apollo/client';

export const REQUEST_LOGIN_CODE = gql`
  mutation requestLogin($identity: AuthenticationIdentityInput!) {
    requestLogin(identity: $identity) {
      result
    }
  }
`;

function useRequestLogin(options = {}) {
  return useMutation(REQUEST_LOGIN_CODE, options);
}

export default useRequestLogin;
