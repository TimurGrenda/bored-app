import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SC from './styled-components';
import { createArrayFromRange } from './utils';

class DigitPicker extends Component {
  handleCellClick = (i) => {
    const { onChange, selected } = this.props;

    let newSelectedState;
    if (i === selected) {
      newSelectedState = null;
    } else {
      newSelectedState = i;
    }

    onChange(newSelectedState);
  };

  render() {
    const { from, to, selected } = this.props;

    const cells = createArrayFromRange(from, to).map((i) => (
      <SC.Cell
        key={i}
        selected={selected === i}
        onClick={() => this.handleCellClick(i)}
      >
        {i}
      </SC.Cell>
    ));

    return <SC.Wrapper>{cells}</SC.Wrapper>;
  }
}

DigitPicker.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

DigitPicker.defaultProps = {
  selected: null,
};

export default DigitPicker;
