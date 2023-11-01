import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../utils';
import FeatureFeed from './FeatureFeed';
import FeatureFeedComponentMap from './FeatureFeed/FeatureFeedComponentMap';
import { add as addBreadcrumb, useBreadcrumbDispatch } from '../providers/BreadcrumbProvider';
import { set as setModal, useModal } from '../providers/ModalProvider';

import { Box, H1, H2, H4, Loader, Longform, H3, MediaItem, BodyText, ShareButton } from '../ui-kit';
import { useDescriptionHTML, useVideoMediaProgress } from '../hooks';
import VideoPlayer from './VideoPlayer';
import InteractWhenLoaded from './InteractWhenLoaded';

function InformationalContentSingle(props = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();
  const [state, dispatch] = useModal();
  const parseDescriptionHTML = useDescriptionHTML();

  const invalidPage = !props.loading && !props.data;

  // Video details
  const videoMedia = props.data?.videos[0];

  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress({
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
    parentChannel,
    childContentItemsConnection,
    siblingContentItemsConnection,
    featureFeed,
    publishDate: _publishDate,
  } = props?.data;

  const childContentItems = childContentItemsConnection?.edges;
  const siblingContentItems = siblingContentItemsConnection?.edges;
  const hasChildContent = childContentItems?.length > 0;
  const hasSiblingContent = siblingContentItems?.length > 0;
  const validFeatures = featureFeed?.features?.filter(
    feature => !!FeatureFeedComponentMap[feature?.__typename],
  );
  const hasFeatures = validFeatures?.length;
  const showEpisodeCount = hasChildContent && childContentItems.length < 20;

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
    if (searchParams.get('id') !== getURLFromType(item)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(item)}`,
          title: item.title,
        }),
      );
      setSearchParams(`?id=${getURLFromType(item)}`);
    }
    if (state.modal) {
      const url = getURLFromType(item);
      dispatch(setModal(url));
    }
  };

  return (
    <>
      {/* TODO: Max width set to 750px due to low resolution pictures. Can be increased as higher quality images are used */}
      <Box margin="0 auto" maxWidth="750px">
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" mb="base">
          <Box>
            <Box display="flex" justifyContent="center">
              {title ? <H2>{title}</H2> : null}
            </Box>

            <Box display="flex" flexDirection="row" width="100%" justifyContent="center">
              {/* TODO: Replace with author name if it gets passed in*/}
              {parentChannel.name ? (
                <BodyText color="text.secondary" mb={title && !hasChildContent ? 'xxs' : ''}>
                  {parentChannel.name}
                </BodyText>
              ) : null}

              {/* ( Optional Divider ) */}
              {formattedPublishDate ? infoDivider : null}
              {formattedPublishDate ? (
                <BodyText color="text.secondary">{formattedPublishDate}</BodyText>
              ) : null}
            </Box>
          </Box>
        </Box>
        <InteractWhenLoaded loading={props.loading} nodeId={id} action={'VIEW'} />
        <Box mb="base" borderRadius="xl" overflow="hidden" width="100%">
          {videoMedia ? (
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
              backgroundRepeat="no-repeat"
            />
          )}
        </Box>
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
            <Box
              mt={{
                _: 'xs',
                md: '0',
              }}
            >
              <ShareButton contentTitle={title} />
            </Box>
          </Box>

          {/* Children Count */}
          {showEpisodeCount ? (
            <H4 color="text.secondary" mr="l">
              {childContentItems.length} {`Episode${childContentItems.length === 1 ? '' : 's'}`}
            </H4>
          ) : null}
          {htmlContent ? (
            <>
              <Longform
                dangerouslySetInnerHTML={{
                  __html: parseDescriptionHTML(htmlContent),
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
              gridGap="30px"
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
        {/* Display content for sermons */}
        {hasSiblingContent ? (
          <Box mb="l">
            <H3 mb="xs">{props.feature?.title}</H3>
            <Box
              display="grid"
              gridGap="30px"
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

InformationalContentSingle.propTypes = {
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

export default InformationalContentSingle;
