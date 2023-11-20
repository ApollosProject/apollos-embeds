import { useCallback } from 'react';
import { isValidUrl } from '../utils';
import useCurrentUser from './useCurrentUser';

const useLink = () => {
  const { currentUser } = useCurrentUser();
  const rockAuthToken = currentUser?.rock?.authToken;

  const currentUrl = window.location.href;

  const transformLink = useCallback(
    (link, options) => {
      const { useRockAuth = true } = options || {};

      if (!isValidUrl(link) || !isValidUrl(currentUrl)) return link;

      const tokenizedCurrentUrl = new URL(currentUrl);
      const tokenizedUrl = new URL(link);

      if (tokenizedUrl.protocol !== 'https:') return link;

      // `<a href="https://localhost:3000">rock link</a>`
      const matchingHosts = tokenizedUrl.host === tokenizedCurrentUrl.host;
      const appendRockAuthToken = useRockAuth && rockAuthToken && matchingHosts;

      if (appendRockAuthToken) {
        tokenizedUrl.searchParams.append('rckipid', rockAuthToken);
      }

      const formattedUrl = tokenizedUrl.toString();

      return formattedUrl;
    },
    [rockAuthToken, currentUrl],
  );

  return transformLink;
};

export default useLink;
