import { gql, useMutation } from '@apollo/client';
import React, { useState, useRef, useEffect } from 'react';
import { Spinner, PaperPlaneTilt } from '@phosphor-icons/react';
import styled, { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Color from 'color';
import { TypeStyles } from '../../ui-kit/Typography';
import { system } from '../../ui-kit/_lib/system';
import { Avatar, Box, Button, H5 } from '../../ui-kit';
import { useCurrentUser } from '../../hooks';

const ADD_COMMENT = gql`
  mutation addComment($parentId: ID!, $text: String!) {
    addComment(parentId: $parentId, text: $text) {
      id
      isLiked
      text
      person {
        id
        firstName
        lastName
        photo {
          uri
        }
      }
    }
  }
`;

const TextArea = withTheme(styled.textarea`
  ${TypeStyles.BodyText}
  padding: 0;
  padding-right: 8px;
  outline: none;
  flex-grow: 1;
  max-height: 200px;
  transition: all ${themeGet('timing.xl')} ease-out;
  placeholder-text-color: ${({ theme }) => Color(theme.colors.text.secondary).alpha(0)};
  caret-color: ${themeGet('colors.base.primary')};
  border: none;
  resize: none;

  ${system};
`);

const AddComment = ({ parent, onAdd }) => {
  const { currentUser } = useCurrentUser();
  const [comment, setComment] = useState('');
  const textAreaRef = useRef(null);

  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      cache.modify({
        id: cache.identify(parent),
        fields: {
          comments(existingComments = []) {
            const newCommentRef = cache.writeFragment({
              data: addComment,
              fragment: gql`
                fragment NewComment on Comment {
                  id
                  isLiked
                  text
                  person {
                    id
                    firstName
                    lastName
                    photo {
                      uri
                    }
                  }
                }
              `,
            });
            return [...existingComments, newCommentRef];
          },
        },
      });
    },
  });

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    await addComment({ variables: { parentId: parent.id, text: comment } });
    setComment('');
    textAreaRef.current.style.height = 'auto';
    if (onAdd) onAdd(data);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, comment]);

  return (
    <Box p="xs" borderTop="1px solid" borderColor="text.quaternary">
      <Box display="flex" flexDirection="row" alignItems="center" gridGap={8} pb="xs">
        <Avatar
          src={currentUser?.profile?.photo?.uri}
          firstName={currentUser?.profile?.firstName}
          lastName={currentUser?.profile?.lastName}
          width={48}
        />
        <H5>
          {currentUser?.profile.firstName} {currentUser?.profile?.lastName}
        </H5>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <TextArea
          value={comment}
          onChange={handleInputChange}
          placeholder="Add a response"
          ref={textAreaRef}
        />
        <Button
          disabled={!comment}
          onClick={comment ? handleAddComment : undefined}
          icon={loading ? <Spinner /> : <PaperPlaneTilt weight="fill" />}
          padding={6}
        />
      </Box>
    </Box>
  );
};

export default AddComment;
