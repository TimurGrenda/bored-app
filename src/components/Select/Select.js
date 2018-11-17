import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './styled-components/Option';
import OptionsList from './styled-components/OptionsList';
import Header from './styled-components/Header';
import HeaderTitle from './styled-components/HeaderTitle';

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

  render() {
    const { isOpen, selectedOptionValue } = this.state;
    const { options } = this.props;
    return (
      <div>
        <Header
          onClick={() => this.setState((prev) => ({ isOpen: !prev.isOpen }))}
        >
          <HeaderTitle>
            {selectedOptionValue !== null
              ? options.find((option) => option.value === selectedOptionValue)
                  .label
              : 'Choose option'}
          </HeaderTitle>
        </Header>
        <div>
          {isOpen && (
            <OptionsList>
              {options.map((option) => (
                <Option
                  key={option.value}
                  onClick={() => this.handleOptionSelection(option.value)}
                >
                  {option.label}
                </Option>
              ))}
            </OptionsList>
          )}
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
