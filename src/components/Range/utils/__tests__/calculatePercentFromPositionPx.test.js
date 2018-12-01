import calculatePercentFromPositionPx from '../calculatePercentFromPositionPx';

describe('calculatePercentFromPositionPx', () => {
  const sliderWidth = 200;
  const handlerWidth = 30;

  it('should return correct result in all cases', () => {
    let percent;

    percent = calculatePercentFromPositionPx(sliderWidth, handlerWidth, -15);
    expect(percent).toBe(0);

    percent = calculatePercentFromPositionPx(sliderWidth, handlerWidth, 5);
    expect(percent).toBe(10);

    percent = calculatePercentFromPositionPx(sliderWidth, handlerWidth, 85);
    expect(percent).toBe(50);

    percent = calculatePercentFromPositionPx(sliderWidth, handlerWidth, 185);
    expect(percent).toBe(100);
  });
});
