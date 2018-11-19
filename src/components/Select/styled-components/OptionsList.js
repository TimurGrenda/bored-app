import styled from 'styled-components';

const OptionsList = styled.ul`
  position: absolute;
  height: 100px;
  width: 100%;
  list-style: none;
  overflow-y: scroll;
  padding-left: 0;
  margin-top: 5px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 1px, rgba(0, 0, 0, 0.1) 0 4px 11px;
  border-radius: 4px;
  user-select: none;
`;

export default OptionsList;
