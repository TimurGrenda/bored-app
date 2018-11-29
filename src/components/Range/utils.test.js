import {
  calculateHandlePosition,
  calculatePositionPxFromPercent,
  calculatePercentFromPositionPx,
  getCoords,
} from './utils';

describe('Range utils', () => {
  describe('calculateHandlePosition', () => {
    it("should not fall below Slider's left edge coordinate", () => {
      const elem = {
        getBoundingClientRect: () => ({ top: 10, left: 10 }),
      };

      const event = {
        clientX: -100,
      };
      const position = calculateHandlePosition(elem, event);
      expect(position).toBeGreaterThanOrEqual(-15);
    });

    it("should not exceed Slider's right edge coordinate", () => {
      const elem = {
        getBoundingClientRect: () => ({ top: 10, left: 10 }),
      };

      const event = {
        clientX: 380,
      };
      const position = calculateHandlePosition(elem, event);
      expect(position).toBeLessThanOrEqual(265);
    });

    it('should calculate position correctly between left and right Slider edges', () => {
      let position;
      let event;
      const elem = {
        getBoundingClientRect: () => ({ top: 10, left: 10 }),
      };

      event = {
        clientX: 0,
      };
      position = calculateHandlePosition(elem, event);
      expect(position).toBe(-15);

      event = {
        clientX: 100,
      };
      position = calculateHandlePosition(elem, event);
      expect(position).toBe(75);

      event = {
        clientX: 200,
      };
      position = calculateHandlePosition(elem, event);
      expect(position).toBe(175);

      event = {
        clientX: 280,
      };
      position = calculateHandlePosition(elem, event);
      expect(position).toBe(255);
    });
  });
  describe('calculatePositionPxFromPercent', () => {
    it('should return correct result in all cases', () => {
      let positionPx;
      const sliderWidth = 200;

      positionPx = calculatePositionPxFromPercent(sliderWidth, 0);
      expect(positionPx).toBe(-15);

      positionPx = calculatePositionPxFromPercent(sliderWidth, 10);
      expect(positionPx).toBe(5);

      positionPx = calculatePositionPxFromPercent(sliderWidth, 50);
      expect(positionPx).toBe(85);

      positionPx = calculatePositionPxFromPercent(sliderWidth, 100);
      expect(positionPx).toBe(185);
    });
  });
  describe('calculatePercentFromPositionPx', () => {
    it('should return correct result in all cases', () => {
      let percent;
      const sliderWidth = 200;

      percent = calculatePercentFromPositionPx(sliderWidth, -15);
      expect(percent).toBe(0);

      percent = calculatePercentFromPositionPx(sliderWidth, 5);
      expect(percent).toBe(10);

      percent = calculatePercentFromPositionPx(sliderWidth, 85);
      expect(percent).toBe(50);

      percent = calculatePercentFromPositionPx(sliderWidth, 185);
      expect(percent).toBe(100);
    });
  });
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
});
