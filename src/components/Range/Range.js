import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import * as SC from './styled-components';
import getCoords from './utils/getCoords';
import calculateHandlePosition from './utils/calculateHandlePosition';
import calculatePercentFromPositionPx from './utils/calculatePercentFromPositionPx';
import calculatePositionPxFromPercent from './utils/calculatePositionPxFromPercent';
import getElementOffsetWidth from './utils/getElementOffsetWidth';

class Range extends PureComponent {
  componentDidMount() {
    this.measureElements();
    this.forceUpdate();

    window.addEventListener('resize', this.debouncedMeasureElements);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedMeasureElements);
  }

  measureElements = () => {
    this.sliderCoords = getCoords(this.sliderRef.current);
    this.sliderWidth = getElementOffsetWidth(this.sliderRef.current);
    this.handlerWidth = getElementOffsetWidth(this.lastHandlerRef.current);
  };

  createSliderEventHandler = (idx, moveEvent, endEvent) => {
    const handleMoveEvent = (e) => this.updateHandlePosition(idx, e);

    const handleStartEvent = (e) => {
      e.preventDefault();
      this.updateHandlePosition(idx, e);

      document.addEventListener(moveEvent, handleMoveEvent);
      document.addEventListener(endEvent, function removeListeners() {
        document.removeEventListener(moveEvent, handleMoveEvent);
        document.removeEventListener(endEvent, removeListeners);
      });
    };

    return handleStartEvent;
  };

  updateHandlePosition = (idx, e) => {
    const { values: handlesPercent } = this.props;
    const { onChange } = this.props;

    const newHandlePosition = calculateHandlePosition(
      this.sliderCoords,
      this.sliderWidth,
      this.handlerWidth,
      e
    );

    const newHandlePercent = calculatePercentFromPositionPx(
      this.sliderWidth,
      this.handlerWidth,
      newHandlePosition
    );
    const newHandlesPercents = handlesPercent.map(
      (cur, i) => (i === idx ? newHandlePercent : cur)
    );

    onChange(newHandlesPercents);
  };

  calculateHandlesPositions = (handlesPercent) =>
    handlesPercent.map((cur) =>
      calculatePositionPxFromPercent(this.sliderWidth, this.handlerWidth, cur)
    );

  debouncedMeasureElements = debounce(this.measureElements, 250);

  sliderRef = React.createRef();

  lastHandlerRef = React.createRef();

  /* eslint-disable-next-line react/destructuring-assignment */
  handles = this.props.values.map((_, i) => {
    const handleMouseDown = this.createSliderEventHandler(
      i,
      'mousemove',
      'mouseup'
    );
    const handleTouchStart = this.createSliderEventHandler(
      i,
      'touchmove',
      'touchend'
    );

    return {
      handleMouseDown,
      handleTouchStart,
      key: i,
    };
  });

  render() {
    const { values } = this.props;

    const handlesPositions = this.calculateHandlesPositions(values);

    return (
      <SC.SliderWrap>
        <SC.Slider innerRef={this.sliderRef}>
          {this.handles.map((cur, i) => (
            <SC.Handle
              key={cur.key}
              style={{ left: `${handlesPositions[i]}px` }}
              onMouseDown={cur.handleMouseDown}
              onTouchStart={cur.handleTouchStart}
              innerRef={this.lastHandlerRef}
            />
          ))}
        </SC.Slider>
      </SC.SliderWrap>
    );
  }
}

Range.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Range;
