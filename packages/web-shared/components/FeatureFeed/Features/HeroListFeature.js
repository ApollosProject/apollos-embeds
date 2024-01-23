import React from 'react';
import { withTheme } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { getURLFromType } from '../../../utils';
import { open as openModal, set as setModal, useModal } from '../../../providers/ModalProvider';
import { add as addBreadcrumb, useBreadcrumbDispatch } from '../../../providers/BreadcrumbProvider';
import { Box, Button, H2, H4, systemPropTypes, ContentCard } from '../../../ui-kit';
import Styled from './HeroListFeature.styles';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../../../providers/AnalyticsProvider';

function HeroListFeature(props = {}) {
  const [state, dispatch] = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();
  const navigate = useNavigate();
  const analytics = useAnalytics();

  const handleActionPress = (item) => {
    if (item.action === 'OPEN_URL') {
      analytics.track('OpenUrl', {
        url: item?.relatedNode?.url,
      });      
      return window.open(getURLFromType(item.relatedNode), '_blank');
    }

    if (searchParams.get('id') !== getURLFromType(item.relatedNode)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(item.relatedNode)}`,
          title: item.relatedNode?.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(item.relatedNode)}`);
    }
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item.relatedNode)}`,
    });
  };

  // Event Handlers
  const handleHeroCardPress = () => {
    if (searchParams.get('id') !== getURLFromType(props.feature?.heroCard?.relatedNode)) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(props.feature?.heroCard?.relatedNode)}`,
          title: props.feature?.heroCard?.relatedNode?.title,
        })
      );
      setSearchParams(`?id=${getURLFromType(props.feature?.heroCard?.relatedNode)}`);
    }

    if (state.modal) {
      const url = getURLFromType(props.feature?.heroCard?.relatedNode);
      dispatch(setModal(url));
      dispatch(openModal());
    }
  };

  const handlePrimaryActionClick = () => {
    if (props.feature?.primaryAction?.action === 'OPEN_FEED') {
      analytics.track('OpenFeatureFeed', {
        featureFeedId: props.feature?.primaryAction?.relatedNode?.id,
        fromFeatureId: props.feature?.id,
        title: props.feature?.title,
      });
    }
    setSearchParams(`?id=${getURLFromType(props.feature.primaryAction.relatedNode)}`);
  };

  const actions = props.feature?.actions;

  return (
    <Box mb="base" minWidth="180px" {...props}>
      {/* Content */}
      <Box>
        {/* List Header */}
        {props.feature.title || props.feature.subtitle ? (
          <Box flexDirection="row" justifyContent="space-between" alignItems="flex-end" mb="s">
            <Box>
              <H4 color="text.secondary">{props.feature.subtitle}</H4>
              <H2>{props.feature.title}</H2>
            </Box>
          </Box>
        ) : null}
      </Box>
      {/* <Modal /> */}
      <Box
        position="relative"
        display="flex"
        backgroundColor="neutral.gray6"
        overflow="hidden"
        flexDirection={{ _: 'column', md: 'row' }}
        mb="l"
        borderRadius="l"
        cursor="pointer"
        onClick={handleHeroCardPress}
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
            src={props?.feature?.heroCard?.coverImage?.sources[0]?.uri}
            width="100%"
            height="auto"
          />
        </Box>
        {/* Masthead */}
        <Box
          width={{ _: 'auto', md: '40%' }}
          padding={{ _: 'base', md: 'none' }}
          backdropFilter="blur(64px)"
          display="flex"
          flexDirection="column"
          paddingTop={{ md: 'xl', lg: 'xxxl' }}
        >
          <Styled.Title>{props?.feature?.heroCard?.title}</Styled.Title>
          <Styled.Summary color="text.secondary">
            {props?.feature?.heroCard?.summary}
          </Styled.Summary>
        </Box>
      </Box>
      {props?.feature?.primaryAction?.relatedNode && actions.length !== 0 ? (
        <Box display="flex" justifyContent="flex-end">
          <Button
            title={props.feature?.primaryAction?.title}
            onClick={handlePrimaryActionClick}
            variant="link"
            alignSelf="flex-end"
          />
        </Box>
      ) : null}
      {/* Actions / Cards list */}
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        mt="xs"
        mb={{ _: '0', md: 'l' }}
      >
        {actions.length === 1 ? (
          <ContentCard
            key={actions[0].title}
            image={actions[0].image}
            title={actions[0].title}
            summary={actions[0].subtitle}
            onClick={() => handleActionPress(actions[0])}
            horizontal={true}
          />
        ) : (
          <Styled.Container length={actions.length}>
            {actions.map((item) => (
              <Styled.Item key={item.title}>
                <ContentCard
                  image={item.image}
                  title={item.title}
                  summary={item.subtitle}
                  onClick={() => handleActionPress(item)}
                />
              </Styled.Item>
            ))}
          </Styled.Container>
        )}
      </Box>
    </Box>
  );
}

HeroListFeature.propTypes = {
  ...systemPropTypes,
};

export default withTheme(HeroListFeature);
