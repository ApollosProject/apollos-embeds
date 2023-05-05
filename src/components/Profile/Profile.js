import React, { useEffect } from 'react';
import { systemPropTypes, utils } from '../../ui-kit';
import { withTheme } from 'styled-components';

import {
  Button,
  Avatar,
  BodyText,
  Box,
  Card,
  H6,
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
} from 'phosphor-react';
import Styled from './Profile.styles';

import { useCurrentUser } from '../../hooks';
import themeGet from '@styled-system/theme-get';

const Profile = ({ theme, ...rest }) => {
  const { currentUser } = useCurrentUser();

  return (
    <Styled.Profile>
      <Card p="l" borderRadius="xxl" maxWidth="520px">
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          mb="base"
        >
          {currentUser?.photo?.uri ? (
            <Avatar src={currentUser?.photo?.uri} alt="avatar" mr="s" />
          ) : (
            <Box color="text.action">
              <UserCirclePlus size={84} weight="fill" />
            </Box>
          )}
          {currentUser?.profile.name ? (
            <H4>`Hey ${currentUser?.profile?.firstName}`</H4>
          ) : null}
          <Button
            backgroundColor="rgba(23, 181, 130, 0.15)"
            borderRadius="100px"
            title="Sign up or Login"
            size="small"
            onClick={() => {}}
            type="secondary"
            color="text.action"
            icon={<ArrowRight size={24} />}
          />
        </Box>
        <Styled.Title mb="xs">My Profile</Styled.Title>
        <Box>
          <ListItem
            leadingIcon={
              <User
                size={18}
                weight="fill"
                color={themeGet('colors.text.secondary')({ theme })}
              />
            }
            title="Personal Detatils"
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
            title="Logout"
          />
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          backgroundSize="80%"
          backgroundRepeat="no-repeat"
          backgroundPosition="center 0"
          backgroundImage="linear-gradient(to bottom, rgba(255, 255, 255, 0), white), url('./iphone.png')"
        >
          <Box
            backgroundColor="base.primary"
            padding="s"
            borderRadius="xl"
            mb="s"
            mt={utils.rem('108px')}
          >
            <Logo />
          </Box>
          <H4>{rest.adTitle || 'Stay Connected'}</H4>
          <BodyText maxWidth="285px" textAlign="center" mb="base">
            {rest.adBody ||
              'Explore your faith and build daily habits with our online community.'}
          </BodyText>
        </Box>
        <Box>
          <Button
            type="secondary"
            title="Get it on iOS"
            size="small"
            onClick={() => {}}
            color="text.action"
            borderRadius="100px"
            icon={<AppleLogo weight="fill" size="24" />}
            mr="s"
          />
          <Button
            type="secondary"
            title="Get it on Android"
            size="small"
            onClick={() => {}}
            color="text.action"
            borderRadius="100px"
            icon={<AndroidLogo weight="fill" size="24" />}
          />
        </Box>
      </Card>
    </Styled.Profile>
  );
};

Profile.propTypes = {
  ...systemPropTypes,
};
export default withTheme(Profile);
