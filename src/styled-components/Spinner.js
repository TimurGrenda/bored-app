import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const getSize = (size) => {
  switch (size) {
    case 'small':
      return '15px';
    case 'medium':
      return '40px';
    case 'large':
      return '60px';
    default:
      return '40px';
  }
};

/* css from https://github.com/ConnorAtherton/loaders.css/blob/master/loaders.css */
const ballScale = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;
const Spinner = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  border-radius: 100%;
  margin: 2px;
  animation-fill-mode: both;
  display: inline-block;
  animation: ${ballScale} 1s 0s ease-in-out infinite;
`;

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Spinner.defaultProps = {
  size: 'medium',
};

export { Spinner };
