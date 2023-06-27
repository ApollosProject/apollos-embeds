import PropTypes from 'prop-types';

// :: Core
// ------------------------------------------------------------

// interface Node
const NodePropTypes = {
  __typename: PropTypes.string,
  id: PropTypes.string,
};
export const Node = PropTypes.shape(NodePropTypes);

// type ImageMedia implements Media
export const ImageMedia = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string,
      uri: PropTypes.string,
    })
  ),
});

// type VideoMediaSource implements MediaSource
export const VideoMediaSource = PropTypes.shape({
  __typename: PropTypes.string,
  uri: PropTypes.string,
});

// type MediaUserProgress
export const MediaUserProgress = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  playhead: PropTypes.number,
  complete: PropTypes.bool,
});

// type VideoMedia implements Media
export const VideoMedia = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  key: PropTypes.string,
  sources: PropTypes.arrayOf(VideoMediaSource),
  userProgress: MediaUserProgress,
  embedHtml: PropTypes.string,
});

// :: Feature Feeds
// ------------------------------------------------------------

// interface Feature
const FeaturePropTypes = {
  __typename: PropTypes.string,
  id: PropTypes.string,
  order: PropTypes.number,
};
export const Feature = PropTypes.shape(FeaturePropTypes);

// type FeatureFeed implements Node
export const FeatureFeed = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  features: PropTypes.arrayOf(Feature),
});

// type FeatureAction
export const FeatureAction = PropTypes.shape({
  __typename: PropTypes.string,
  relatedNode: Node,
  action: PropTypes.string,
  title: PropTypes.string,
});

// type CardListItem
export const CardListItem = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  hasAction: PropTypes.bool,
  actionIcon: PropTypes.string,
  labelText: PropTypes.string,
  summary: PropTypes.string,
  coverImage: ImageMedia,
  title: PropTypes.string,
  relatedNode: Node,
  action: PropTypes.string,
});

// type ActionListAction
export const ActionListAction = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: ImageMedia,
  relatedNode: Node,
  action: PropTypes.string,
});

// :: Features
// ------------------------------------------------------------

// type ButtonFeature implements Feature, Node
export const ButtonFeature = PropTypes.shape({
  ...FeaturePropTypes,
  ...NodePropTypes,
  action: FeatureAction,
});

// type HeroListFeature implements Feature, Node
export const HeroListFeature = PropTypes.shape({
  ...FeaturePropTypes,
  ...NodePropTypes,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.arrayOf(ActionListAction),
  heroCard: CardListItem,
  primaryAction: FeatureAction,
});

// type HorizontalCardListFeature implements Feature, Node
export const HorizontalCardListFeature = PropTypes.shape({
  ...FeaturePropTypes,
  ...NodePropTypes,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  cards: PropTypes.arrayOf(CardListItem),
  primaryAction: FeatureAction,
});
