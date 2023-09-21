import {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  VerticalCardListFeature,
  ButtonFeature,
  ActionBarFeature,
  ActionListFeature,
  ChipListFeature,
  PrayerListFeature,
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
  PrayerListFeature,
};

export default FeatureFeedComponentMap;
