import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { withTheme } from 'styled-components';

import { getURLFromType } from '../../utils';
import StyledList from './SearchList.styles';
import {
  add as addBreadcrumb,
  useBreadcrumbDispatch,
} from '../../providers/BreadcrumbProvider';
import { set as setModal, useModal } from '../../providers/ModalProvider';
import { Box, ResourceCard } from '../../ui-kit';
import Styled from './Search.styles';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';
function SearchList(props = {}) {
  const [state, dispatch] = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();

  const emptyStateCopy =
    props?.searchTerm === ''
      ? 'Search for sermons, series, and shows'
      : `There are no matches for "${props?.searchTerm}"`;

  const handleActionPress = (item) => {
    if (searchParams.get('id') !== getURLFromType(item)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(item)}`,
          title: item?.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(item)}`);
      props.setShowDropdown(false);
    }
    if (state.modal) {
      const url = getURLFromType(item);
      dispatch(setModal(url));
    }
  };

  function Hit({ hit }) {
    return (
      <ResourceCard
        leadingAsset={hit?.coverImage}
        title={hit?.title}
        onClick={() => handleActionPress(hit)}
        background="none"
      />
    );
  }

  return (
    <Box mb="l">
      <>
        <Styled.Title mb="xs">Content</Styled.Title>
        <StyledList.List>
          <Hits hitComponent={Hit} />
        </StyledList.List>
      </>
      <p>{emptyStateCopy}</p>
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
