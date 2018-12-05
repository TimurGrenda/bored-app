import React from 'react';
import PropTypes from 'prop-types';
import * as SC from '../styled-components';

const Main = ({ goToActivityScreen, goToFilterScreen }) => (
  <SC.PageWrapper centered>
    <SC.Title>Bored?</SC.Title>
    <SC.Paragraph>
      <SC.Button type={'button'} onClick={goToActivityScreen}>
        Get suggestions
      </SC.Button>
    </SC.Paragraph>
    <SC.Paragraph>
      <SC.Button type={'button'} onClick={goToFilterScreen} secondary>
        Open filters
      </SC.Button>
    </SC.Paragraph>
  </SC.PageWrapper>
);

Main.propTypes = {
  goToActivityScreen: PropTypes.func.isRequired,
  goToFilterScreen: PropTypes.func.isRequired,
};

export default Main;
