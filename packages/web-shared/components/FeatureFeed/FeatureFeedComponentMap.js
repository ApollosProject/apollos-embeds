import {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  HtmlFeature,
  VerticalCardListFeature,
  ButtonFeature,
  ActionBarFeature,
  ActionListFeature,
  ChipListFeature,
  EventBlockFeature,
  PrayerListFeature,
  ScriptureFeature,
} from './Features';

// Maps a graphql "__typename" to a Component to render it.
const FeatureFeedComponentMap = {
  HeroListFeature,
  HorizontalCardListFeature,
  HorizontalMediaListFeature,
  HtmlFeature,
  VerticalCardListFeature,
  ButtonFeature,
  ActionBarFeature,
  ActionListFeature,
  ChipListFeature,
  EventBlockFeature,
  PrayerListFeature,
  ScriptureFeature,
};

export default FeatureFeedComponentMap;
