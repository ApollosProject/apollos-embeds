import {
  shareLinkByEmail,
  shareLinkOnFacebook,
  shareLinkOnTwitter,
  shareLinkOnLinkedIn,
} from './functions';
import icons from './icons';

const options = [
  {
    label: 'Email',
    icon: icons.email,
    onClick: shareLinkByEmail,
  },
  {
    label: 'Facebook',
    icon: icons.facebook,
    onClick: shareLinkOnFacebook,
  },
  {
    label: 'Twitter',
    icon: icons.twitter,
    onClick: shareLinkOnTwitter,
  },
  {
    label: 'LinkedIn',
    icon: icons.linkedin,
    onClick: shareLinkOnLinkedIn,
  },
];

export default options;
