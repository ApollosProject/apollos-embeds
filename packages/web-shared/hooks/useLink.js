import { useCallback } from 'react';
import { parse } from 'tldts';
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

      const { domainWithoutSuffix: urlTopLevelDomain } = parse(tokenizedUrl.href);
      const { domainWithoutSuffix: currentUrlTopLevelDomain } = parse(tokenizedCurrentUrl.href);
      const matchingTopLevelDomain = urlTopLevelDomain === currentUrlTopLevelDomain;

      const appendRockAuthToken = useRockAuth && rockAuthToken && matchingTopLevelDomain;

      if (appendRockAuthToken) {
        tokenizedUrl.searchParams.append('rckipid', rockAuthToken);
      }

      const formattedUrl = tokenizedUrl.toString();

      return formattedUrl;
    },
    [rockAuthToken, currentUrl, parse],
  );

  return transformLink;
};

export default useLink;
