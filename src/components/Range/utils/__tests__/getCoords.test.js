import getCoords from '../getCoords';

describe('getCoords', () => {
  it('should return correct result', () => {
    const elem = {
      getBoundingClientRect: () => ({ top: 10, left: 10 }),
    };

    window.pageXOffset = 0;
    window.pageYOffset = 0;
    expect(getCoords(elem)).toEqual({ top: 10, left: 10 });

    window.pageXOffset = 10;
    window.pageYOffset = 10;
    expect(getCoords(elem)).toEqual({ top: 20, left: 20 });
  });
});
