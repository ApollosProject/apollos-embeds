import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CaretRight } from 'phosphor-react';
import { Box, Button, SystemText } from '../../ui-kit';
import {
  remove as removeBreadcrumb,
  add as addBreadcrumb,
  reset as resetBreadcrumb,
  set as setBreadcrumb,
  useBreadcrumb,
} from '../../providers/BreadcrumbProvider';

function Breadcrumbs(props = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useBreadcrumb();
  const prevStateRef = useRef(state);
  const currentState = state[state.length - 1];

  useEffect(() => {
    console.log('prevStateRef useEffect', prevStateRef.current);
    console.log('state useEffect', state);
    const handleHistoryChange = () => {
      // console.log('prevStateRef popstate', prevStateRef.current);
      // console.log('state popstate', state);
      if (currentState) {
        // prevStateRef.current = prevStateRef.current.pop();
        dispatch(setBreadcrumb(prevStateRef.current.slice(0, -1)));
      }
      // if (prevStateRef.current === state) {
      //   console.log('FORWARD');
      // }
    };
    console.log('prevStateRef Before update:', prevStateRef.current);
    prevStateRef.current = state;
    console.log('prevStateRef After update:', prevStateRef.current);

    window.addEventListener('popstate', handleHistoryChange);
    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
    };
  }, [currentState, dispatch, state]);

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
          <React.Fragment key={item.id}>
            <Box display="flex" color="text.secondary" mx="xxs">
              <CaretRight />
            </Box>

            <Button
              type="link"
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
