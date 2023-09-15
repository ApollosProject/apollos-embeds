import React from 'react';
import { withTheme } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { getURLFromType } from '../../../utils';
import {
  open as openModal,
  set as setModal,
  useModal,
} from '../../../providers/ModalProvider';
import {
  add as addBreadcrumb,
  useBreadcrumbDispatch,
} from '../../../providers/BreadcrumbProvider';

import {
  BodyText,
  Box,
  Button,
  H3,
  H4,
  systemPropTypes,
} from '../../../ui-kit';

function HeroListFeature(props = {}) {
  const [state, dispatch] = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();

  // Event Handlers
  const handleWatchNowPress = () => {
    if (
      searchParams.get('id') !==
      getURLFromType(props.feature?.heroCard?.relatedNode)
    ) {
      dispatchBreadcrumb(
        addBreadcrumb({
          url: `?id=${getURLFromType(props.feature?.heroCard?.relatedNode)}`,
          title: props.feature?.heroCard?.relatedNode?.title,
        })
      );
      setSearchParams(
        `?id=${getURLFromType(props.feature?.heroCard?.relatedNode)}`
      );
    }

    if (state.modal) {
      const url = getURLFromType(props.feature?.heroCard?.relatedNode);
      dispatch(setModal(url));
      dispatch(openModal());
    }
  };

  const handlePrimaryActionClick = () => {
    setSearchParams(
      `?id=${getURLFromType(props.feature.primaryAction.relatedNode)}`
    );
  };

  return (
    <Box mb="base" minWidth="180px" {...props}>
      {/* Content */}

      {/* <Modal /> */}
      <Box
        position="relative"
        backgroundColor="neutral.gray6"
        borderRadius="l"
        overflow="hidden"
      >
        {/* Image */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          width="100%"
          maxHeight="700px"
          overflow="hidden"
        >
          <Box
            as="img"
            src={props?.feature?.heroCard?.coverImage?.sources[0]?.uri}
            width="100%"
            height="100%"
          />
        </Box>
        {/* Masthead */}
        <Box
          padding="base"
          backgroundColor="neutral.gray6"
          backdrop-filter="blur(64px)"
        >
          <H3>{props?.feature?.heroCard?.title}</H3>
          <BodyText>{props?.feature?.heroCard?.summary}</BodyText>

          {/* CTAs */}
          <Box
            display="flex"
            alignSelf="flex-start"
            flexDirection={{
              _: 'column',
              md: 'row',
            }}
            mt="base"
          >
            <Button
              mr={{
                _: '0',
                md: 'base',
              }}
              mb={{
                _: 'base',
                md: '0',
              }}
              title="Watch now"
              onClick={handleWatchNowPress}
            />
            {props?.feature?.primaryAction?.relatedNode ? (
              <Button
                title={props.feature?.primaryAction?.title}
                onClick={handlePrimaryActionClick}
                variant="secondary"
              />
            ) : null}
          </Box>
        </Box>
        {/* Actions / Cards list */}
        {props.feature.actions?.length ? (
          <Box>
            {/* List Header */}
            {props.feature?.title || props.feature?.subtitle ? (
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
                mb="s"
                px="base"
              >
                <Box>
                  <H4 color="text.secondary">{props.feature?.subtitle}</H4>
                  <H3>{props.feature?.title}</H3>
                </Box>
              </Box>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

HeroListFeature.propTypes = {
  ...systemPropTypes,
};

export default withTheme(HeroListFeature);
