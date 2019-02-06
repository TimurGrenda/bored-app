import { sortNumbersArrayAscending } from './sortNumbersArrayAscending';

export const countFilters = (
  priceRange,
  accessibilityRange,
  participants,
  activityType
) => {
  let filtersNumber = 0;
  const sortedPriceRange = sortNumbersArrayAscending(priceRange);
  const sortedAccessibilityRange = sortNumbersArrayAscending(
    accessibilityRange
  );

  if (sortedPriceRange[0] !== 0) filtersNumber += 1;
  if (sortedPriceRange[1] !== 100) filtersNumber += 1;

  if (sortedAccessibilityRange[0] !== 0) filtersNumber += 1;
  if (sortedAccessibilityRange[1] !== 100) filtersNumber += 1;

  if (participants !== null) filtersNumber += 1;

  if (activityType !== null) filtersNumber += 1;

  return filtersNumber;
};
