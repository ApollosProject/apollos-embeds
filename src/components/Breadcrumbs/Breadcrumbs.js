import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CaretRight } from 'phosphor-react';
import { Box, Button, SystemText } from '../../ui-kit';
import {
  remove as removeBreadcrumb,
  useBreadcrumb,
} from '../../providers/BreadcrumbProvider';

function Breadcrumbs(props = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useBreadcrumb();
  // const [viewWidth, setViewWidth] = React.useState(0);
  // const boxWidth = viewWidth * 0.25 - 66;

  function handleBreadClick({ id, url }) {
    dispatch(removeBreadcrumb(id));
    setSearchParams(`${url}`);
  }
  return (
    <Box display="flex" alignItems="center" mb="xs">
      {state.length > 0 ? (
        <Button
          type="link"
          title={`Featured`}
          onClick={() => handleBreadClick({ id: -1, url: '' })}
        />
      ) : null}

      {state.map(function (item) {
        if (state.length === item.id + 1) {
          return (
            <Box key={item.id} display="flex" alignItems="center">
              <Box display="flex" color="text.secondary" mx="xxs">
                <CaretRight />
              </Box>
              <SystemText as="span" color="text.secondary">
                {item.title}
              </SystemText>
            </Box>
          );
        }
        return (
          <>
            <Box display="flex" color="text.secondary" mx="xxs">
              <CaretRight />
            </Box>

            <Button
              type="link"
              title={item.title}
              onClick={() => handleBreadClick({ id: item.id, url: item.url })}
            />
          </>
        );
      })}
    </Box>
  );
}

export default Breadcrumbs;
