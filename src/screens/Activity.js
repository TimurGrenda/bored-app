import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import dataStates from '../constants/dataStates';
import PageWrapper from '../styled-components/PageWrapper';
import Paragraph from '../styled-components/Paragraph';
import Text from '../styled-components/Text';
import Spinner from '../styled-components/Spinner';

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
      .then((res) => this.setState({ data: res, dataState: dataStates.loaded }));
  }

  render() {
    const { dataState, data } = this.state;
    if (dataState === dataStates.loaded) {
      return (
        <PageWrapper>
          <Paragraph>
            <Text main>
              activity:
              {data.activity}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text main>
              participants:
              {data.participants}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text main>
              type:
              {data.type}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text main>
              price:
              {data.price}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text main>
              accessibility:
              {data.accessibility}
            </Text>
          </Paragraph>
        </PageWrapper>
      );
    }

    return (
      <PageWrapper centered>
        <Spinner size={'large'} />
      </PageWrapper>
    );
  }
}

// Activity.propTypes = {};

export default Activity;
