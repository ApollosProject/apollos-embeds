import { Box } from '../../ui-kit';

import downloadOnAppStore from './download-on-app-store';
import downloadOnPlayStore from './download-on-play-store';

const AppStoreLink = () => <div dangerouslySetInnerHTML={{ __html: downloadOnAppStore }} />;

const PlayStoreLink = () => <div dangerouslySetInnerHTML={{ __html: downloadOnPlayStore }} />;

const StoreLinks = ({ appStoreUrl, playStoreUrl }) => {
  return (
    <Box
      py={8}
      px={16}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box py={8} px={8}>
        <p>find the app on</p>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box px={8} py={8}>
          <a href={appStoreUrl}>
            <AppStoreLink />
          </a>
        </Box>
        <Box px={8} py={8}>
          <a href={playStoreUrl}>
            <PlayStoreLink />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreLinks;
