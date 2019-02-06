import React from 'react';
import PropTypes from 'prop-types';
import NavigationButton from '../NavigationButton';

const FiltersButton = ({ filtersCount }) => (
  <NavigationButton secondary to={'/filter'}>
    Filters {filtersCount === 0 ? null : `(${filtersCount})`}
  </NavigationButton>
);

FiltersButton.propTypes = {
  filtersCount: PropTypes.number.isRequired,
};

export default FiltersButton;
