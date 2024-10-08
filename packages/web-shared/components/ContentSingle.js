import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ChatCircleText } from '@phosphor-icons/react';

import { getURLFromType } from '../utils';

import { format, parseISO } from 'date-fns';
import FeatureFeed from './FeatureFeed';
import FeatureFeedComponentMap from './FeatureFeed/FeatureFeedComponentMap';
import { set as setModal, useModal } from '../providers/ModalProvider';

import {
  Box,
  Loader,
  Longform,
  H3,
  ContentCard,
  BodyText,
  ShareButton,
  Button,
  Icons,
  PhospherIcon,
} from '../ui-kit';
import { useFeatureFeed, useHTMLContent, useVideoMediaProgress } from '../hooks';
import { Title, ParentTitle, ParentSummary } from './ContentSingle.styles';

import Comments, { SIDEBAR_WITH } from './Comments';

import VideoPlayer from './VideoPlayer';

import InteractWhenLoaded from './InteractWhenLoaded';
import TrackEventWhenLoaded from './TrackEventWhenLoaded';
import styled from 'styled-components';
import { useNavigation } from '../providers/NavigationProvider';
import { useShouldUsePathRouter } from '../providers/AppProvider';

const infoDivider = (
  <BodyText color="text.tertiary" mx="xs" display={{ xs: 'none', sm: 'block' }}>
    |
  </BodyText>
);

const CalendarIconWrapper = styled.span`
  margin-right: ${({ theme }) => theme.space.xxs};
  display: inline-flex;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const CalendarIcon = ({ name }) => (
  <CalendarIconWrapper>
    <PhospherIcon name={name} />
  </CalendarIconWrapper>
);

const FlexBodyText = styled(BodyText)`
  display: flex;
  align-items: center;
