import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getURLFromType } from '../utils';
import { add as addBreadcrumb, useBreadcrumbDispatch } from '../providers/BreadcrumbProvider';
import { set as setModal, useModal } from '../providers/ModalProvider';

import { Box, H2, H5, Loader, Longform, H3, MediaItem, ShareButton } from '../ui-kit';
import { useParseDescription, useVideoMediaProgress } from '../hooks';
import VideoPlayer from './VideoPlayer';
import InteractWhenLoaded from './InteractWhenLoaded';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

function ContentSeriesSingle(props = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();
  const [state, dispatch] = useModal();
  const parseDescription = useParseDescription();

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
  const { coverImage, htmlContent, title, childContentItemsConnection } = props.data;

  const childContentItems = childContentItemsConnection?.edges;
  const hasChildContent = childContentItems?.length > 0;
  const showEpisodeCount = hasChildContent && childContentItems.length < 20;

  // Truncates text for long descriptions (can be adjusted by tweaking line-clamp and max-height values)
  const MultilineEllipsis = styled.p`
    @media screen and (min-width: ${themeGet('breakpoints.md')}) {
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-height: 500px;
    }
    line-height: 28px;
    margin: 0;
  `;

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
      <Box margin="0 auto">
        <InteractWhenLoaded loading={props.loading} nodeId={props.data.id} action={'VIEW'} />
        <Box
          display="flex"
          width="100%"
          flexDirection={{
            _: 'column',
            md: 'row',
          }}
        >
          <Box
            width={{
              _: '100%',
              md: '50%',
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box borderRadius="xl" overflow="hidden" width="100%">
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
                  backgroundRepeat="no-repeat"
                />
              )}
            </Box>
          </Box>
          <Box
            width={{
              _: '100%',
              md: '50%',
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            px={{
              _: '0',
              md: 'xs',
            }}
            ml={{
              _: '0',
              md: 'base',
            }}
            mt={{
              _: 'base',
              md: '0',
            }}
          >
            <Box mb="xs">
              {title ? <H2>{title}</H2> : null}
              {showEpisodeCount ? (
                <H5 color="text.secondary" mr="l">
                  {childContentItems.length} {`Episode${childContentItems.length === 1 ? '' : 's'}`}
                </H5>
              ) : null}
            </Box>
            {htmlContent ? (
              <Box mb="xs">
                <MultilineEllipsis>
                  <Longform
                    dangerouslySetInnerHTML={{
                      __html: parseDescription(htmlContent),
                    }}
                  />
                </MultilineEllipsis>
              </Box>
            ) : null}
            <ShareButton contentTitle={title} />
          </Box>
        </Box>
        <Box width="100%" borderTop="1px solid" borderColor="neutral.gray5" my="base"></Box>

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
              {childContentItems?.map(item => (
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
      </Box>
    </>
  );
}

ContentSeriesSingle.propTypes = {
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

export default ContentSeriesSingle;
