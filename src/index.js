import React from 'react';
import { render } from 'react-dom';
import styledNormalize from 'styled-normalize';
import { injectGlobal, ThemeProvider } from 'styled-components';
import App from './App';

/* eslint-disable no-unused-expressions */
injectGlobal`
  ${styledNormalize}
  
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`;
/* eslint-enable no-unused-expressions */

const theme = {
  primaryColor: 'mediumslateblue',
  secondaryColor: 'whitesmoke',
};
render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
