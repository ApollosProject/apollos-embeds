import {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  VerticalCardListFeature,
  ButtonFeature,
  ActionBarFeature,
  ActionListFeature,
  ChipListFeature,
} from './Features';

// Maps a graphql "__typename" to a Component to render it.
const FeatureFeedComponentMap = {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  VerticalCardListFeature,
  ButtonFeature,
  ActionBarFeature,
  ActionListFeature,
  ChipListFeature,
};

export default FeatureFeedComponentMap;
