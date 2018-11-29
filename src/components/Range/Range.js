import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import throttle from 'lodash.throttle';
import Handle from './styled-components/Handle';
import Slider from './styled-components/Slider';
import SliderWrap from './styled-components/SliderWrap';
import {
  calculateHandlePosition,
  calculatePercentFromPositionPx,
  calculatePositionPxFromPercent,
} from './utils';

class Range extends Component {
  /* eslint-disable react/destructuring-assignment */
  state = {
    handlesPositions: this.props.initialValues.map((cur) =>
      calculatePositionPxFromPercent(undefined, cur)
    ),
    handlesPercent: this.props.initialValues,
  };
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
      this.sliderRef.current,
      e
    );
    const newHandlesPositions = handlesPositions.map(
      (cur, i) => (i === idx ? newHandlePosition : cur)
    );

    const newHandlePercent = calculatePercentFromPositionPx(
      undefined,
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
      <SliderWrap>
        <Slider innerRef={this.sliderRef}>
          {this.handles.map((cur, i) => (
            <Handle
              key={cur.key}
              style={{ left: `${handlesPositions[i]}px` }}
              onMouseDown={cur.handleMouseDown}
              onTouchStart={cur.handleTouchStart}
            />
          ))}
        </Slider>
      </SliderWrap>
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
