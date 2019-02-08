import React from 'react';
import * as SC from '../styled-components';
import NavigationButton from '../components/NavigationButton';

const Main = () => (
  <SC.PageWrapper centered>
    <SC.Title>Bored?</SC.Title>
    <SC.Paragraph>
      <NavigationButton to={'/activity'}>Get suggestions</NavigationButton>
    </SC.Paragraph>
  </SC.PageWrapper>
);

export default Main;
