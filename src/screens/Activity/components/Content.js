import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as SC from '../../../styled-components';
import dataStates from '../../../constants/dataStates';

const Content = ({ dataState, data }) => {
  const loading = dataState === dataStates.loading;

  return (
    <Fragment>
      <SC.Paragraph centered>
        <SC.Text main skeleton={loading}>
          activity: {data.activity}
        </SC.Text>
      </SC.Paragraph>
      <SC.Paragraph centered>
        <SC.Text main skeleton={loading}>
          participants: {data.participants}
        </SC.Text>
      </SC.Paragraph>
      <SC.Paragraph centered>
        <SC.Text main skeleton={loading}>
          type: {data.type}
        </SC.Text>
      </SC.Paragraph>
      <SC.Paragraph centered>
        <SC.Text main skeleton={loading}>
          price: {data.price}
        </SC.Text>
      </SC.Paragraph>
      <SC.Paragraph centered>
        <SC.Text main skeleton={loading}>
          accessibility: {data.accessibility}
        </SC.Text>
      </SC.Paragraph>
    </Fragment>
  );
};

Content.propTypes = {
  dataState: PropTypes.string.isRequired,
  data: PropTypes.shape({
    key: PropTypes.string,
    activity: PropTypes.string,
    participants: PropTypes.number,
    type: PropTypes.string,
    price: PropTypes.number,
    accessibility: PropTypes.number,
  }).isRequired,
};

export default Content;
