import theme from './_config/theme';

import { system, systemPropTypes } from './_lib/system';
import * as utils from './_utils';

import ThemeProvider from './ThemeProvider';

// UI Kit components
import Avatar from './Avatar';
import Box from './Box';
import Button from './Button';
import Card from './Card';
import ContentCard from './ContentCard';
import Icons from './Icons';
import Input from './Input';
import Layout from './Layout';
import Loader from './Loader';
import Longform from './Longform';
import MediaItem, { LiveChip } from './MediaItem';
import ProgressBar from './ProgressBar';
import ResourceCard from './ResourceCard';
import Select from './Select';
import ShareButton from './ShareButton';

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
  Card,
  ContentCard,
  Icons,
  Input,
  Layout,
  Loader,
  Longform,
  MediaItem,
  LiveChip,
  ProgressBar,
  ResourceCard,
  Select,
  ShareButton,

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
