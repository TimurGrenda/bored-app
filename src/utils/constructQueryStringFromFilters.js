import qs from 'qs';

const getMinValueForQuery = (array) => {
  const min = Math.min(...array);
  if (min !== 0) {
    return (min / 100).toFixed(2);
  }
  return null;
};

const getMaxValueForQuery = (array) => {
  const max = Math.max(...array);
  if (max !== 100) {
    return (max / 100).toFixed(2);
  }
  return null;
};

export const constructQueryStringFromFilters = (
  priceRange,
  accessibilityRange,
  participants,
  activityType
) =>
  qs.stringify(
    {
      minprice: getMinValueForQuery(priceRange),
      maxprice: getMaxValueForQuery(priceRange),
      minaccessibility: getMinValueForQuery(accessibilityRange),
      maxaccessibility: getMaxValueForQuery(accessibilityRange),
      participants,
      type: activityType,
    },
    {
      skipNulls: true,
      addQueryPrefix: true,
    }
  );
