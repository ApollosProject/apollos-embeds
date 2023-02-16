import { gql, useMutation } from '@apollo/client';

export const UPDATE_PROFILE_FIELDS = gql`
  mutation updateProfileFields($input: [UpdateProfileInput]!) {
    updateProfileFields(input: $input) {
      firstName
      lastName
      birthDate
      gender
    }
  }
`;

function useUpdateProfileFields(options = {}) {
  return useMutation(UPDATE_PROFILE_FIELDS, options);
}

export default useUpdateProfileFields;
