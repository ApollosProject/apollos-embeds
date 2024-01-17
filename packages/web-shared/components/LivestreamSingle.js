import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getURLFromType } from '../utils';
import FeatureFeed from './FeatureFeed';
import FeatureFeedComponentMap from './FeatureFeed/FeatureFeedComponentMap';

import {
  BodyText,
  Box,
  MediaItem,
  H1,
  H2,
  LiveChip,
  Loader,
  Longform,
  ShareButton,
} from '../ui-kit';
import { useVideoMediaProgress, useLivestreamStatus, useHTMLContent } from '../hooks';
import VideoPlayer from './VideoPlayer';

function LivestreamSingle(props = {}) {
  const navigate = useNavigate();
  const parseHTMLContent = useHTMLContent();

  const invalidPage = !props.loading && !props.data;
  const { status } = useLivestreamStatus(props?.data);

  // Video details
  const videoMedia = props.data?.stream?.sources?.uri;

  const { userProgress } = useVideoMediaProgress({
    variables: { id: videoMedia?.id },
    skip: !videoMedia?.id,
  });

  useEffect(() => {
    if (invalidPage) {
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
    coverImage,
    htmlContent,
    title,
    childContentItemsConnection,
    featureFeed,
    publishDate: _publishDate,
    stream,
    summary,
  } = props.data;

  const childContentItems = childContentItemsConnection?.edges;
  const hasChildContent = childContentItems?.length > 0;
  const validFeatures = featureFeed?.features?.filter(
    (feature) => !!FeatureFeedComponentMap[feature?.__typename]
  );
  const hasFeatures = validFeatures?.length;

  // We'll conditionally place this divider as needed
  const infoDivider = (
    <BodyText color="text.tertiary" mx="xs">
      |
    </BodyText>
  );

  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  return (
    <>
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
      <Box margin="0 auto">
        <Box mb="base">
          {stream.sources[0] ? (
            <VideoPlayer
              userProgress={userProgress}
              parentNode={props.data}
              coverImage={coverImage?.sources[0]?.uri}
            />
          ) : (
            <Box
              backgroundSize="cover"
              paddingBottom="56.25%"
              backgroundPosition="center"
              backgroundImage={`url(${coverImage?.sources[0]?.uri})`}
            />
          )}
        </Box>

        <Box mb="l">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb="s">
            <Box>
              {status ? <LiveChip display="inline-block" status={status} /> : null}
              {/* Title */}
              {title && !hasChildContent ? <H2>{title}</H2> : null}
              {title && hasChildContent ? <H1>{title}</H1> : null}
              <Box display="flex" flexDirection="row">
                <BodyText color="text.secondary" mb={title && !hasChildContent ? 'xxs' : ''}>
                  Livestream
                </BodyText>
              </Box>
            </Box>
            <Box>
              <ShareButton contentTitle={title} />
            </Box>
          </Box>
          {htmlContent ? (
            <>
              <Longform dangerouslySetInnerHTML={{ __html: parseHTMLContent(htmlContent) }} />
            </>
          ) : null}
        </Box>

        {hasChildContent ? (
          <Box mb="l">
            <H2 mb="xs">{props.feature.title || props.feature.subtitle}</H2>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="20px">
              {childContentItems?.map((item, index) => (
                <MediaItem
                  key={item.node?.title}
                  image={item.node?.coverImage}
                  title={item.node?.title}
                  summary={item.node?.summary}
                  onClick={() => handleActionPress(item.node)}
                  videoMedia={item.node?.videos[0]}
                />
              ))}
            </Box>
          </Box>
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

LivestreamSingle.propTypes = {
  contentMaxWidth: PropTypes.string,
  data: PropTypes.shape({
    childContentItemsConnection: PropTypes.shape(),
    coverImage: PropTypes.shape({}),
    featureFeed: PropTypes.shape({}),
    htmlContent: PropTypes.string,
    id: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.shape({ embedHtml: PropTypes.string })),
  }),
  loading: PropTypes.bool,
};

export default LivestreamSingle;
