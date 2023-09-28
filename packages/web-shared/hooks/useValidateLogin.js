import { gql, useMutation } from '@apollo/client';

export const VALIDATE_LOGIN = gql`
  mutation validateLogin(
    $identity: AuthenticationIdentityInput!
    $otp: String!
  ) {
    validateLogin(identity: $identity, otp: $otp) {
      person {
        firstName
        lastName
        email
        campus {
          name
        }
        birthDate
        gender
        id
      }
      accessToken
      refreshToken
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

function useValidateLogin(options = {}) {
  return useMutation(VALIDATE_LOGIN, options);
}

export default useValidateLogin;
