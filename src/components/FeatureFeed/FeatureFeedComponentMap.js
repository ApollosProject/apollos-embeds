import {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  VerticalCardListFeature,
  ButtonFeature,
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
  ActionListFeature,
  ChipListFeature,
};

export default FeatureFeedComponentMap;
