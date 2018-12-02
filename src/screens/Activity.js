import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import dataStates from '../constants/dataStates';
import * as SC from '../styled-components';

class Activity extends Component {
  state = {
    dataState: dataStates.notAsked,
    data: null,
  };

  componentDidMount() {
    this.setState({
      dataState: dataStates.loading,
    });

    /*
    * TODO: add error handling
    * https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    * https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91
    * */
    fetch('https://www.boredapi.com/api/activity/')
      .then((res) => res.json())
      .then((res) =>
        this.setState({ data: res, dataState: dataStates.loaded })
      );
  }

  render() {
    const { dataState, data } = this.state;
    if (dataState === dataStates.loaded) {
      return (
        <SC.PageWrapper>
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
        </SC.PageWrapper>
      );
    }

    return (
      <SC.PageWrapper centered>
        <SC.Spinner size={'large'} />
      </SC.PageWrapper>
    );
  }
}

// Activity.propTypes = {};

export default Activity;
