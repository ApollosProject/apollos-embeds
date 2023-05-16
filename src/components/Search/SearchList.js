import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { withTheme } from 'styled-components';

import { getURLFromType } from '../../utils';

import {
  add as addBreadcrumb,
  useBreadcrumbDispatch,
} from '../../providers/BreadcrumbProvider';
import { set as setModal, useModal } from '../../providers/ModalProvider';
import { Box, ResourceCard } from '../../ui-kit';
import Styled from './Search.styles';

function SearchList(props = {}) {
  const [state, dispatch] = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();

  const emptyStateCopy =
    props?.searchTerm === ''
      ? 'Search for sermons, series, and shows'
      : `There are no matches for "${props?.searchTerm}"`;

  const handleActionPress = (item) => {
    if (searchParams.get('id') !== getURLFromType(item.node)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(item.node)}`,
          title: item.node?.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(item.node)}`);
      props.setShowDropdown(false);
    }
    if (state.modal) {
      const url = getURLFromType(item.node);
      dispatch(setModal(url));
    }
  };

  return (
    <Box mb="l">
      {props?.data?.edges?.length > 0 ? (
        <>
          <Styled.Title mb="xs">Content</Styled.Title>
          <Box as="ul">
            {props.data?.edges?.map((item, index) => (
              <ResourceCard
                key={index}
                leadingAsset={item?.coverImage}
                title={item?.title}
                onClick={() => handleActionPress(item)}
                background="none"
              />
            ))}
          </Box>
        </>
      ) : (
        <p>{emptyStateCopy}</p>
      )}
    </Box>
  );
}

SearchList.propTypes = {
  data: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        }),
      })
    ),
    totalCount: PropTypes.number,
    pageInfo: PropTypes.shape({
      endCursor: PropTypes.string,
    }),
  }),
  loading: PropTypes.bool,
};

export default withTheme(SearchList);
