import React from 'react';
import { shallow, mount } from 'enzyme';
import Range from './Range';
import SliderWrap from './styled-components/SliderWrap';
import Slider from './styled-components/Slider';
import Handle from './styled-components/Handle';
import { calculatePositionPxFromPercent } from './utils';

describe('Range', () => {
  describe('visual', () => {
    let root;
    let handles;
    let sliders;
    let sliderWraps;
    const initialValues = [0, 20, 50, 100];

    beforeEach(() => {
      root = shallow(<Range initialValues={initialValues} />);
      sliderWraps = root.find(SliderWrap);
      sliders = sliderWraps.find(Slider);
      handles = sliders.find(Handle);
    });

    it('should render Handles inside Slider inside SliderWrap', () => {
      expect(sliderWraps.exists()).toBe(true);
      expect(sliders.exists()).toBe(true);
      expect(handles.exists()).toBe(true);
    });

    it('should render correct number of Handles', () => {
      expect(handles).toHaveLength(4);

      root = shallow(<Range initialValues={[50]} />);
      expect(root.find(Handle)).toHaveLength(1);

      root = shallow(<Range initialValues={[50, 70]} />);
      expect(root.find(Handle)).toHaveLength(2);
    });

    it('should render Handles in correct positions when provided with initial values', () => {
      initialValues.forEach((value, idx) => {
        const expectedValue = `${calculatePositionPxFromPercent(
          undefined,
          value
        )}px`;
        expect(handles.at(idx).prop('style')).toHaveProperty(
          'left',
          expectedValue
        );
      });
    });
  });

  describe('functional', () => {
    let root;
    const initialValues = [0, 20, 50, 100];

    const getHandleByIndex = (idx) => root.find(Handle).at(idx);

    beforeEach(() => {
      root = mount(<Range initialValues={initialValues} />);
    });

    const dragHandle = (handle, destinationClientX) => {
      handle.simulate('mousedown', { clientX: 0 });

      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: destinationClientX,
      });
      document.dispatchEvent(mouseMoveEvent);

      const mouseUpEvent = new MouseEvent('mouseup', {
        clientX: destinationClientX,
      });
      document.dispatchEvent(mouseUpEvent);
    };

    it('should call mouseDown/touchStart handler', () => {
      root.instance().handles = initialValues.map((_, i) => ({
        handleMouseDown: jest.fn(),
        handleTouchStart: jest.fn(),
        key: i,
      }));
      root.instance().forceUpdate();
      root.update();

      getHandleByIndex(0).simulate('mousedown');
      expect(root.instance().handles[0].handleMouseDown).toHaveBeenCalled();
      expect(
        root.instance().handles[0].handleTouchStart
      ).not.toHaveBeenCalled();

      getHandleByIndex(1).simulate('touchstart');
      expect(root.instance().handles[1].handleTouchStart).toHaveBeenCalled();
      expect(root.instance().handles[1].handleMouseDown).not.toHaveBeenCalled();
    });

    it('should add and remove event listeners for touch/mouse events', () => {
      const adder = jest.spyOn(document, 'addEventListener');
      const remover = jest.spyOn(document, 'removeEventListener');

      dragHandle(getHandleByIndex(0), 100);

      expect(adder).toHaveBeenCalledTimes(2);
      expect(remover).toHaveBeenCalledTimes(2);

      dragHandle(getHandleByIndex(0), 150);

      expect(adder).toHaveBeenCalledTimes(4);
      expect(remover).toHaveBeenCalledTimes(4);
    });

    it('should apply correct style to one Handle when dragged', () => {
      root = mount(<Range initialValues={[50]} />);

      dragHandle(getHandleByIndex(0), 100);
      root.update();

      expect(getHandleByIndex(0).prop('style')).toHaveProperty('left', '85px');
    });

    it('should apply correct style to multiple Handles when dragged', () => {
      root = mount(<Range initialValues={[10, 50, 100]} />);

      dragHandle(getHandleByIndex(0), 100);
      root.update();
      expect(getHandleByIndex(0).prop('style')).toHaveProperty('left', '85px');

      dragHandle(getHandleByIndex(1), 110);
      root.update();
      expect(getHandleByIndex(1).prop('style')).toHaveProperty('left', '95px');

      dragHandle(getHandleByIndex(2), 120);
      root.update();
      expect(getHandleByIndex(2).prop('style')).toHaveProperty('left', '105px');
    });

    it('should call onChange prop with new set of positions in percent', () => {
      const onChange = jest.fn();
      root = mount(<Range initialValues={[10, 50, 100]} onChange={onChange} />);
      expect(onChange).toHaveBeenCalledTimes(0);

      dragHandle(getHandleByIndex(0), 100);
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should call onChange prop with correct value', () => {
      const onChange = jest.fn();
      root = mount(<Range initialValues={[10, 50, 100]} onChange={onChange} />);
      dragHandle(getHandleByIndex(0), 100);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(1, [0, 50, 100]);
      expect(onChange).toHaveBeenNthCalledWith(2, [
        35.714285714285715,
        50,
        100,
      ]);
    });
  });
});
