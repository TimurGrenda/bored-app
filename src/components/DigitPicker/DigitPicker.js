import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './styled-components/Cell';
import Wrapper from './styled-components/Wrapper';
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
    const { range } = this.props;
    const { selected } = this.state;

    const cells = createArrayFromRange(...range).map((i) => (
      <Cell
        key={i}
        selected={selected === i}
        onClick={() => this.handleCellClick(i)}
      >
        {i}
      </Cell>
    ));

    return <Wrapper>{cells}</Wrapper>;
  }
}

DigitPicker.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func,
};

DigitPicker.defaultProps = {
  onChange: () => {},
};

export default DigitPicker;
