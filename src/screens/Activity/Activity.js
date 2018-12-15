import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dataStates from '../../constants/dataStates';
import * as SC from '../../styled-components';
import { getActivityData } from './api';

class Activity extends Component {
  state = {
    dataState: dataStates.notAsked,
    data: null,
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

    if (dataState === dataStates.loaded) {
      return (
        <SC.PageWrapper centered>
          <SC.Paragraph>
            <SC.Button secondary onClick={goToMainScreen}>
              Back to Main
            </SC.Button>
          </SC.Paragraph>
          <SC.Paragraph>
            <SC.Text main>
              activity:
              {data.activity}
            </SC.Text>
          </SC.Paragraph>
          <SC.Paragraph>
            <SC.Text main>
              participants:
              {data.participants}
            </SC.Text>
          </SC.Paragraph>
          <SC.Paragraph>
            <SC.Text main>
              type:
              {data.type}
            </SC.Text>
          </SC.Paragraph>
          <SC.Paragraph>
            <SC.Text main>
              price:
              {data.price}
            </SC.Text>
          </SC.Paragraph>
          <SC.Paragraph>
            <SC.Text main>
              accessibility:
              {data.accessibility}
            </SC.Text>
          </SC.Paragraph>

          <SC.Paragraph>
            <SC.Button onClick={this.getActivity}>repeat request</SC.Button>
          </SC.Paragraph>
        </SC.PageWrapper>
      );
    } else if (dataState === dataStates.loading) {
      return (
        <SC.PageWrapper centered>
          <SC.Spinner size={'large'} />
        </SC.PageWrapper>
      );
    } else if (dataState === dataStates.failed) {
      return (
        <SC.PageWrapper centered>
          <SC.Paragraph>
            <SC.Button secondary onClick={goToMainScreen}>
              Back to Main
            </SC.Button>
          </SC.Paragraph>

          <SC.Paragraph>
            <SC.Text>Error: {error.message}</SC.Text>
          </SC.Paragraph>

          <SC.Paragraph>
            <SC.Button onClick={this.getActivity}>repeat request</SC.Button>
          </SC.Paragraph>
        </SC.PageWrapper>
      );
    }
    return null;
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
