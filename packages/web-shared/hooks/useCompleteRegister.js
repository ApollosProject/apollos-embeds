import { gql, useMutation } from '@apollo/client';

export const COMPLETE_REGISTER = gql`
  mutation completeRegistration($mergeProfileId: ID, $profileInput: [UpdateProfileInput]) {
    completeRegistration(mergeProfileId: $mergeProfileId, profileInput: $profileInput) {
      id
      birthDate
      gender
      firstName
      lastName
    }
  }
`;

function useCompleteRegister(options = {}) {
  return useMutation(COMPLETE_REGISTER, options);
}

export default useCompleteRegister;
