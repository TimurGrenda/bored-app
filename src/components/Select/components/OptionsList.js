import React from 'react';
import PropTypes from 'prop-types';
import * as UI from '../styled-components';

const OptionsList = ({ options, onOptionSelect }) => (
  <UI.OptionsListWrap>
    <UI.OptionsList>
      {options.map((option) => (
        <UI.Option
          key={option.value}
          onClick={() => onOptionSelect(option.value)}
        >
          {option.label}
        </UI.Option>
      ))}
    </UI.OptionsList>
  </UI.OptionsListWrap>
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
