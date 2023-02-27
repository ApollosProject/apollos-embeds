import { createUploadLink } from 'apollo-upload-client';
import { split, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = (
  process.env.REACT_APP_APP_DATA_URL || 'https://cdn.apollos.app'
).replace('localhost');

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
