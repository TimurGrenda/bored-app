import styled from 'styled-components';
import PropTypes from 'prop-types';

const Text = styled.span`
  font-size: ${({ main }) => (main ? '1.3rem' : null)};
`;

Text.propTypes = {
  main: PropTypes.bool,
};

export default Text;
