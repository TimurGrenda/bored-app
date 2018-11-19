import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import OptionsListWrap from './styled-components/OptionsListWrap';
import OptionsList from './styled-components/OptionsList';
import Option from './styled-components/Option';
import Header from './styled-components/Header';
import HeaderTitle from './styled-components/HeaderTitle';
import HeaderButton from './styled-components/HeaderButton';

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

  render() {
    const { isOpen, selectedOptionValue } = this.state;
    const { options } = this.props;
    return (
      <OutsideClickHandler
        disabled={!isOpen}
        onOutsideClick={this.handleOutsideClick}
      >
        <Header onClick={this.toggleOptionsList}>
          <HeaderTitle>
            {selectedOptionValue !== null
              ? options.find((option) => option.value === selectedOptionValue)
                  .label
              : 'Choose option'}
          </HeaderTitle>
          <HeaderButton />
        </Header>
        <OptionsListWrap>
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
        </OptionsListWrap>
      </OutsideClickHandler>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
