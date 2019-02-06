import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as SC from '../../styled-components';

const NavigationButtonBack = ({ children, history, ...props }) => (
  <SC.Button type={'button'} onClick={history.goBack} {...props}>
    {children}
  </SC.Button>
);

NavigationButtonBack.propTypes = {
  ...SC.Button.propTypes,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(NavigationButtonBack);
