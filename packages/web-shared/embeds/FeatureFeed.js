import React, { useEffect } from 'react';
import { ContentItemProvider, FeatureFeedProvider, ContentFeedProvider } from '../providers';
import {
  ContentSingle,
  FeatureFeedList,
  ContentChannel,
  LivestreamSingle,
  Breadcrumbs,
  Modal,
  ContentSeriesSingle,
} from '../components';
import { useModalState } from '../providers/ModalProvider';
import { Box } from '../ui-kit';
import { useSearchParams } from 'react-router-dom';
import { parseSlugToIdAndType } from '../utils';
import { useAnalytics } from '../providers/AnalyticsProvider';
import { getComponentFromType } from '../utils/getContentFromURL';

function RenderFeatures({ featureFeed, nodeId, ...props }) {
  const [searchParams] = useSearchParams();
  let _id = searchParams.get('id');

  const { type, randomId } = parseSlugToIdAndType(_id) ?? {};

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

const FeatureFeed = ({ featureFeed, ...props }) => {
  const state = useModalState();

  const analytics = useAnalytics();

  console.log('render feature feed');

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
            featureFeed={props.featureFeed}
            {...props}
          />
        </Box>
      ) : (
        <>
          <Breadcrumbs />
          <RenderFeatures {...props} featureFeed={props.featureFeed} />
        </>
      )}
    </Box>
  );
};

FeatureFeed.propTypes = {};

export default FeatureFeed;
