import Wordmark from '../Wordmark';
import { useCurrentChurch } from '../../hooks';
import { Box, Avatar } from '../../ui-kit';
import { User } from '@phosphor-icons/react';

import SearchStyles from '../Searchbar/Search.styles';

import ProfileButton from '../Profile/ProfileButton';

function ChurchLogo(props) {
  const { currentChurch } = useCurrentChurch();

  return <Wordmark source={currentChurch?.wordmarkLightUrl} padding={10} {...props} />;
}

const AppHeader = () => (
  <>
    <Box
      py={8}
      px={16}
      height={58}
      alignItems="center"
      backgroundColor="fill.paper"
      borderBottom="1px solid"
      borderColor="text.quaternary"
      position="fixed"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      boxShadow="small"
      top={0}
      left={0}
      right={0}
      zIndex={999}
    >
      <Box>
        <ChurchLogo size="30px" />
      </Box>

      <ProfileButton />
    </Box>
    <Box height={58} />
  </>
);

export default AppHeader;
