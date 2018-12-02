import styled from 'styled-components';

const Title = styled.h1`
  margin-top: 0;
  font-size: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.primaryColor};
`;

export { Title };
