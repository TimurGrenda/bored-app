import React from 'react';
import PropTypes from 'prop-types';
import * as SC from '../../../styled-components';

const ContentFailed = ({ error }) => (
  <SC.Paragraph>
    <SC.Text>Error: {error.message}</SC.Text>
  </SC.Paragraph>
);

ContentFailed.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContentFailed;
