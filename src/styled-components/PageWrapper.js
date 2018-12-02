import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageWrapper = styled.div`
  display: flex;
  padding: 1em;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ centered }) => (centered ? 'center' : null)};
  color: ${({ theme }) => theme.primaryColor};
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.secondaryColor};
`;

PageWrapper.propTypes = {
  centered: PropTypes.bool,
};

export { PageWrapper };
