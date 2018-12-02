import styled from 'styled-components';
import PropTypes from 'prop-types';

const Text = styled.span`
  font-size: ${({ main }) => (main ? '1.3rem' : null)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

Text.propTypes = {
  main: PropTypes.bool,
  bold: PropTypes.bool,
};

Text.defaultProps = {
  main: false,
  bold: false,
};

export { Text };
