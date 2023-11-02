import { useCallback } from 'react';
import { isValidUrl } from '../utils';
import useCurrentUser from './useCurrentUser';

const ROCK_APP_HOST_REGEX = /rock\.[a-z]+\.app/i;

const useLink = () => {
  const { currentUser } = useCurrentUser();
  const rockAuthToken = currentUser?.rock?.authToken;

  const transformLink = useCallback(
    (link, options) => {
      const { useRockAuth = true } = options || {};
      // isValidUrl also uses URL under the hood.
      // this should guarantee the destructuring
      // below won't fail.
      if (!isValidUrl(link)) return link;

      const tokenizedUrl = new URL(link);

      const { host, protocol, searchParams } = tokenizedUrl;

      if (protocol !== 'https:') return link;

      // `<a href="https://rock.apollos.app/MyAccount">rock link</a>`
      if (useRockAuth && rockAuthToken && ROCK_APP_HOST_REGEX.test(host)) {
        searchParams.append('rckipid', rockAuthToken);
      }

      const formattedUrl = tokenizedUrl.toString();

      return formattedUrl;
    },
    [rockAuthToken],
  );

  return transformLink;
};

export default useLink;
