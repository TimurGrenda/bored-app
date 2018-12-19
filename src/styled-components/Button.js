import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';

const getBackgroundColor = ({ theme, secondary, disabled }) => {
  if (secondary) {
    return 'transparent';
  }
  if (disabled) {
    return lighten(0.2, theme.primaryColor);
  }
  return theme.primaryColor;
};

const getTextColor = ({ theme, secondary, disabled }) => {
  if (secondary) {
    if (disabled) {
      return lighten(0.2, theme.primaryColor);
    }
    return theme.primaryColor;
  }
  return theme.secondaryColor;
};

const getBorderColor = ({ theme, disabled }) => {
  if (disabled) {
    return lighten(0.2, theme.primaryColor);
  }
  return theme.primaryColor;
};

const Button = styled.button`
  padding: 5px 10px;
  color: ${getTextColor};
  background-color: ${getBackgroundColor};
  border: 2px solid ${getBorderColor};
  font-size: 1.2em;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-align: center;
  outline: none;
  min-width: 100px;
  max-width: 300px;
  border-radius: 4px;

  &:hover {
    transform: ${({ disabled }) => (disabled ? '' : 'scale(1.1, 1.1)')};
    transition: transform 0.2s;
  }
`;

Button.propTypes = {
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
export { Button };
