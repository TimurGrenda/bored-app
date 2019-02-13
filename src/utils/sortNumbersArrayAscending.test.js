import { sortNumbersArrayAscending } from './sortNumbersArrayAscending';

describe('sortNumbersArrayAscending', () => {
  it('should return sorted array', () => {
    expect(sortNumbersArrayAscending([1, 3])).toEqual([1, 3]);
    expect(sortNumbersArrayAscending([6, 3])).toEqual([3, 6]);
    expect(sortNumbersArrayAscending([6, 3, -5, 9])).toEqual([-5, 3, 6, 9]);
  });

  it('should not modify array', () => {
    const initialArray = [6, 3];
    sortNumbersArrayAscending(initialArray);
    expect(initialArray).toEqual([6, 3]);
  });

  it('should return new array', () => {
    const initialArray = [6, 3];
    const result = sortNumbersArrayAscending(initialArray);

    expect(result).not.toBe(initialArray);
  });
});
