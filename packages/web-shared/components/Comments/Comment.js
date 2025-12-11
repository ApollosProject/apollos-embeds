import React from 'react';

import { Box, H5, Avatar } from '../../ui-kit';

// turn line breaks into <br> tags and strip out any other html
function formatText(text) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
}
const Comment = ({ text, person }) => (
  <Box p="xs" borderBottom="1px solid" borderColor="text.quaternary">
    <Box display="flex" flexDirection="row" alignItems="center" gridGap={8} pb="xs">
      <Avatar
        src={person?.photo?.uri}
        firstName={person.firstName}
        lastName={person.lastName}
        width={48}
      />
      <H5>
        {person.firstName} {person.lastName}
      </H5>
    </Box>
    <p>{formatText(text)}</p>
  </Box>
);

export default Comment;
