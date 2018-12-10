import styled from 'styled-components';
import React from 'react';

const Button = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 100%;
  outline: none;
  border: none;
  border-left: 1px solid #a8a8ff;
  background-color: white;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`;

const Triangle = styled.div`
  position: absolute;
  right: 7px;
  top: 9px;
  width: 1px;
  height: 1px;
  border: 8px solid transparent;
  border-top-color: blue;
`;

const OpenOptionsButton = () => (
  <Button>
    <Triangle />
  </Button>
);

export default OpenOptionsButton;
