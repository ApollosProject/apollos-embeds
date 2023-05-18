import React from 'react';
import { systemPropTypes, Box } from '../../ui-kit';
import { withTheme } from 'styled-components';
import { SearchProvider } from '../../providers';

import Styled from './Dropdown.styles';
import SearchList from './SearchList';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

const Dropdown = ({
  theme,
  loading,
  fetchMore,
  contentItems,
  searchQuery,
  setShowDropdown,
  ...rest
}) => {
  return (
    <Styled.Wrapper>
      <Styled.Dropdown id="dropdown">
        <div id="panel"></div>
        <SearchList />
      </Styled.Dropdown>
    </Styled.Wrapper>
  );
};

Dropdown.propTypes = {
  ...systemPropTypes,
};
export default withTheme(Dropdown);
