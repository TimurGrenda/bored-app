import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as SC from '../../styled-components';

const NavigationButton = ({ children, history, to, ...props }) => (
  <SC.Button type={'button'} onClick={() => history.push(to)} {...props}>
    {children}
  </SC.Button>
);

NavigationButton.propTypes = {
  ...SC.Button.propTypes,
  to: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(NavigationButton);
