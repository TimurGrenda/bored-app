import React from 'react';
import PropTypes from 'prop-types';
import * as SC from '../styled-components';
import OpenOptionsButton from './OpenOptionsButton';

const Header = ({ title, onClick, onClearButtonClick }) => (
  <SC.Header onClick={onClick}>
    <SC.HeaderTitle>{title}</SC.HeaderTitle>
    <OpenOptionsButton />
    <SC.ClearButton onClick={onClearButtonClick}>x</SC.ClearButton>
  </SC.Header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClearButtonClick: PropTypes.func.isRequired,
};

export default Header;
