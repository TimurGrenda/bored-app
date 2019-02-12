import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import dataStates from '../../constants/dataStates';
import * as SC from '../../styled-components';
import { getActivityData } from './api';
import NavigationButton from '../../components/NavigationButton';
import FiltersButton from '../../components/FiltersButton';
import Content from './components/Content';
import ContentFailed from './components/ContentFailed';

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

    return (
      <SC.PageWrapper centered>
        <SC.Paragraph>
          <NavigationButton secondary to={'/'}>
            Back to Main
          </NavigationButton>
        </SC.Paragraph>
        {(dataState === dataStates.loading ||
          dataState === dataStates.loaded) && (
          <Content dataState={dataState} data={data} />
        )}
        {dataState === dataStates.failed && <ContentFailed error={error} />}
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
