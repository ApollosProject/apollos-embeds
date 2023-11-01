import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import { useNavigate } from 'react-router-dom';

import { getURLFromType } from '../utils';
import FeatureFeed from './FeatureFeed';
import FeatureFeedComponentMap from './FeatureFeed/FeatureFeedComponentMap';

import {
  BodyText,
  Box,
  MediaItem,
  H1,
  H2,
  H3,
  H4,
  LiveChip,
  Loader,
  Longform,
  ShareButton,
} from '../ui-kit';
import { useVideoMediaProgress, useLivestreamStatus, useDescriptionHTML } from '../hooks';
import VideoPlayer from './VideoPlayer';

const MAX_EPISODE_COUNT = 20;

function LivestreamSingle(props = {}) {
  const navigate = useNavigate();
  const parseDescriptionHTML = useDescriptionHTML();

  const invalidPage = !props.loading && !props.data;
  const { status } = useLivestreamStatus(props?.data);

  // Video details
  const videoMedia = props.data?.stream?.sources?.uri;

  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress({
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
  } = props.data;

  const childContentItems = childContentItemsConnection?.edges;
  const hasChildContent = childContentItems?.length > 0;
  const validFeatures = featureFeed?.features?.filter(
    feature => !!FeatureFeedComponentMap[feature?.__typename],
  );
  const hasFeatures = validFeatures?.length;
  const showEpisodeCount = hasChildContent && childContentItems.length < MAX_EPISODE_COUNT;

  const publishDate = new Date(parseInt(_publishDate));

  const formattedPublishDate = _publishDate
    ? format(addMinutes(publishDate, publishDate.getTimezoneOffset()), 'MMMM do, yyyy')
    : null;

  // We'll conditionally place this divider as needed
  const infoDivider = (
    <BodyText color="text.tertiary" mx="xs">
      |
    </BodyText>
  );

  const handleActionPress = item => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  return (
    <>
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

                {/* ( Optional Divider ) */}
                {formattedPublishDate ? infoDivider : null}
                {formattedPublishDate ? (
                  <BodyText color="text.secondary">{formattedPublishDate}</BodyText>
                ) : null}
              </Box>
            </Box>
            <Box>
              <ShareButton contentTitle={title} />
            </Box>
          </Box>

          {/* Children Count */}
          {showEpisodeCount ? (
            <H4 color="text.secondary" mr="xl">
              {childContentItems.length} {`Episode${childContentItems.length === 1 ? '' : 's'}`}
            </H4>
          ) : null}
          {htmlContent ? (
            <>
              <Longform dangerouslySetInnerHTML={{ __html: parseDescriptionHTML(htmlContent) }} />
            </>
          ) : null}
        </Box>

        {hasChildContent ? (
          <Box mb="l">
            <H3 mb="xs">{props.feature.title || props.feature.subtitle}</H3>
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
    publishDate: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.shape({ embedHtml: PropTypes.string })),
  }),
  loading: PropTypes.bool,
};

export default LivestreamSingle;
