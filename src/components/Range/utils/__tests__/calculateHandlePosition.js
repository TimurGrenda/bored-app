import calculateHandlePosition from '../calculateHandlePosition';

describe('calculateHandlePosition', () => {
  const sliderWidth = 280;
  const handlerWidth = 30;

  it("should not fall below Slider's left edge coordinate", () => {
    const sliderCoords = {
      left: 10,
      top: 10,
    };

    const event = {
      clientX: -100,
    };
    const position = calculateHandlePosition(
      sliderCoords,
      sliderWidth,
      handlerWidth,
      event
    );
    expect(position).toBeGreaterThanOrEqual(-15);
  });

  it("should not exceed Slider's right edge coordinate", () => {
    const sliderCoords = {
      left: 10,
      top: 10,
    };

    const event = {
      clientX: 380,
    };
    const position = calculateHandlePosition(
      sliderCoords,
      sliderWidth,
      handlerWidth,
      event
    );
    expect(position).toBeLessThanOrEqual(265);
  });

  it('should calculate position correctly between left and right Slider edges', () => {
    let position;
    let event;

    const sliderCoords = {
      left: 10,
      top: 10,
    };

    event = {
      clientX: 0,
    };
    position = calculateHandlePosition(
      sliderCoords,
      sliderWidth,
      handlerWidth,
      event
    );
    expect(position).toBe(-15);

    event = {
      clientX: 100,
    };
    position = calculateHandlePosition(
      sliderCoords,
      sliderWidth,
      handlerWidth,
      event
    );
    expect(position).toBe(75);

    event = {
      clientX: 200,
    };
    position = calculateHandlePosition(
      sliderCoords,
      sliderWidth,
      handlerWidth,
      event
    );
    expect(position).toBe(175);

    event = {
      clientX: 280,
    };
    position = calculateHandlePosition(
      sliderCoords,
      sliderWidth,
      handlerWidth,
      event
    );
    expect(position).toBe(255);
  });
});
