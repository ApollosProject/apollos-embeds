import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CaretRight } from 'phosphor-react';
import { Box, Button, SystemText } from '../../ui-kit';
import {
  remove as removeBreadcrumb,
  add as addBreadcrumb,
  useBreadcrumb,
} from '../../providers/BreadcrumbProvider';

function Breadcrumbs(props = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useBreadcrumb();
  const prevIdxRef = useRef(null);
  const prevStateRef = useRef(null);
  const currentIdx = window.history.state ? window.history.state.idx : null;
  const currentState = state[state.length - 1];

  useEffect(() => {
    const handleHistoryChange = () => {
      //If they refreshed the page,
      console.log('INITIAL');
      // console.log('prevStateRef', prevStateRef.current);
      console.log('currentState', currentState);
      // console.log('prevIdxRef', prevIdxRef.current);
      // console.log('currentIdx', currentIdx);
      if (currentState) {
        if (currentState) {
          // prevStateRef.current = currentState;
          dispatch(removeBreadcrumb(currentState.id));
          console.log('Removing... prevStateRef set and dispatched');
        }
        // else {
        //   dispatch(
        //     addBreadcrumb({
        //       url: prevStateRef.current.url,
        //       title: prevStateRef.current.title,
        //     })
        //   );
        //   prevStateRef.current = null;
        //   console.log('Adding... prevStateRef removed and dispatched');
        // }
      }

      // if (prevIdxRef.current > currentIdx) {
      //   console.log('BACK');
      //   // console.log('prevStateRef', prevStateRef.current);
      //   // console.log('currentState', currentState);
      //   console.log('prevIdxRef', prevIdxRef.current);
      //   console.log('currentIdx', currentIdx);
      //   // Do something when user clicks back button
      // } else {
      //   console.log('NOTHING');
      //   // console.log('prevStateRef', prevStateRef.current);
      //   // console.log('currentState', currentState);
      //   console.log('prevIdxRef', prevIdxRef.current);
      //   console.log('currentIdx', currentIdx);
      // }
    };

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
