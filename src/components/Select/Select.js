import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import Header from './components/Header';
import OptionsList from './components/OptionsList';

class Select extends Component {
  state = {
    isOpen: false,
  };

  handleOptionSelection = (value) => {
    const { onChange } = this.props;
    onChange(value);
    this.setState({
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
    const { options, selectedOptionValue } = this.props;

    if (selectedOptionValue !== null) {
      return options.find((option) => option.value === selectedOptionValue)
        .label;
    }
    return 'Choose option';
  };

  handleClearButtonClick = (e) => {
    e.stopPropagation();

    const { onClearSelection } = this.props;

    onClearSelection();
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
        <Header
          onClick={this.toggleOptionsList}
          title={headerTitle}
          onClearButtonClick={this.handleClearButtonClick}
        />
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
  selectedOptionValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClearSelection: PropTypes.func.isRequired,
};

Select.defaultProps = {
  selectedOptionValue: null,
};

export default Select;
