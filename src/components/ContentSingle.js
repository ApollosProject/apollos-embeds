import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import { useNavigate } from 'react-router-dom';

import { getURLFromType } from '../utils';
import FeatureFeed from './FeatureFeed';
import {
  Box,
  H2,
  H4,
  Loader,
  Longform,
  utils,
  H3,
  ContentCard,
  BodyText,
} from '../ui-kit';
import VideoPlayer from './VideoPlayer';

function ContentSingle(props = {}) {
  const navigate = useNavigate();

  const invalidPage = !props.loading && !props.data;

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

  const coverImage = props?.data?.coverImage;
  const edges = props?.data?.childContentItemsConnection?.edges;
  const htmlContent = props?.data?.htmlContent;
  const summary = props?.data?.summary;
  const title = props?.data?.title;
  const publishDate = new Date(parseInt(props?.data?.publishDate));

  const formatedPublishDate = props?.data?.publishDate
    ? format(
        addMinutes(publishDate, publishDate.getTimezoneOffset()),
        'MMMM do, yyyy'
      )
    : null;

  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  return (
    <>
      <Box width="750px" margin="0 auto">
        <Box mb="base">
          {props.data?.videos[0] ? (
            <VideoPlayer
              videos={props.data?.videos[0]}
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
          {title ? <H2 mb="xxxs">{title}</H2> : null}
          {formatedPublishDate ? (
            <BodyText color="text.secondary" mb="s">
              {formatedPublishDate}
            </BodyText>
          ) : null}
          {htmlContent ? (
            <Longform dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
          ) : null}
        </Box>

        {edges?.length > 0 ? (
          <Box mb="l">
            <H3 mb="xs">{props.feature.title}</H3>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridGap="20px"
            >
              {props.feature?.cards?.map((item, index) => (
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

        {props.data?.featureFeed?.features.length > 0 ? (
          <FeatureFeed data={props?.data?.featureFeed} />
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
