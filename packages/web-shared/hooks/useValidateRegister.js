import { gql, useMutation } from '@apollo/client';

export const VALIDATE_REGISTER = gql`
  mutation validateRegister(
    $identity: AuthenticationIdentityInput!
    $otp: String!
  ) {
    validateRegister(identity: $identity, otp: $otp) {
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

function useValidateRegister(options = {}) {
  return useMutation(VALIDATE_REGISTER, options);
}

export default useValidateRegister;
