import React, { useState } from 'react';
import { systemPropTypes, utils } from '../../ui-kit';
import { withTheme } from 'styled-components';
import { AuthManager } from '../../components';
import ProfileDetails from './ProfileDetails';

import {
  Button,
  Avatar,
  BodyText,
  Box,
  Card,
  H4,
  ListItem,
} from '../../ui-kit';
import Logo from '../Logo';
import {
  UserCirclePlus,
  ArrowRight,
  AndroidLogo,
  AppleLogo,
  User,
  ArrowSquareOut,
  X,
} from 'phosphor-react';
import Styled from './Profile.styles';

import { useCurrentUser } from '../../hooks';
import themeGet from '@styled-system/theme-get';
import { logout, useAuth } from '../../providers/AuthProvider';

const Profile = ({ theme, handleCloseProfile, ...rest }) => {
  const { currentUser } = useCurrentUser();

  const [state, dispatch] = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleLogout = () => {
    setShowAuth(false);
    dispatch(logout());
  };

  return (
    <>
      <Styled.Profile>
        <Card
          p="xs"
          borderRadius="xxl"
          width="520px"
          border="1px solid rgba(0, 0, 0, 0.1)"
        >
          <Box display="flex" alignItems="center" justifyContent="end">
            <Styled.CloseIcon onClick={handleCloseProfile}>
              <X size={18} weight="bold" />
            </Styled.CloseIcon>
          </Box>
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            mb="base"
          >
            {currentUser?.profile?.photo?.uri ? (
              <Avatar src={currentUser?.profile?.photo?.uri} alt="avatar" />
            ) : (
              <Box color="text.action">
                <UserCirclePlus size={84} weight="fill" />
              </Box>
            )}
            {currentUser?.profile.firstName ? (
              <H4 mt="xxs">Hey {currentUser?.profile?.firstName}</H4>
            ) : null}

            {!state.token ? (
              <Button
                backgroundColor="rgba(23, 181, 130, 0.15)"
                borderRadius="100px"
                title="Sign up or Login"
                size="small"
                onClick={() => setShowAuth(true)}
                variant="secondary"
                color="text.action"
                icon={<ArrowRight size={24} />}
              />
            ) : null}
          </Box>
          {/* Profile Actions */}
          {state.token && !showDetails ? (
            <>
              <Styled.Title mb="xs">My Profile</Styled.Title>
              <Box>
                <ListItem
                  onClick={() => setShowDetails(true)}
                  leadingIcon={
                    <User
                      size={18}
                      weight="fill"
                      color={themeGet('colors.text.secondary')({ theme })}
                    />
                  }
                  title="Personal Details"
                />
              </Box>
              <Box mt="s" mb="base">
                <ListItem
                  leadingIcon={
                    <ArrowSquareOut
                      size={18}
                      weight="fill"
                      color={themeGet('colors.text.secondary')({ theme })}
                    />
                  }
                  onClick={handleLogout}
                  title="Logout"
                />
              </Box>
            </>
          ) : null}
          {showDetails ? (
            <ProfileDetails setShowDetails={setShowDetails} />
          ) : null}
          {/* Mobile App Ad */}
          {!showDetails ? (
            <>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                backgroundSize="63%"
                backgroundRepeat="no-repeat"
                backgroundPosition="center 0"
                backgroundImage="linear-gradient(to bottom, rgba(255, 255, 255, 0), white), url('./iphone.png')"
              >
                <Box
                  backgroundColor="base.primary"
                  borderRadius="xl"
                  mb="s"
                  mt={utils.rem('90px')}
                >
                  <Logo />
                </Box>
                <H4 mb="xxs">{rest.adTitle || 'Stay Connected'}</H4>
                <BodyText maxWidth="285px" textAlign="center" mb="l">
                  {rest.adBody ||
                    'Explore your faith and build daily habits with our online community.'}
                </BodyText>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="secondary"
                  title="Get it on iOS"
                  size="small"
                  onClick={() => {}}
                  color="text.action"
                  borderRadius="100px"
                  icon={<AppleLogo weight="fill" size="24" />}
                  mr="s"
                />
                <Button
                  variant="secondary"
                  title="Get it on Android"
                  size="small"
                  onClick={() => {}}
                  color="text.action"
                  borderRadius="100px"
                  icon={<AndroidLogo weight="fill" size="24" />}
                />
              </Box>
            </>
          ) : null}
        </Card>
      </Styled.Profile>
      {showAuth && !state.token ? <AuthManager /> : null}
    </>
  );
};

Profile.propTypes = {
  ...systemPropTypes,
};
export default withTheme(Profile);