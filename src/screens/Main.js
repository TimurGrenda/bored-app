import React from 'react';
import PropTypes from 'prop-types';
import * as SC from '../styled-components';
import NavigationButton from '../components/NavigationButton';
import FiltersButton from '../components/FiltersButton';

const Main = ({ filtersCount }) => (
  <SC.PageWrapper centered>
    <SC.Title>Bored?</SC.Title>
    <SC.Paragraph>
      <NavigationButton to={'/activity'}>Get suggestions</NavigationButton>
    </SC.Paragraph>
    <SC.Paragraph>
      <FiltersButton filtersCount={filtersCount} />
    </SC.Paragraph>
  </SC.PageWrapper>
);

Main.propTypes = {
  filtersCount: PropTypes.number.isRequired,
};

export default Main;
