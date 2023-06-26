import { gql, useMutation } from '@apollo/client';

export const VALIDATE_LOGIN = gql`
  mutation validateLogin(
    $identity: AuthenticationIdentityInput!
    $otp: String!
  ) {
    validateLogin(identity: $identity, otp: $otp) {
      person {
        firstName
        birthDate
        gender
        id
      }
      accessToken
      refreshToken
    }
  }
`;

function useValidateLogin(options = {}) {
  return useMutation(VALIDATE_LOGIN, options);
}

export default useValidateLogin;
