import styled from 'styled-components';
import PropTypes from 'prop-types';

const Block = styled.div`
  margin-top: ${({ marginTop }) => marginTop};
`;

Block.propTypes = {
  marginTop: PropTypes.string,
};

Block.defaultProps = {
  marginTop: '15px',
};

export { Block };
