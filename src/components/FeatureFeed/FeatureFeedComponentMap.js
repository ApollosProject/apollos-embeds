import {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  VerticalCardListFeature,
  ButtonFeature,
  VerticalResourceCardListFeature,
} from './Features';

// Maps a graphql "__typename" to a Component to render it.
const FeatureFeedComponentMap = {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  VerticalCardListFeature,
  ButtonFeature,
  VerticalResourceCardListFeature,
};

export default FeatureFeedComponentMap;
