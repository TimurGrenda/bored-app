import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import Header from './components/Header';
import OptionsList from './components/OptionsList';

class Select extends Component {
  state = {
    selectedOptionValue: null,
    isOpen: false,
  };

  handleOptionSelection = (value) => {
    this.setState({
      selectedOptionValue: value,
      isOpen: false,
    });
  };

  handleOutsideClick = () => {
    this.setState({ isOpen: false });
  };

  toggleOptionsList = () => {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  };

  getHeaderTitle = () => {
    const { selectedOptionValue } = this.state;
    const { options } = this.props;

    if (selectedOptionValue !== null) {
      return options.find((option) => option.value === selectedOptionValue)
        .label;
    }
    return 'Choose option';
  };

  render() {
    const { isOpen } = this.state;
    const { options } = this.props;
    const headerTitle = this.getHeaderTitle();

    return (
      <OutsideClickHandler
        disabled={!isOpen}
        onOutsideClick={this.handleOutsideClick}
      >
        <Header onClick={this.toggleOptionsList} title={headerTitle} />
        {isOpen && (
          <OptionsList
            options={options}
            onOptionSelect={this.handleOptionSelection}
          />
        )}
      </OutsideClickHandler>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Select;
