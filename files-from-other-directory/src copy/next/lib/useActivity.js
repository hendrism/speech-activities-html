import { useMemo } from 'react';
import { getActivity } from './registry';

export const useActivity = (activityId) => {
  return useMemo(() => ({
    activity: activityId ? getActivity(activityId) : null,
  }), [activityId]);
};
