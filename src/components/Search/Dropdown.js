import React from 'react';
import { systemPropTypes, Box } from '../../ui-kit';
import { withTheme } from 'styled-components';
import { SearchProvider } from '../../providers';

import Styled from './Dropdown.styles';

const Dropdown = ({
  theme,
  loading,
  fetchMore,
  contentItems,
  searchQuery,
  ...rest
}) => {
  return (
    <Styled.Wrapper>
      <Styled.Dropdown id="dropdown">
        <SearchProvider
          Component={SearchList}
          data={searchQuery === '' ? {} : contentItems}
          fetchMore={fetchMore}
          loading={loading}
          searchTerm={searchQuery}
        />
      </Styled.Dropdown>
    </Styled.Wrapper>
  );
};

Dropdown.propTypes = {
  ...systemPropTypes,
};
export default withTheme(Dropdown);
