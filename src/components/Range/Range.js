import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SC from './styled-components';
import getCoords from './utils/getCoords';
import calculateHandlePosition from './utils/calculateHandlePosition';
import calculatePercentFromPositionPx from './utils/calculatePercentFromPositionPx';
import calculatePositionPxFromPercent from './utils/calculatePositionPxFromPercent';
import getSliderWidth from './utils/getElementOffsetWidth';

class Range extends Component {
  /* eslint-disable react/destructuring-assignment */
  state = {
    handlesPositions: [],
    handlesPercent: this.props.initialValues,
  };

  componentDidMount() {
    this.sliderCoords = getCoords(this.sliderRef.current);
    this.sliderWidth = getSliderWidth(this.sliderRef.current);
    this.handlerWidth = getSliderWidth(this.lastHandlerRef.current);

    const handlesPositions = this.props.initialValues.map((cur) =>
      calculatePositionPxFromPercent(this.sliderWidth, this.handlerWidth, cur)
    );

    this.setState({ handlesPositions });
  }

  /* eslint-enable react/destructuring-assignment */

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
    const { handlesPositions, handlesPercent } = this.state;
    const { onChange } = this.props;

    const newHandlePosition = calculateHandlePosition(
      this.sliderCoords,
      this.sliderWidth,
      this.handlerWidth,
      e
    );
    const newHandlesPositions = handlesPositions.map(
      (cur, i) => (i === idx ? newHandlePosition : cur)
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
    this.setState({
      handlesPositions: newHandlesPositions,
      handlesPercent: newHandlesPercents,
    });
  };

  sliderRef = React.createRef();

  lastHandlerRef = React.createRef();

  /* eslint-disable react/destructuring-assignment */
  handles = this.props.initialValues.map((_, i) => {
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
  /* eslint-enable react/destructuring-assignment */

  render() {
    const { handlesPositions } = this.state;

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
  onChange: PropTypes.func,
  initialValues: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Range.defaultProps = {
  onChange: () => {},
};
export default Range;
