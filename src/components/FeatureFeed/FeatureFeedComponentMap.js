import {
  HeroListFeature,
  HorizontalCardListFeature,
  VerticalCardListFeature,
  ButtonFeature,
} from './Features';

// Maps a graphql "__typename" to a Component to render it.
const FeatureFeedComponentMap = {
  HeroListFeature,
  HorizontalCardListFeature,
  VerticalCardListFeature,
  ButtonFeature,
};

export default FeatureFeedComponentMap;
