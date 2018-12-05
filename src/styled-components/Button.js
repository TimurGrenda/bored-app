import styled from 'styled-components';
import PropTypes from 'prop-types';

const getBackgroundColor = ({ theme, secondary }) => {
  if (secondary) {
    return theme.secondaryColor;
  }
  return theme.primaryColor;
};

const getTextColor = ({ theme, secondary }) => {
  if (secondary) {
    return theme.primaryColor;
  }
  return theme.secondaryColor;
};

const getBorderColor = ({ theme }) => theme.primaryColor;

const Button = styled.button`
  padding: 5px 10px;
  color: ${getTextColor};
  background-color: ${getBackgroundColor};
  border: 2px solid ${getBorderColor};
  font-size: 1.2em;
  cursor: pointer;
  text-align: center;
  outline: none;
  min-width: 100px;
  max-width: 300px;
  border-radius: 4px;
`;

Button.propTypes = {
  secondary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
export { Button };
