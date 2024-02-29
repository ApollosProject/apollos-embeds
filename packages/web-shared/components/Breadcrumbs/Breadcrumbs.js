import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import { Box, Button, SystemText } from '../../ui-kit';
import {
  remove as removeBreadcrumb,
  reset as resetBreadcrumb,
  set as setBreadcrumb,
  useBreadcrumb,
} from '../../providers/BreadcrumbProvider';

function Breadcrumbs(props = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useBreadcrumb();
  const prevStateRef = useRef(state);
  const currentState = state[state.length - 1];

  function handleBreadClick({ id, url }) {
    dispatch(removeBreadcrumb(id));
    setSearchParams(`${url}`);
  }

  const pathname = window.location.pathname;
  const dynamicRoute = /^\/[a-z0-9-]+$/i;

  if (state.length === 0) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" mb="base">
      <Button
        variant="link"
        title={
          dynamicRoute.test(pathname)
            ? `${pathname.slice(1).charAt(0).toUpperCase()}${pathname.slice(2)}`
            : 'Home'
        }
        onClick={() => handleBreadClick({ id: -1, url: '' })}
      />

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
          <React.Fragment key={item.id}>
            <Box display="flex" color="text.secondary" mx="xxs">
              <CaretRight />
            </Box>

            <Button
              variant="link"
              title={item.title}
              onClick={() => handleBreadClick({ id: item.id, url: item.url })}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
}

export default Breadcrumbs;
