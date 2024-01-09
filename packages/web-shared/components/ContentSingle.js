import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getURLFromType } from '../utils';

import { format, parseISO } from 'date-fns';
import FeatureFeed from './FeatureFeed';
import FeatureFeedComponentMap from './FeatureFeed/FeatureFeedComponentMap';
import { add as addBreadcrumb, useBreadcrumbDispatch } from '../providers/BreadcrumbProvider';
import { set as setModal, useModal } from '../providers/ModalProvider';

import { Box, H1, H2, Loader, Longform, H3, ContentCard, BodyText, ShareButton } from '../ui-kit';
import { useHTMLContent, useVideoMediaProgress } from '../hooks';
import { Title } from './ContentSingle.styles';

import VideoPlayer from './VideoPlayer';
import InteractWhenLoaded from './InteractWhenLoaded';

function ContentSingle(props = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();
  const [state, dispatch] = useModal();
  const parseHTMLContent = useHTMLContent();

  const invalidPage = !props.loading && !props.data;

  // temp
  // Video details
  const videoMedia = props.data?.videos?.[0];

  const { userProgress } = useVideoMediaProgress({
    variables: { id: videoMedia?.id },
    skip: !videoMedia?.id,
  });

  useEffect(() => {
    if (!state.modal && invalidPage) {
      navigate({
        pathname: '/',
      });
    }
  }, [invalidPage, navigate]);

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
    title,
    summary,
    parentChannel,
    childContentItemsConnection,
    siblingContentItemsConnection,
    featureFeed,
  } = props?.data;

  const childContentItems = childContentItemsConnection?.edges;
  const siblingContentItems = siblingContentItemsConnection?.edges;
  const hasChildContent = childContentItems?.length > 0;
  const hasSiblingContent = siblingContentItems?.length > 0;
  const validFeatures = featureFeed?.features?.filter(
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
    if (searchParams.get('id') !== getURLFromType(item)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(item)}`,
          title: item.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(item)}`);
    }
    if (state.modal) {
      const url = getURLFromType(item);
      dispatch(setModal(url));
    }
  };
  const infoDivider = (
    <BodyText color="text.tertiary" mx="xs">
      |
    </BodyText>
  );

  return (
    <>
      {/* TODO: Max width set to 750px due to low resolution pictures. Can be increased as higher quality images are used */}
      <Helmet>
        <title>{title}</title>
        {/* Standard metadata tags */}
        <title>{title}</title>
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
      <Box margin="0 auto" maxWidth="750px">
        <InteractWhenLoaded loading={props.loading} nodeId={id} action={'VIEW'} />
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

        <Box mb="l">
          <Box
            display="flex"
            flexDirection={{
              _: 'column',
              md: 'row',
            }}
            justifyContent="space-between"
            alignItems={{
              _: 'start',
              md: 'center',
            }}
            mb="s"
          >
            <Box>
              {/* Title */}
              {title && !hasChildContent ? <Title>{title}</Title> : null}
              {title && hasChildContent ? <Title>{title}</Title> : null}
              <Box display="flex" flexDirection="row">
                {parentChannel?.name || props?.data?.location ? (
                  <BodyText color="text.secondary" mb={title && !hasChildContent ? 'xxs' : ''}>
                    {parentChannel?.name || props?.data?.location}
                  </BodyText>
                ) : null}
                {formattedStartDate ? infoDivider : null}
                {formattedStartDate ? (
                  <BodyText color="text.secondary">{formattedStartDate}</BodyText>
                ) : null}
                {formattedStartToEnd ? infoDivider : null}
                {formattedStartToEnd ? (
                  <BodyText color="text.secondary">{formattedStartToEnd}</BodyText>
                ) : null}
              </Box>
            </Box>
            <Box
              mt={{
                _: 'xs',
                md: '0',
              }}
            >
              <ShareButton ml={{ md: 'xs' }} contentTitle={title} />
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
        {/* Display content for series */}
        {hasChildContent ? (
          <Box mb="l">
            <H3 mb="xs">{props.feature?.title}</H3>

            <Box
              display="grid"
              gridGap="100px 30px"
              gridTemplateColumns={{
                _: 'repeat(1, minmax(0, 1fr));',
                md: 'repeat(2, minmax(0, 1fr));',
                lg: 'repeat(3, minmax(0, 1fr));',
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
                />
              ))}
            </Box>
          </Box>
        ) : null}
        {/* Display content for sermons */}
        {hasSiblingContent ? (
          <>
            <H3 flex="1" mr="xs">
              In This Series
            </H3>
            <Box mb="l">
              <H3 mb="xs">{props.feature?.title}</H3>
              <Box
                display="grid"
                gridGap="100px 30px"
                gridTemplateColumns={{
                  _: 'repeat(1, minmax(0, 1fr));',
                  md: 'repeat(2, minmax(0, 1fr));',
                  lg: 'repeat(3, minmax(0, 1fr));',
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
                  />
                ))}
              </Box>
            </Box>
          </>
        ) : null}

        {/* Sub-Feature Feed */}
        {hasFeatures ? (
          <Box my="l">
            <FeatureFeed data={featureFeed} />
          </Box>
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
