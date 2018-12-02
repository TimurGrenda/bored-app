import React from 'react';
import PropTypes from 'prop-types';
import * as SC from '../styled-components';

const OptionsList = ({ options, onOptionSelect }) => (
  <SC.OptionsListWrap>
    <SC.OptionsList>
      {options.map((option) => (
        <SC.Option
          key={option.value}
          onClick={() => onOptionSelect(option.value)}
        >
          {option.label}
        </SC.Option>
      ))}
    </SC.OptionsList>
  </SC.OptionsListWrap>
);

OptionsList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
};

export default OptionsList;
