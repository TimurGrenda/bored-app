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
    return 'Any';
  };

  handleClearButtonClick = (e) => {
    e.stopPropagation();

    const { onClearSelection } = this.props;

    onClearSelection();
  };

  render() {
    const { isOpen } = this.state;
    const { options, selectedOptionValue, style } = this.props;
    const headerTitle = this.getHeaderTitle();

    return (
      <div style={{ display: 'inline-block', ...style }}>
        <OutsideClickHandler
          disabled={!isOpen}
          onOutsideClick={this.handleOutsideClick}
        >
          <Header
            onClick={this.toggleOptionsList}
            title={headerTitle}
            onClearButtonClick={this.handleClearButtonClick}
            showClearButton={selectedOptionValue !== null}
          />
          {isOpen && (
            <OptionsList
              options={options}
              onOptionSelect={this.handleOptionSelection}
            />
          )}
        </OutsideClickHandler>
      </div>
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
  style: PropTypes.shape(),
};

Select.defaultProps = {
  selectedOptionValue: null,
  style: {},
};

export default Select;
