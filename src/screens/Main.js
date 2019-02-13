import React from 'react';
import * as SC from '../styled-components';
import NavigationButton from '../components/NavigationButton';

const Main = () => (
  <SC.PageWrapper centered>
    <SC.Title>Bored?</SC.Title>
    <SC.Block>
      <NavigationButton to={'/activity'}>Get suggestions</NavigationButton>
    </SC.Block>
  </SC.PageWrapper>
);

export default Main;
