import styled from 'styled-components';

const Slider = styled.div.attrs({
  'data-test-marker': 'slider',
})`
  position: relative;
  width: 280px;
  height: 10px;
  background-color: indigo;
`;
export { Slider };
