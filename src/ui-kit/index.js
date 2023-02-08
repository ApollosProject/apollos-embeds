import theme from './_config/theme';

import { system, systemPropTypes } from './_lib/system';
import * as utils from './_utils';

import ThemeProvider from './ThemeProvider';

// UI Kit components
import Avatar from './Avatar';
import Box from './Box';
import Button from './Button';
import ContentCard from './ContentCard';
import Loader from './Loader';
import Longform from './Longform';
import Layout from './Layout';
import Icons from './Icons';
import Input from './Input';
import Card from './Card';

import {
  BodyText,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  LargeSystemText,
  SmallBodyText,
  SmallSystemText,
  SystemText,
  TypeStyles,
} from './Typography';

export {
  // ====================
  ThemeProvider,
  // ====================
  Avatar,
  Box,
  Button,
  ContentCard,
  Loader,
  Longform,
  Layout,
  Icons,
  Input,
  Card,

  // Typography
  BodyText,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  LargeSystemText,
  SmallBodyText,
  SmallSystemText,
  SystemText,
  TypeStyles,
  // ====================
  theme,
  system,
  systemPropTypes,
  utils,
  // ====================
};
