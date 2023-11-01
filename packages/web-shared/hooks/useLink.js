import { isValidUrl } from '../utils';
import useCurrentUser from './useCurrentUser';

const CHURCH_HOSTS = {
  // `<a href="https://rock.apollos.app/ContentChannelItem/52">rock link</a>`
  ROCK: 'rock.apollos.app',
};

const useLink = options => {
  const { useRockAuth = true } = options || {};
  const { currentUser } = useCurrentUser();
  const rockAuthToken = currentUser?.rock?.authToken;

  const transformLink = link => {
    // isValidUrl also uses URL under the hood.
    // this should guarantee the destructuring
    // below won't fail.
    if (!isValidUrl(link)) return link;

    const tokenizedUrl = new URL(link);

    const { host, protocol, searchParams } = tokenizedUrl;

    if (protocol !== 'https:') return link;

    // church based URL modifications go here
    switch (host) {
      case CHURCH_HOSTS.ROCK:
        if (useRockAuth && rockAuthToken) searchParams.append('rckipid', rockAuthToken);
        break;
      default:
        break;
    }

    const formattedUrl = tokenizedUrl.toString();

    return formattedUrl;
  };

  return transformLink;
};

export default useLink;
