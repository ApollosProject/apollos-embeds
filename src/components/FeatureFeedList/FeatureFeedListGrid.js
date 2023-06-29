import React from 'react';

import { useSearchParams } from 'react-router-dom';
import { withTheme } from 'styled-components';

import { getURLFromType } from '../../utils';
import { Box, ContentCard, H3 } from '../../ui-kit';
import {
  add as addBreadcrumb,
  useBreadcrumbDispatch,
} from '../../providers/BreadcrumbProvider';

import {
  open as openModal,
  set as setModal,
  useModal,
} from '../../providers/ModalProvider';

function FeatureFeedListGrid(props = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useModal();
  const dispatchBreadcrumb = useBreadcrumbDispatch();

  const handleActionPress = (item) => {
    if (searchParams.get('id') !== getURLFromType(item.relatedNode)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(item.relatedNode)}`,
          title: item.relatedNode?.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(item.relatedNode)}`);
    }
    if (state.modal) {
      const url = getURLFromType(item.relatedNode);
      dispatch(setModal(url));
      dispatch(openModal());
    }
  };

  return (
    <Box pb="l">
      <Box
        display="grid"
        gridGap="20px"
        gridTemplateColumns={{
          _: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
      >
        {props.data?.features[0]?.cards?.map((item, index) => (
          <ContentCard
            key={index}
            image={item.coverImage}
            title={item.title}
            summary={item.summary}
            onClick={() => handleActionPress(item)}
            videoMedia={item.relatedNode?.videos[0]}
          />
        ))}
      </Box>
    </Box>
  );
}

export default withTheme(FeatureFeedListGrid);
