import React from 'react';
import PropTypes from 'prop-types';
import * as SC from '../styled-components';

const Header = ({ title, onClick }) => (
  <SC.Header onClick={onClick}>
    <SC.HeaderTitle>{title}</SC.HeaderTitle>
    <SC.HeaderButton />
  </SC.Header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Header;
