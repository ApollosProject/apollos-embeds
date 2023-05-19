import { gql, useMutation } from '@apollo/client';

export const UPLOAD_PROFILE_IMAGE = gql`
  mutation uploadProfileImage($file: Upload!, $size: Int!) {
    uploadProfileImage(file: $file, size: $size) {
      id
      photo {
        uri
      }
    }
  }
`;

function useUploadProfileImage(options = {}) {
  return useMutation(UPLOAD_PROFILE_IMAGE, options);
}

export default useUploadProfileImage;
