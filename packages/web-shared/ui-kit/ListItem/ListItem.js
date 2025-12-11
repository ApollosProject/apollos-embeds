import React from 'react';

import { useNavigate } from 'react-router-dom';

import Styled from './ListItem.styles';
import { Box } from '..';
import { getURLFromType } from '../../utils';
import { systemPropTypes } from '../_lib/system';

function ListItem({ title, subtitle, leadingIcon, tailingIcon, node, onClick, ...props }) {
  // If item has link, redirect to URL
  const navigate = useNavigate();
  const handleActionPress = () => {
    navigate({
      id: getURLFromType(node),
    });
  };

  // Default tailing icon
  const Arrow = (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1.5L8.5 9L1 16.5"
        stroke="#AFAFB3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Default leading icon
  const Clip = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.8412 4.35693L12.8413 4.35678C13.2869 3.90825 13.8168 3.55228 14.4004 3.30937C14.9841 3.06646 15.6101 2.94141 16.2423 2.94141C16.8745 2.94141 17.5005 3.06646 18.0842 3.30937C18.6679 3.55228 19.1977 3.90825 19.6433 4.35678L19.6436 4.35707C20.0921 4.80262 20.4481 5.33249 20.691 5.91618C20.9339 6.49986 21.0589 7.12583 21.0589 7.75804C21.0589 8.39026 20.9339 9.01623 20.691 9.59991C20.4481 10.1836 20.0921 10.7135 19.6436 11.159L19.6434 11.1592L16.9903 13.8123C16.088 14.7137 14.8647 15.22 13.5892 15.22C12.3137 15.22 11.0904 14.7137 10.188 13.8123L10.1881 13.8122L10.1858 13.8102C10.1168 13.7476 10.0612 13.6717 10.0224 13.5871C9.98365 13.5024 9.96246 13.4107 9.96017 13.3176C9.95788 13.2245 9.97453 13.1319 10.0091 13.0454C10.0437 12.959 10.0955 12.8804 10.1613 12.8146C10.2272 12.7487 10.3057 12.6969 10.3922 12.6623C10.4787 12.6278 10.5713 12.6111 10.6644 12.6134C10.7575 12.6157 10.8492 12.6369 10.9338 12.6757C11.0185 12.7145 11.0944 12.7701 11.1569 12.8391L11.1569 12.8391L11.1592 12.8414C11.805 13.4834 12.6786 13.8437 13.5892 13.8437C14.4998 13.8437 15.3734 13.4834 16.0192 12.8414L16.0193 12.8413L18.6723 10.1883C18.6724 10.1883 18.6724 10.1882 18.6724 10.1882C18.9926 9.86966 19.2466 9.491 19.42 9.07398C19.5934 8.65692 19.6826 8.20971 19.6826 7.75804C19.6826 7.30638 19.5934 6.85917 19.42 6.44211C19.2466 6.02505 18.9925 5.64636 18.6723 5.3278L18.6723 5.32778C18.0265 4.68583 17.1529 4.3255 16.2423 4.3255C15.3317 4.3255 14.4581 4.68583 13.8123 5.32778L13.8122 5.32791L11.957 7.18305C11.8264 7.3009 11.6555 7.36419 11.4796 7.35986C11.3032 7.35552 11.1352 7.2835 11.0104 7.15871C10.8856 7.03392 10.8136 6.86592 10.8092 6.68949C10.8049 6.51357 10.8682 6.3427 10.9861 6.21207L12.8412 4.35693Z"
        fill="#AFAFB3"
        stroke="#AFAFB3"
        strokeWidth="0.125"
      />
      <path
        d="M12.0001 16.7719L10.1438 18.6282C9.50654 19.2387 8.65542 19.5754 7.77289 19.5659C6.89035 19.5564 6.04664 19.2017 5.42256 18.5776C4.79848 17.9535 4.44369 17.1098 4.43424 16.2273C4.42478 15.3447 4.76141 14.4936 5.37197 13.8563L8.0251 11.2032C8.6592 10.5729 9.51696 10.2191 10.411 10.2191C11.3051 10.2191 12.1629 10.5729 12.797 11.2032C12.9396 11.3324 13.1266 11.4019 13.319 11.3972C13.5115 11.3924 13.6948 11.3138 13.8309 11.1777C13.967 11.0416 14.0456 10.8583 14.0503 10.6658C14.0551 10.4734 13.9856 10.2865 13.8563 10.1438C12.9423 9.23068 11.7031 8.71777 10.411 8.71777C9.119 8.71777 7.87981 9.23068 6.96572 10.1438L4.3126 12.7969C3.83563 13.2438 3.45338 13.7819 3.18857 14.3795C2.92376 14.977 2.78181 15.6217 2.77116 16.2751C2.7605 16.9286 2.88135 17.5776 3.12653 18.1834C3.37172 18.7893 3.73622 19.3396 4.19836 19.8018C4.66051 20.2639 5.21087 20.6284 5.81671 20.8736C6.42255 21.1188 7.07151 21.2396 7.725 21.229C8.37849 21.2183 9.02316 21.0764 9.62069 20.8116C10.2182 20.5468 10.7564 20.1645 11.2032 19.6875L13.0595 17.8313C13.1887 17.6886 13.2582 17.5017 13.2535 17.3092C13.2487 17.1168 13.1702 16.9335 13.034 16.7974C12.8979 16.6612 12.7146 16.5827 12.5221 16.5779C12.3297 16.5732 12.1428 16.6427 12.0001 16.7719V16.7719Z"
        fill="#AFAFB3"
      />
    </svg>
  );

  // If leadingIcon is an image with uri, add frame to image. Otherwise, use whatever is passed in. If undefined, use default clip icon
  const LeadingIcon = leadingIcon?.sources ? (
    <Styled.LeadingIcon>
      <Box
        width="100%"
        height="100%"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundImage={`url(${leadingIcon?.sources[0].uri ? leadingIcon.sources[0].uri : null})`}
      />
    </Styled.LeadingIcon>
  ) : leadingIcon ? (
    leadingIcon
  ) : (
    Clip
  );

  return (
    <Styled.ListItem
      cursor={node || onClick ? 'pointer' : 'default'}
      onClick={onClick || (node && handleActionPress)}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        {/* Leading Icon => If image URL is passed, use image => If no image URL or svg/other is passed as prop, use props => defaults to clip if undefined*/}
        {LeadingIcon}
      </Box>
      <Styled.Wrapper>
        {/* Title and Subtitle */}
        <Styled.Heading>
          <Styled.Title>
            <Styled.Ellipse>{title}</Styled.Ellipse>
          </Styled.Title>
          <Styled.Subtitle>
            <Styled.Ellipse>{subtitle}</Styled.Ellipse>
          </Styled.Subtitle>
        </Styled.Heading>

        {/* Tailing Icon => defaults to arrow if undefined */}
        <Styled.TailingIcon>{tailingIcon ? tailingIcon : Arrow}</Styled.TailingIcon>
      </Styled.Wrapper>
    </Styled.ListItem>
  );
}

ListItem.propTypes = {
  ...systemPropTypes,
};

export default ListItem;
