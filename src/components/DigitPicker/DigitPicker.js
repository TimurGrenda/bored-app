import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SC from './styled-components';
import { createArrayFromRange } from './utils';

class DigitPicker extends Component {
  state = {
    selected: null,
  };

  handleCellClick = (i) => {
    const { selected } = this.state;
    const { onChange } = this.props;

    let newSelectedState;
    if (i === selected) {
      newSelectedState = null;
    } else {
      newSelectedState = i;
    }

    this.setState({ selected: newSelectedState });

    onChange(newSelectedState);
  };

  render() {
    const { from, to } = this.props;
    const { selected } = this.state;

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
  onChange: PropTypes.func,
};

DigitPicker.defaultProps = {
  onChange: () => {},
};

export default DigitPicker;
