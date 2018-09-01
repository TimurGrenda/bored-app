import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import Handle from './styled-components/Handle';
import Slider from './styled-components/Slider';
import SliderWrap from './styled-components/SliderWrap';
import { calculateHandlePosition, calculatePercent, calculatePosition } from './utils';

class Range extends Component {
  /* eslint-disable react/destructuring-assignment */
  state = {
    handlesPositions: this.props.initialValues.map((cur) => calculatePosition(undefined, cur)),
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

  updateHandlePosition = throttle((idx, e) => {
    const { handlesPositions, handlesPercent } = this.state;
    const { onChange } = this.props;

    const newHandlePosition = calculateHandlePosition(this.sliderRef.current, e);
    const newHandlesPositions = handlesPositions.map((cur, i) => (i === idx ? newHandlePosition : cur));

    const newHandlePercent = calculatePercent(undefined, newHandlePosition);
    const newHandlesPercents = handlesPercent.map((cur, i) => (i === idx ? newHandlePercent : cur));

    onChange(newHandlesPercents);
    this.setState({
      handlesPositions: newHandlesPositions,
      handlesPercent: newHandlesPercents,
    });
  }, 50);

  handle0TouchStart = this.createSliderEventHandler(0, 'touchmove', 'touchend');

  handle0MouseDown = this.createSliderEventHandler(0, 'mousemove', 'mouseup');

  handle1TouchStart = this.createSliderEventHandler(1, 'touchmove', 'touchend');

  handle1MouseDown = this.createSliderEventHandler(1, 'mousemove', 'mouseup');

  sliderRef = React.createRef();

  render() {
    const { handlesPositions } = this.state;
    return (
      <SliderWrap>
        <Slider innerRef={this.sliderRef}>
          <Handle
            style={{ left: `${handlesPositions[0]}px` }}
            onMouseDown={this.handle0MouseDown}
            onTouchStart={this.handle0TouchStart}
          />
          <Handle
            style={{ left: `${handlesPositions[1]}px` }}
            onMouseDown={this.handle1MouseDown}
            onTouchStart={this.handle1TouchStart}
          />
        </Slider>
      </SliderWrap>
    );
  }
}

Range.propTypes = {
  onChange: PropTypes.func,
  initialValues: PropTypes.arrayOf(PropTypes.number),
};

Range.defaultProps = {
  onChange: () => {},
  initialValues: [0, 100],
};
export default Range;
