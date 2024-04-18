import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getURLFromType } from '../utils';
import { ContentCard, Box, H3, systemPropTypes, Button } from '../ui-kit';
import { useNavigation } from '../providers/NavigationProvider';

const PAGE_SIZE = 20;

function ContentChannel(props = {}) {
  const { navigate } = useNavigation();

  const hasMorePages = props.data?.totalCount > props.data?.edges?.length;

  const handleActionPress = (item) => {
    navigate({
      id: getURLFromType(item.relatedNode),
    });
  };

  const handleLoadMore = () => {
    props.fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: props.data?.pageInfo?.endCursor,
      },
    });
  };

  return (
    <Box
      pb="l"
      display="flex"
      flexDirection="column"
      alignItems="center"
      {...props}
      className="content-channel"
    >
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="70px 20px">
        {props.data?.edges?.map((item, index) => {
          return (
            <ContentCard
              key={item.index}
              image={item.node.coverImage}
              title={item.node.title}
              summary={item.node.summary}
              onClick={() => handleActionPress(item)}
              videoMedia={item.relatedNode?.videos?.[0]}
            />
          );
        })}
      </Box>
      {hasMorePages ? (
        <Button mt="l" justifySelf="center" title="Load More" onClick={handleLoadMore} />
      ) : null}
    </Box>
  );
}

ContentChannel.propTypes = {
  ...systemPropTypes,
};

export default ContentChannel;
