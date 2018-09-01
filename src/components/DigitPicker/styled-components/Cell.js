import styled from 'styled-components';

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 2px;
  margin-right: 2px;
  width: 30px;
  height: 30px;
  background-color: ${({ theme, selected }) => (selected ? theme.primaryColor : theme.secondaryColor)};
  color: ${({ theme, selected }) => (selected ? theme.secondaryColor : theme.primaryColor)};
  border-color: ${({ theme, selected }) => (selected ? 'transparent' : theme.primaryColor)};
  border-width: 1px;
  border-style: solid;
`;

export default Cell;
