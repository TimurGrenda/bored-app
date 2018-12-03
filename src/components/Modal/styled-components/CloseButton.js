import styled from 'styled-components';

export const CloseButton = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 0;
  right: 0;

  display: block;
  font-size: 25px;
  width: 25px;
  height: 25px;
  border: none;
  background-color: transparent;
`;
