import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  padding: 5px 10px;
  color: ${({ theme }) => theme.secondaryColor};
  background-color: ${({ theme }) => theme.primaryColor};
  border: 2px solid ${({ theme }) => theme.primaryColor};
  font-size: 1.2em;
  cursor: pointer;
  text-align: center;
  outline: none;
  min-width: 100px;
  max-width: 300px;
`;

Button.propTypes = {
  primary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
export default Button;
