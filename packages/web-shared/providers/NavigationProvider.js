import React, { createContext, useContext } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useShouldUsePathRouter } from '../providers/AppProvider';

const NavigationContext = createContext({ id: null, navigate: () => {} });

const NavigationProvider = (props = {}) => {
  const [searchParams] = useSearchParams();
  const { contentId, feedId } = useParams();
  const shouldUsePathRouter = useShouldUsePathRouter();
  const nativeNavigate = useNavigate();

  const id = contentId || feedId || searchParams.get('id');
  let navigate = () => {};

  if (shouldUsePathRouter) {
    navigate = ({ id } = {}) => {
      const type = id.include('FeatureFeed') ? 'content' : 'feed';
      if (id) {
        nativeNavigate({
          pathname: `/${type === 'content' ? 'ac' : 'af'}/${id}`,
        });
        // Assume that no params
      } else {
        nativeNavigate({
          pathname: '/',
        });
      }
    };
  } else {
    navigate = ({ id, type } = {}) => {
      if (id) {
        nativeNavigate({
          search: `?id=${id}`,
        });
      } else {
        nativeNavigate({
          pathname: '/',
        });
      }
    };
  }

  return (
    <NavigationContext.Provider value={{ id, navigate }}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);

export default NavigationProvider;
