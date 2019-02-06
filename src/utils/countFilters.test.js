import { countFilters } from './countFilters';

describe('countFilters function', () => {
  it('should count priceRange', () => {
    expect(countFilters([0, 100], [0, 100], null, null)).toEqual(0);
    expect(countFilters([0, 80], [0, 100], null, null)).toEqual(1);
    expect(countFilters([20, 100], [0, 100], null, null)).toEqual(1);
    expect(countFilters([20, 80], [0, 100], null, null)).toEqual(2);

    expect(countFilters([100, 0], [0, 100], null, null)).toEqual(0);
    expect(countFilters([100, 20], [0, 100], null, null)).toEqual(1);
  });

  it('should count accessibilityRange', () => {
    expect(countFilters([0, 100], [0, 100], null, null)).toEqual(0);
    expect(countFilters([0, 100], [0, 80], null, null)).toEqual(1);
    expect(countFilters([0, 100], [20, 100], null, null)).toEqual(1);
    expect(countFilters([0, 100], [20, 80], null, null)).toEqual(2);

    expect(countFilters([0, 100], [100, 0], null, null)).toEqual(0);
    expect(countFilters([0, 100], [100, 20], null, null)).toEqual(1);
  });

  it('should count participants', () => {
    expect(countFilters([0, 100], [0, 100], null, null)).toEqual(0);
    expect(countFilters([0, 100], [0, 100], 3, null)).toEqual(1);
  });

  it('should count activityType', () => {
    expect(countFilters([0, 100], [0, 100], null, null)).toEqual(0);
    expect(countFilters([0, 100], [0, 100], null, 'activity')).toEqual(1);
  });

  it('should count everything together', () => {
    expect(countFilters([0, 100], [0, 100], null, null)).toEqual(0);
    expect(countFilters([0, 100], [0, 100], 1, null)).toEqual(1);
    expect(countFilters([20, 100], [0, 100], 1, null)).toEqual(2);
    expect(countFilters([20, 100], [0, 100], 1, 'activity')).toEqual(3);
    expect(countFilters([20, 70], [0, 100], 1, 'activity')).toEqual(4);
    expect(countFilters([20, 70], [20, 100], 1, 'activity')).toEqual(5);
    expect(countFilters([20, 70], [20, 80], 1, 'activity')).toEqual(6);
  });
});
