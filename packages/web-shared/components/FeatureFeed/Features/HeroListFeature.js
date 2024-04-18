import React from 'react';
import { withTheme } from 'styled-components';
import { getURLFromType } from '../../../utils';
import { open as openModal, set as setModal, useModal } from '../../../providers/ModalProvider';
import { Box, Button, H2, H4, systemPropTypes, ContentCard } from '../../../ui-kit';
import Styled from './HeroListFeature.styles';
import { useNavigation } from '../../../providers/NavigationProvider';
import useHandleActionPress, {
  useHandlePrimaryActionPress,
} from '../../../hooks/useHandleActionPress';

function HeroListFeature(props = {}) {
  const [state, dispatch] = useModal();

  const { id, navigate } = useNavigation();

  const handleActionPress = useHandleActionPress();
  const handlePrimaryActionClick = useHandlePrimaryActionPress(props.feature);

  // Event Handlers
  const handleHeroCardPress = () => {
    if (id !== getURLFromType(props.feature?.heroCard?.relatedNode)) {
      navigate({
        id: getURLFromType(props.feature?.heroCard?.relatedNode),
      });
    }

    if (state.modal) {
      const url = getURLFromType(props.feature?.heroCard?.relatedNode);
      dispatch(setModal(url));
      dispatch(openModal());
    }
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
          {props?.feature?.heroCard?.relatedNode?.parentItem?.title ? (
            <Styled.ChannelLabel color="text.secondary">
              {props?.feature?.heroCard?.relatedNode?.parentItem?.title}
            </Styled.ChannelLabel>
          ) : null}
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
