import { getURLFromType } from '../utils';

import { open as openModal, set as setModal, useModal } from '../providers/ModalProvider';
import { useAnalytics } from '../providers/AnalyticsProvider';
import { useNavigation } from '../providers/NavigationProvider';

export const useHandleActionPress = () => {
  const [state, dispatch] = useModal();
  const analytics = useAnalytics();
  const { navigate, id } = useNavigation();

  return (item) => {
    if (item.action === 'OPEN_URL') {
      analytics.track('OpenUrl', {
        url: item?.relatedNode?.url,
      });
      return window.open(getURLFromType(item.relatedNode), '_blank');
    }

    if (id !== getURLFromType(item.relatedNode)) {
      navigate({ id: getURLFromType(item.relatedNode) });
    }
    if (state.modal) {
      const url = getURLFromType(item.relatedNode);
      dispatch(setModal(url));
      dispatch(openModal());
    }
  };
};

export const useHandlePrimaryActionPress = ({ title, primaryAction, id }) => {
  const analytics = useAnalytics();
  const { navigate, id: navId } = useNavigation();
  return () => {
    if (navId !== getURLFromType(primaryAction.relatedNode)) {
      const primaryActionId = getURLFromType(primaryAction.relatedNode);

      if (primaryAction?.action === 'OPEN_FEED') {
        analytics.track('OpenFeatureFeed', {
          featureFeedId: primaryAction?.relatedNode?.id,
          fromFeatureId: id,
          title: title,
        });
      }

      navigate({ id: primaryActionId });
    }
  };
};

export default useHandleActionPress;
