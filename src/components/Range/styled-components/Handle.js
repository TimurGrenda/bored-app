import styled from 'styled-components';

const Handle = styled.div.attrs({
  'data-test-marker': 'handler',
})`
  cursor: pointer;
  position: absolute;
  top: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryColor};
  
  &:hover {
    transform: scale(1.1, 1.1)};
    transition: transform 0.2s;
  }
`;

export { Handle };
