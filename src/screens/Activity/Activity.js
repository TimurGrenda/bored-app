import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dataStates from '../../constants/dataStates';
import * as SC from '../../styled-components';
import { getActivityData } from './api';

class Activity extends Component {
  state = {
    dataState: dataStates.notAsked,
    data: {},
    error: {},
  };

  componentDidMount() {
    this.getActivity();
  }

  getActivity = () => {
    this.setState({
      dataState: dataStates.loading,
    });

    const { queryString } = this.props;

    getActivityData(
      `https://www.boredapi.com/api/activity${queryString}`,
      (json) => this.setState({ data: json, dataState: dataStates.loaded }),
      (error) => this.setState({ error, dataState: dataStates.failed })
    );
  };

  render() {
    const { dataState, data, error } = this.state;
    const { goToMainScreen } = this.props;

    const loading = dataState === dataStates.loading;

    const content = (_dataState) => {
      switch (_dataState) {
        case dataStates.loading:
        case dataStates.loaded:
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
        case dataStates.failed:
          return (
            <SC.Paragraph>
              <SC.Text>Error: {error.message}</SC.Text>
            </SC.Paragraph>
          );
        default:
          return null;
      }
    };
    return (
      <SC.PageWrapper centered>
        <SC.Paragraph>
          <SC.Button secondary onClick={goToMainScreen}>
            Back to Main
          </SC.Button>
        </SC.Paragraph>
        {content(dataState)}
        <SC.Paragraph>
          <SC.Button onClick={this.getActivity}>Repeat request</SC.Button>
        </SC.Paragraph>
      </SC.PageWrapper>
    );
  }
}

Activity.propTypes = {
  goToMainScreen: PropTypes.func.isRequired,
  queryString: PropTypes.string,
};

Activity.defaultProps = {
  queryString: '',
};

export default Activity;
