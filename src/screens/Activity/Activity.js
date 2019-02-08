import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import dataStates from '../../constants/dataStates';
import * as SC from '../../styled-components';
import { getActivityData } from './api';
import NavigationButton from '../../components/NavigationButton';
import FiltersButton from '../../components/FiltersButton';

class Activity extends Component {
  state = {
    dataState: dataStates.notAsked,
    data: {},
    error: {},
  };

  componentDidMount() {
    const { match } = this.props;

    if (match.params.id) {
      this.getActivityByKey(match.params.id);
    } else {
      this.getRandomActivity();
    }
  }

  getRandomActivity = () => {
    this.setState({
      dataState: dataStates.loading,
    });

    const { filtersQueryString, history } = this.props;

    getActivityData(
      `https://www.boredapi.com/api/activity${filtersQueryString}`,
      (json) => {
        this.setState({ data: json, dataState: dataStates.loaded });
        history.push(`/activity/${json.key}`);
      },
      (error) => this.setState({ error, dataState: dataStates.failed })
    );
  };

  getActivityByKey = (key) => {
    this.setState({
      dataState: dataStates.loading,
    });

    getActivityData(
      `https://www.boredapi.com/api/activity?key=${key}`,
      (json) => this.setState({ data: json, dataState: dataStates.loaded }),
      (error) => this.setState({ error, dataState: dataStates.failed })
    );
  };

  render() {
    const { dataState, data, error } = this.state;
    const { filtersCount } = this.props;

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
          <NavigationButton secondary to={'/'}>
            Back to Main
          </NavigationButton>
        </SC.Paragraph>
        {content(dataState)}
        <SC.Paragraph>
          <SC.Button onClick={this.getRandomActivity}>
            Get random activity
          </SC.Button>
        </SC.Paragraph>
        <SC.Paragraph>
          <FiltersButton filtersCount={filtersCount} />
        </SC.Paragraph>
      </SC.PageWrapper>
    );
  }
}

Activity.propTypes = {
  filtersQueryString: PropTypes.string,
  filtersCount: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Activity.defaultProps = {
  filtersQueryString: '',
};

export default withRouter(Activity);
