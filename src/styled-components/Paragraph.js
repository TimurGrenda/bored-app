import styled from 'styled-components';
import PropTypes from 'prop-types';

const Paragraph = styled.p`
  margin-top: ${({ noTopMargin }) => (noTopMargin ? '0px' : '10px')};
  margin-bottom: 0;
  text-align: ${({ centered }) => (centered ? 'center' : 'inherit')};
`;

Paragraph.propTypes = {
  centered: PropTypes.bool,
  noTopMargin: PropTypes.bool,
};

Paragraph.defaultProps = {
  centered: false,
  noTopMargin: false,
};

export { Paragraph };
