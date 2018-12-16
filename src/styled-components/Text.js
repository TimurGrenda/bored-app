import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const shineLine = keyframes`
  0% {
      background-position: -100px;
  }
  40%, 100% {
      background-position: 140px;
  }
`;

const skeletonStyles = `
  display: inline-block;
  width: 220px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
  animation: ${shineLine} 1.6s infinite linear;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
`;

const Text = styled.span`
  font-size: ${({ main }) => (main ? '1.3rem' : null)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  ${({ skeleton }) => (skeleton ? skeletonStyles : '')};
`;

Text.propTypes = {
  main: PropTypes.bool,
  bold: PropTypes.bool,
  skeleton: PropTypes.bool,
};

Text.defaultProps = {
  main: false,
  bold: false,
  skeleton: false,
};

export { Text };
