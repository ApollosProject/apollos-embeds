import { useCallback } from 'react';

import { gql, useMutation } from '@apollo/client';
import isObject from 'lodash/isObject';

import { useAuthState } from '../providers/AuthProvider';

export const INTERACT_WITH_NODE = gql`
  mutation interactWithNode(
    $nodeId: ID!
    $action: InteractionAction!
    $data: [InteractionDataField]
  ) {
    interactWithNode(nodeId: $nodeId, action: $action, data: $data) {
      success
      node {
        id
        ... on VideoMedia {
          duration
          userProgress {
            playhead
            complete
          }
        }
      }
    }
  }
`;

function transformVariables(variables) {
  if (!isObject(variables?.data)) {
    return variables;
  }

  // Map the `data` object to an array of key/value pairs,
  // to conform to InteractionDataField schema
  const transformedData = Object.entries(variables?.data).map(([field, value]) => ({
    field,
    value,
  }));

  return {
    ...variables,
    data: transformedData,
  };
}

function useInteractWithNode(options = {}) {
  const { authenticated } = useAuthState();
  const [_mutation, result] = useMutation(INTERACT_WITH_NODE, options);

  /*
  Create a wrapped mutation function that:
    - Enforces authentication
    - Transforms the input variables, so hook consumers don't have to worry
      about conforming to Apollos API schema for [InteractionDataField]
  */
  const mutation = useCallback(
    (mutOpts = { variables: {} }) => {
      if (authenticated) {
        return _mutation({
          ...mutOpts,
          variables: transformVariables(mutOpts.variables),
        });
      }

      return Promise.resolve();
    },
    [_mutation, authenticated]
  );

  return [mutation, result];
}

export default useInteractWithNode;
