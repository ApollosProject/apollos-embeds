import React, { useState, useRef, useEffect } from 'react';
import { systemPropTypes, utils } from '../../ui-kit';
import { withTheme } from 'styled-components';
import { AuthManager } from '../../components';
import ProfileDetails from './ProfileDetails';
import { Link } from 'react-router-dom';
import Color from 'color';
import ImageUploader from './ImageUploader';

import { Button, Avatar, BodyText, Box, H4, ListItem } from '../../ui-kit';
import Logo from '../Logo';
import {
  UserCirclePlus,
  ArrowRight,
  AndroidLogo,
  AppleLogo,
  User,
  ArrowSquareOut,
  X,
  Camera,
} from '@phosphor-icons/react';
import Styled from './Profile.styles';

import { useCurrentUser, useCurrentChurch } from '../../hooks';
import themeGet from '@styled-system/theme-get';
import { logout, useAuth } from '../../providers/AuthProvider';
import authSteps from '../Auth/authSteps';

const Profile = ({ theme, handleCloseProfile, size, ...rest }) => {
  const { currentUser } = useCurrentUser();
  const { currentChurch } = useCurrentChurch();

  const [state, dispatch] = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [showImageUploader, setShowImageUploader] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!showAuth) {
      const checkIfClickedOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          e.stopPropagation();
          handleCloseProfile();
        }
      };
      document.addEventListener('mousedown', checkIfClickedOutside);
      return () => {
        document.removeEventListener('mousedown', checkIfClickedOutside);
      };
    }
  });

  const handleLogout = () => {
    setShowAuth(false);
    dispatch(logout());
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      setShowImageUploader(true);
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleCloseImageUploader = () => {
    setShowImageUploader(false);
    setCrop(undefined);
    setImgSrc('');
  };

  const { colors } = JSON.parse(currentChurch?.theme) || {};

  return (
    <>
      <Styled.Profile ref={ref} {...(size ? { right: '-15px;' } : {})}>
        <Styled.ProfileCard
          borderRadius={{
            _: '0%',
            sm: 'xxl',
          }}
          width={
            size ?? {
              _: '100%',
              sm: '350px',
              md: '520px',
            }
          }
        >
          <Box display="flex" alignItems="center" justifyContent="end">
            <Styled.CloseIcon onClick={handleCloseProfile}>
              <X size={18} weight="bold" />
            </Styled.CloseIcon>
          </Box>
          {/* Header */}
          <Box display="flex" alignItems="center" flexDirection="column" mb="base">
            {imgSrc && showImageUploader ? (
              <ImageUploader
                crop={crop}
                setCrop={setCrop}
                imgSrc={imgSrc}
                handleCloseImageUploader={handleCloseImageUploader}
              />
            ) : null}
            {!imgSrc ? (
              <>
                <Box position="relative">
                  {currentUser?.profile?.photo?.uri ? (
                    <Avatar src={currentUser?.profile?.photo?.uri} alt="avatar" width="72px" />
                  ) : (
                    <Box color="base.primary" position="relative" margin="-10px">
                      <UserCirclePlus
                        size={90}
                        weight="fill"
                        color={themeGet('colors.base.primary')({ theme })}
                      />
                    </Box>
                  )}
                  {currentUser && (
                    <Box>
                      {!imgSrc && (
                        <Styled.UploadIcon>
                          <Camera
                            size={12}
                            weight="fill"
                            color={themeGet('colors.base.white')({ theme })}
                          />
                          <input type="file" accept="image/*" onChange={onSelectFile} />
                        </Styled.UploadIcon>
                      )}
                    </Box>
                  )}
                </Box>
                {currentUser?.profile?.firstName ? (
                  <H4 mt="xxs">Hey {currentUser?.profile?.firstName}</H4>
                ) : null}

                {!state.token && !imgSrc ? (
                  <Button
                    backgroundColor={Color(themeGet('colors.base.primary')({ theme }))
                      .fade(0.85)
                      .toString()}
                    borderRadius="100px"
                    title="Sign up or Login"
                    size="small"
                    onClick={() => setShowAuth(true)}
                    variant="secondary"
                    color="base.primary"
                    icon={<ArrowRight size={24} />}
                    mt="base"
                  />
                ) : null}
              </>
            ) : null}
          </Box>
          {/* Profile Actions */}
          {state.token && !showDetails && !imgSrc ? (
            <>
              <H4 color="text.secondary" mb="xs">
                My Profile
              </H4>
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
          {showDetails && !imgSrc ? <ProfileDetails setShowDetails={setShowDetails} /> : null}
          {/* Mobile App Ad */}
          {!showDetails &&
          !imgSrc &&
          (currentChurch?.mobileAppStoreUrl || currentChurch?.mobilePlayStoreUrl) ? (
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
                  overflow="hidden"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Logo
                    source={currentChurch?.logo}
                    {...(colors?.iconBackground ? { backgroundColor: colors?.iconBackground } : {})}
                  />
                </Box>
                <H4 mb="xxs">{rest.adTitle || 'Stay Connected'}</H4>
                <BodyText maxWidth="285px" textAlign="center" mb="l">
                  {rest.adBody ||
                    'Explore your faith and build daily habits with our online community.'}
                </BodyText>
              </Box>
              <Styled.AppLinks>
                {currentChurch?.mobileAppStoreUrl ? (
                  <Link to={currentChurch?.mobileAppStoreUrl}>
                    <Button
                      title="Get it on iOS"
                      icon={<AppleLogo weight="fill" size="24" />}
                      variant="secondary"
                      size="small"
                      color="base.white"
                      backgroundColor="base.black"
                      borderRadius="100px"
                      flexDirection="row-reverse"
                    />
                  </Link>
                ) : null}
                {currentChurch?.mobilePlayStoreUrl ? (
                  <Link to={currentChurch?.mobilePlayStoreUrl}>
                    <Button
                      title="Get it on Android"
                      icon={<AndroidLogo weight="fill" size="24" />}
                      variant="secondary"
                      size="small"
                      color="base.white"
                      backgroundColor="base.black"
                      borderRadius="100px"
                      flexDirection="row-reverse"
                    />
                  </Link>
                ) : null}
              </Styled.AppLinks>
            </>
          ) : null}
        </Styled.ProfileCard>
      </Styled.Profile>
      {showAuth && state.step !== authSteps.Success ? (
        <AuthManager onClose={() => setShowAuth(false)} />
      ) : null}
    </>
  );
};

Profile.propTypes = {
  ...systemPropTypes,
};
export default withTheme(Profile);
