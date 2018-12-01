import React from 'react';
import PropTypes from 'prop-types';
import * as UI from '../styled-components';

const Header = ({ title, onClick }) => (
  <UI.Header onClick={onClick}>
    <UI.HeaderTitle>{title}</UI.HeaderTitle>
    <UI.HeaderButton />
  </UI.Header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Header;
