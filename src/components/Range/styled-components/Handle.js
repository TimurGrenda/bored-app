import styled from 'styled-components';
import { dimensions } from '../constants';

const Handle = styled.div`
  cursor: pointer;
  position: absolute;
  top: ${dimensions.slider.height / 2 - dimensions.handler.height / 2}px;
  width: ${dimensions.handler.width}px;
  height: ${dimensions.handler.height}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryColor};
`;

export default Handle;
