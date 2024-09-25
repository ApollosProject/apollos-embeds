import { createUploadLink } from 'apollo-upload-client';
import { split, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

export const uri =
  process.env.NEXT_PUBLIC_DATA_URL || process.env.REACT_APP_DATA_URL || 'https://cdn.apollos.app';

export default split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'mutation';
  },
  createUploadLink({ uri }),
  createHttpLink({
    uri,
  })
);