`;

function CalendarData({ start, end, location }) {
  return (
    <>
      {location ? (
        <FlexBodyText color="text.secondary" mb={'xxs'}>
          <CalendarIcon name="globe" />
          {location}
        </FlexBodyText>
      ) : null}
      {start && location ? infoDivider : null}
      {start ? (
        <FlexBodyText color="text.secondary" mb={'xxs'}>
          <CalendarIcon name="calendar" />
          {start}
        </FlexBodyText>
      ) : null}
      {end && start ? infoDivider : null}
      {end ? (
        <FlexBodyText color="text.secondary" mb={'xxs'}>
          <CalendarIcon name="clock" />
          {end}
        </FlexBodyText>
      ) : null}
    </>
  );
}

function ContentSingle(props = {}) {
  const { navigate, id: idFromParams } = useNavigation();
  const [showComments, setShowComments] = useState(false);
  const usePathRouter = useShouldUsePathRouter();

  const [state, dispatch] = useModal();
  const parseHTMLContent = useHTMLContent();

  const feedId = props?.data?.featureFeed?.id;
  const {
    feedLoading,
    feedError,
    data: feedData,
  } = useFeatureFeed({
    variables: {
      itemId: feedId,
    },
    skip: !feedId,
  });

  const invalidPage = !props.loading && !props.data;

  // Video details
  const videoMedia = props.data?.videos?.[0];

  const { userProgress } = useVideoMediaProgress({
    variables: { id: videoMedia?.id },
    skip: !videoMedia?.id,
  });

  useEffect(() => {
    if (!state.modal && invalidPage) {
      // return home if the page is invalid
      navigate();
    }
  }, [invalidPage, navigate]);

  // Try and convince Google that this is the canonical URL
  // TODO: Find a better way to determine this.
  const canonicalUrl = usePathRouter
    ? `${window.location.origin}/ac/${idFromParams}`
    : `${window.location.origin}/?id=${idFromParams}`;

  // Some websites have existing canonical links that need to be updated.
  useEffect(() => {
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const oldValue = canonicalLink.getAttribute('href');
      canonicalLink.setAttribute('href', canonicalUrl);
      // Reset when we are done.
      return () => {
        canonicalLink.setAttribute('href', oldValue);
      };
    }
  }, []);

  if (props.loading || invalidPage) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
        flexGrow={1}
      >
        <Loader />
      </Box>
    );
  }

  // Content Details
  const {
    id,
    coverImage,
    htmlContent,
    commentsEnabled,
    comments,
    title,
    summary,
    parentChannel,
    childContentItemsConnection,
    siblingContentItemsConnection,
    parentItem,
  } = props?.data;

  const childContentItems = childContentItemsConnection?.edges;
  const siblingContentItems = siblingContentItemsConnection?.edges;
  const hasChildContent = childContentItems?.length > 0;
  const hasSiblingContent = siblingContentItems?.length > 0;
  const hasParent = !!parentItem;

  const feed = feedData?.node;
  const validFeatures = feed?.features?.filter(
    (feature) => !!FeatureFeedComponentMap[feature?.__typename]
  );
  const hasFeatures = validFeatures?.length;
  const formattedStartDate = props?.data?.start
    ? format(parseISO(props.data.start), 'eee, MMMM do, yyyy')
    : null;
  const formattedStartToEnd =
    props?.data?.start && props?.data?.end
      ? `${format(parseISO(props.data.start), 'hh:mm a')} — ${format(
          parseISO(props.data.end),
          'hh:mm a'
        )}`
      : null;
  const handleActionPress = (item) => {
    if (idFromParams !== getURLFromType(item)) {
      navigate({
        id: getURLFromType(item),
      });
    }
    if (state.modal) {
      const url = getURLFromType(item);
      dispatch(setModal(url));
    }
  };

  return (
    <>
      {/* TODO: Max width set to 750px due to low resolution pictures. Can be increased as higher quality images are used */}
      <Helmet>
        {/* Standard metadata tags */}
        <title>{title}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={summary} />
        <meta name="image" content={coverImage?.sources[0]?.uri} />
        {/* End standard metadata tags */}
        {/* Facebook tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={coverImage?.sources[0]?.uri} />
        {/* End Facebook tags */}
        {/* Twitter tags */}
        <meta
          name="twitter:card"
          content={coverImage?.sources[0]?.uri ? 'summary_large_image' : 'summary'}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={coverImage?.sources[0]?.uri} />
        <meta name="twitter:image:alt" content={title} />
        {/* End Twitter tags */}
      </Helmet>
      <Box>
        <Box margin="0 auto" maxWidth={{ _: '750px' }} className="content-single">
          <InteractWhenLoaded loading={props.loading} nodeId={id} action={'VIEW'} />
          <TrackEventWhenLoaded
            loading={props.loading}
            eventName={'View Content'}
            properties={{
              itemId: props.data?.id,
              parentId: props.data?.parentChannel?.id,
              parentName: props.data?.parentChannel?.name,
              title: props.data?.title,
            }}
          />
          {coverImage?.sources[0]?.uri || videoMedia ? (
            <Box mb="base" borderRadius="xl" overflow="hidden" width="100%">
              {videoMedia ? (
                <VideoPlayer
                  userProgress={userProgress}
                  parentNode={props.data}
                  coverImage={coverImage?.sources?.[0]?.uri}
                />
              ) : (
                <Box
                  backgroundSize="cover"
                  paddingBottom="56.25%"
                  backgroundPosition="center"
                  backgroundImage={`url(${coverImage?.sources?.[0]?.uri})`}
                  backgroundRepeat="no-repeat"
                />
              )}
            </Box>
          ) : null}

          <Box mb="l" role="main">
            <Box mb="s" borderBottom="1px solid" borderColor="text.quaternary">
              {/* Title */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {title ? <Title>{title}</Title> : null}
              </Box>
              <Box display="flex" flexDirection={{ sm: 'row', xs: 'column' }} width="100%">
                {parentChannel?.name ? (
                  <BodyText color="text.secondary" mb={title && !hasChildContent ? 'xxs' : ''}>
                    {parentChannel?.name}
                  </BodyText>
                ) : null}

                <CalendarData
                  start={formattedStartDate}
                  end={formattedStartToEnd}
                  location={props?.data?.location}
                />
              </Box>

              <Box display="flex" flexDirection="row" gridGap={8}>
                {commentsEnabled ? (
                  <Button
                    title="Responses"
                    icon={<ChatCircleText weight="bold" size={18} />}
                    variant="secondary"
                    size="micro"
                    onClick={() => setShowComments(!showComments)}
                  />
                ) : null}
                <ShareButton contentTitle={title} variant="secondary" size="micro" />
              </Box>
            </Box>
            {htmlContent ? (
              <>
                <Longform
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLContent(htmlContent),
                  }}
                />
              </>
            ) : null}
          </Box>
          {/* Sub-Feature Feed */}
          {hasFeatures ? (
            <Box mb="l">
              <FeatureFeed data={feed} />
            </Box>
          ) : null}

          <Box
            display="flex"
            flexDirection="row"
            gridGap={8}
            borderTop="1px solid"
            borderColor="text.quaternary"
            py={4}
            mt="s"
            mb="base"
          >
            {commentsEnabled ? (
              <Button
                title="Responses"
                icon={<ChatCircleText weight="bold" size={18} />}
                variant="secondary"
                size="micro"
                onClick={() => setShowComments(!showComments)}
              />
            ) : null}
            <ShareButton contentTitle={title} variant="secondary" size="micro" />
          </Box>

          {/* Display content for series */}
          {hasChildContent ? (
            <Box mb="l">
              <H3 mb="xs">{props.feature?.title}</H3>

              <Box
                display="grid"
                gridGap="30px 30px"
                gridTemplateColumns={{
                  _: 'repeat(1, minmax(0, 1fr));',
                  md: 'repeat(2, minmax(0, 1fr));',
                }}
                padding={{
                  _: '30px',
                  md: '0',
                }}
              >
                {childContentItems?.map((item, index) => (
                  <ContentCard
                    key={item.node?.title + index}
                    image={item.node?.coverImage}
                    title={item.node?.title}
                    summary={item.node?.summary}
                    onClick={() => handleActionPress(item.node)}
                    videoMedia={item.node?.videos?.[0]}
                    channelLabel={item.node?.parentItem?.title}
                  />
                ))}
              </Box>
            </Box>
          ) : null}

          {/* Display content for sermons */}
          {hasParent ? (
            <>
              <H3 flex="1" mr="xs" mb="xs">
                This Series
              </H3>
              <Box flex="1" mb="l" minWidth="180px" {...props}>
                <Box
                  position="relative"
                  display="flex"
                  backgroundColor="neutral.gray6"
                  overflow="hidden"
                  flexDirection={{ _: 'column', md: 'row' }}
                  mb="l"
                  borderRadius="l"
                  cursor="pointer"
                  onClick={() => handleActionPress(parentItem)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleActionPress(parentItem);
                    }
                  }}
                >
                  {/* Image */}
                  <Box
                    alignItems="center"
                    backgroundColor="white"
                    display="flex"
                    overflow="hidden"
                    width={{ _: '100%', md: '60%' }}
                  >
                    <Box
                      as="img"
                      src={parentItem?.coverImage?.sources[0]?.uri}
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  {/* Masthead */}
                  <Box
                    width={{ _: 'auto', md: '40%' }}
                    padding={{ _: 'base', md: 'none' }}
                    backdropFilter="blur(64px)"
                    display="flex"
                    flexDirection="column"
                    paddingTop={{ md: 'xl' }}
                  >
                    <ParentTitle>{parentItem?.title}</ParentTitle>
                    <ParentSummary color="text.secondary">{parentItem?.summary}</ParentSummary>
                  </Box>
                </Box>
              </Box>
            </>
          ) : null}
          {hasSiblingContent ? (
            <>
              <H3 flex="1" mr="xs">
                In This Series
              </H3>
              <Box mb="l">
                <H3 mb="xs">{props.feature?.title}</H3>
                <Box
                  display="grid"
                  gridGap="30px 30px"
                  gridTemplateColumns={{
                    _: 'repeat(1, minmax(0, 1fr));',
                    md: 'repeat(2, minmax(0, 1fr));',
                  }}
                  padding={{
                    _: '30px',
                    md: '0',
                  }}
                >
                  {siblingContentItems?.map((item, index) => (
                    <ContentCard
                      key={item.node?.title + index}
                      image={item.node?.coverImage}
                      title={item.node?.title}
                      summary={item.node?.summary}
                      onClick={() => handleActionPress(item.node)}
                      videoMedia={item.node?.videos[0]}
                      channelLabel={item.node?.parentItem?.title}
                    />
                  ))}
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
        {showComments ? (
          <Comments
            parent={props?.data}
            comments={comments}
            onClose={() => setShowComments(false)}
          />
        ) : null}
      </Box>
    </>
  );
}

ContentSingle.propTypes = {
  contentMaxWidth: PropTypes.string,
  data: PropTypes.shape({
    childContentItemsConnection: PropTypes.shape(),
    coverImage: PropTypes.shape({}),
    featureFeed: PropTypes.shape({}),
    htmlContent: PropTypes.string,
    id: PropTypes.string,
    parentChannel: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    summary: PropTypes.string,
    title: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.shape({ embedHtml: PropTypes.string })),
  }),
  loading: PropTypes.bool,
};

export default ContentSingle;
