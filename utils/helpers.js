import THRESHOLDS, { INACTIVE } from '@/constants/thresholds';

export const getIndicatorLevel = (metric, value) => {
  if (!value) {
    return INACTIVE;
  }
  return THRESHOLDS.reduce((prev, curr) => {
    if (value > curr[metric]) {
      return curr;
    }
    return prev;
  }, THRESHOLDS[0]);
};

export const dateToTime = date => {
  return new Date(date).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const getCssPxProp = property => {
  const style = getComputedStyle(document.body);

  return parseInt(style.getPropertyValue(property).replace('px', '')) || 0;
};
