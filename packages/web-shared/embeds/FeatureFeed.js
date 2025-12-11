import React, { useEffect } from 'react';

import { FeatureFeedList, Modal } from '../components';
import { FeatureFeedProvider } from '../providers';
import { useAnalytics } from '../providers/AnalyticsProvider';
import { useModalState } from '../providers/ModalProvider';
import { useNavigation } from '../providers/NavigationProvider';
import { Box } from '../ui-kit';
import { parseSlugToIdAndType } from '../utils';
import { getComponentFromType } from '../utils/getContentFromURL';

function RenderFeatures(props) {
  const { id } = useNavigation();
  const { type, randomId } = parseSlugToIdAndType(id) ?? {};

  const Component = getComponentFromType({ type, id: randomId });

  if (Component) {
    return Component;
  }

  // If not component is found, fallback to a FeatureFeed
  return (
    <Box>
      <FeatureFeedProvider
        Component={FeatureFeedList}
        options={{
          variables: {
            itemId: props.featureFeed,
          },
        }}
        {...props}
      />
    </Box>
  );
}

const FeatureFeed = (props) => {
  const state = useModalState();

  const analytics = useAnalytics();

  useEffect(() => {
    analytics.track('ViewFeatureFeed', {
      featureFeedId: props.featureFeed,
    });
  }, []);

  return (
    <Box className="feature-feed">
      {state.modal ? (
        <Box>
          <Modal />
          <FeatureFeedProvider
            Component={FeatureFeedList}
            options={{
              variables: {
                itemId: props.featureFeed,
              },
            }}
            {...props}
          />
        </Box>
      ) : (
        <>
          <RenderFeatures {...props} />
        </>
      )}
    </Box>
  );
};

FeatureFeed.propTypes = {};

export default FeatureFeed;
