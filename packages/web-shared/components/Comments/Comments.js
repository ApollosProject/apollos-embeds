import { useRef, useState } from 'react';
import { Box, H4, Button } from '../../ui-kit';
import { X, ArrowRight, ChatsCircle } from '@phosphor-icons/react';
import { useCurrentUser } from '../../hooks';
import { AuthManager } from '../../components';

import { useAuth } from '../../providers/AuthProvider';
import authSteps from '../Auth/authSteps';

import Comment from './Comment';
import AddComment from './AddComment';

export const SIDEBAR_WITH = 400;

const Comments = ({ visible, parent, comments, onClose }) => {
  const { currentUser } = useCurrentUser();
  const [state] = useAuth();
  const scrollRef = useRef(null);
  const [showAuth, setShowAuth] = useState(false);

  const scrollToBottom = () => {
    requestAnimationFrame(() => scrollRef.current.scrollIntoView(false));
  };

  return (
    <Box
      width={{ md: SIDEBAR_WITH }}
      position="fixed"
      top={58}
      right={0}
      bottom={0}
      left={{ _: 0, md: 'auto' }}
      backgroundColor="fill.paper"
      borderLeftStyle={{ _: 'none', md: 'solid' }}
      borderLeftWidth={{ _: '0', md: '1px' }}
      borderLeftColor="text.quaternary"
      display="flex"
      flexDirection="column"
    >
      <Box
        p="xs"
        borderBottom="1px solid"
        borderColor="text.quaternary"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <H4>Responses</H4>
        <Box cursor="pointer" display="flex" color="text.secondary" onClick={onClose}>
          <X />
        </Box>
      </Box>
      {currentUser ? (
        <>
          <Box style={{ overflowY: 'scroll' }}>
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
            <div ref={scrollRef} style={{ height: 1 }} />
          </Box>
          <AddComment parent={parent} onAdd={scrollToBottom} />
        </>
      ) : (
        <Box
          p="md"
          flexGrow="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box color="base.primary">
            <ChatsCircle size={90} weight="fill" />
          </Box>
          <H4>Join the conversation</H4>
          <Button
            variant="secondary"
            title="Sign up or Login"
            onClick={() => setShowAuth(true)}
            color="base.primary"
            icon={<ArrowRight size={24} />}
            mt="base"
          />
        </Box>
      )}
      {showAuth && state.step !== authSteps.Success ? (
        <AuthManager onClose={() => setShowAuth(false)} />
      ) : null}
    </Box>
  );
};

export default Comments;
