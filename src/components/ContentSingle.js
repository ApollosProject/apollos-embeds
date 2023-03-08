import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import { useNavigate } from 'react-router-dom';

import { getURLFromType, videoFilters } from '../utils';
import FeatureFeed from './FeatureFeed';
import FeatureFeedComponentMap from './FeatureFeed/FeatureFeedComponentMap';

import {
  Box,
  H1,
  H2,
  H4,
  Loader,
  Longform,
  H3,
  ContentCard,
  BodyText,
} from '../ui-kit';
import { useVideoMediaProgress } from '../hooks';
import VideoPlayer from './VideoPlayer';

function ContentSingle(props = {}) {
  const navigate = useNavigate();

  const invalidPage = !props.loading && !props.data;

  // Video details
  const videoMedia = props.data?.videos[0];

  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress(
    {
      variables: { id: videoMedia?.id },
      skip: !videoMedia?.id,
    }
  );

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
  const coverImage = props?.data?.coverImage;

  const htmlContent = props?.data?.htmlContent;
  const summary = props?.data?.summary;
  const title = props?.data?.title;
  const parentChannel = props.data?.parentChannel;
  const childContentItems = props.data?.childContentItemsConnection?.edges;
  const hasChildContent = childContentItems?.length > 0;
  const validFeatures = props.data?.featureFeed?.features.filter(
    (feature) => FeatureFeedComponentMap[feature.__typename]
  );
  const hasFeatures = validFeatures?.length;
  const showEpisodeCount = hasChildContent && childContentItems.length < 20;

  const publishDate = new Date(parseInt(props?.data?.publishDate));

  const formattedPublishDate = props?.data?.publishDate
    ? format(
        addMinutes(publishDate, publishDate.getTimezoneOffset()),
        'MMMM do, yyyy'
      )
    : null;

  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

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
      <Box margin="0 auto">
        <Box mb="base">
          {props.data?.videos[0] ? (
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
          {/* Title */}

          {title && !hasChildContent ? <H2>{title}</H2> : null}
          {title && hasChildContent ? <H1>{title}</H1> : null}
          <Box display="flex" flexDirection="row" mb="s">
            {parentChannel.name ? (
              <BodyText
                color="text.secondary"
                mb={title && !hasChildContent ? 'xxs' : ''}
              >
                {parentChannel.name}
              </BodyText>
            ) : null}

            {/* ( Optional Divider ) */}
            {formattedPublishDate ? infoDivider : null}
            {formattedPublishDate ? (
              <BodyText color="text.secondary">{formattedPublishDate}</BodyText>
            ) : null}
          </Box>
          {/* Children Count */}
          {showEpisodeCount ? (
            <H4 color="text.secondary" mr="xl">
              {childContentItems.length}{' '}
              {`Episode${childContentItems.length === 1 ? '' : 's'}`}
            </H4>
          ) : null}
          {htmlContent ? (
            <Longform dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
          ) : null}
        </Box>

        {hasChildContent ? (
          <Box mb="l">
            <H3 mb="xs">{props.feature.title}</H3>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridGap="20px"
            >
              {childContentItems?.map((item, index) => (
                <ContentCard
                  key={item.title}
                  image={item.coverImage}
                  title={item.title}
                  summary={item.summary}
                  onClick={() => handleActionPress(item)}
                />
              ))}
            </Box>
          </Box>
        ) : null}

        {/* Sub-Feature Feed */}
        {hasFeatures ? (
          <Box my="l">
            <FeatureFeed data={props.data?.featureFeed} />
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
    publishDate: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.shape({ embedHtml: PropTypes.string })),
  }),
  loading: PropTypes.bool,
};

export default ContentSingle;
