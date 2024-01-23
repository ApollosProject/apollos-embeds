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
  ScriptureFeature,
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
  ScriptureFeature,
};

export default FeatureFeedComponentMap;
