import calculatePositionPxFromPercent from '../calculatePositionPxFromPercent';

describe('calculatePositionPxFromPercent', () => {
  const sliderWidth = 200;
  const handlerWidth = 30;

  it('should return correct result in all cases', () => {
    let positionPx;

    positionPx = calculatePositionPxFromPercent(sliderWidth, handlerWidth, 0);
    expect(positionPx).toBe(-15);

    positionPx = calculatePositionPxFromPercent(sliderWidth, handlerWidth, 10);
    expect(positionPx).toBe(5);

    positionPx = calculatePositionPxFromPercent(sliderWidth, handlerWidth, 50);
    expect(positionPx).toBe(85);

    positionPx = calculatePositionPxFromPercent(sliderWidth, handlerWidth, 100);
    expect(positionPx).toBe(185);
  });
});
