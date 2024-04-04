import { Box, Avatar } from '../../ui-kit';
import { User } from '@phosphor-icons/react';
import { useCurrentUser } from '../../hooks';
import React, { useState } from 'react';
import Profile from './Profile';

const ProfileButton = (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser } = useCurrentUser();

  const handleOpenProfile = () => {
    setShowProfile(true);
  };

  return (
    <Box position="relative">
      <Box onClick={handleOpenProfile} cursor="pointer">
        {currentUser?.profile?.photo?.uri ? (
          <Avatar src={currentUser?.profile?.photo?.uri} width={30} alt="avatar" />
        ) : (
          <Box
            borderRadius="100%"
            backgroundColor="fill.system"
            height={30}
            width={30}
            alignItems="center"
            justifyContent="center"
            display="flex"
            color="text.secondary"
          >
            <User size={16} weight="bold" />
          </Box>
        )}
      </Box>
      {showProfile ? <Profile handleCloseProfile={() => setShowProfile(false)} /> : null}
    </Box>
  );
};

export default ProfileButton;
