import React from 'react';
import {
  ContentItemProvider,
  FeatureFeedProvider,
  ContentFeedProvider,
} from '../providers';
import {
  ContentSingle,
  FeatureFeedList,
  ContentChannel,
  LivestreamSingle,
  Breadcrumbs,
  Modal,
} from '../components';
import { useModalState } from '../providers/ModalProvider';
import { Box } from '../ui-kit';
import { useSearchParams } from 'react-router-dom';
import { parseSlugToIdAndType } from '../utils';

function RenderFeatures(props) {
  const [searchParams] = useSearchParams();
  const _id = searchParams.get('id');
  const {type, randomId} = parseSlugToIdAndType(_id) ?? {};

  switch (type) {
    case 'EventContentItem':
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'UniversalContentItem': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return (
        <ContentItemProvider Component={ContentSingle} options={options} />
      );
    }
    case 'ContentSeriesContentItem': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return (
        <ContentItemProvider
          Component={ContentSeriesSingle}
          options={options}
        />
      );
    }
    case 'Livestream': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return (
        <ContentItemProvider Component={LivestreamSingle} options={options} />
      );
    }
    case 'ContentChannel': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };
      return (
        <ContentFeedProvider Component={ContentChannel} options={options} />
      );
    }
    case 'Url': {
      return <h1>External Url</h1>;
    }
    case 'FeatureFeed': {
      const options = {
        variables: { itemId: `${type}:${randomId}` },
      };
      return (
        <FeatureFeedProvider Component={FeatureFeedList} options={options} />
      );
    }
    default: {
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
  }
}

const FeatureFeed = (props) => {
  const state = useModalState();

  return (
    <Box>
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
          <Breadcrumbs />
          <RenderFeatures {...props} />
        </>
      )}
    </Box>
  );
};

FeatureFeed.propTypes = {};

export default FeatureFeed;
