import React, { Component } from 'react';
import qs from 'qs';
import Main from './screens/Main';
import Activity from './screens/Activity';
import Filter from './screens/Filter';

class App extends Component {
  state = {
    currentScreen: 'filter',
    priceRange: [0, 100],
    accessibilityRange: [0, 100],
    participants: null,
    activityType: null,
  };

  handleScreenChange = (screen) => {
    this.setState({
      currentScreen: screen,
    });
  };

  goToActivityScreen = () => {
    this.handleScreenChange('activity');
  };

  goToMainScreen = () => {
    this.handleScreenChange('main');
  };

  goToFilterScreen = () => {
    this.handleScreenChange('filter');
  };

  handlePriceRangeChange = (values) => {
    this.setState({
      priceRange: values,
    });
  };

  handleAccessibilityRangeChange = (values) => {
    this.setState({
      accessibilityRange: values,
    });
  };

  handleParticipantsChange = (value) => {
    this.setState({
      participants: value,
    });
  };

  handleActivityTypeChange = (value) => {
    this.setState({
      activityType: value,
    });
  };

  clearActivityType = () => {
    this.setState({
      activityType: null,
    });
  };

  getMinValueForQuery = (array) => {
    const min = Math.min(...array);
    if (min !== 0) {
      return (min / 100).toFixed(2);
    }
    return null;
  };

  getMaxValueForQuery = (array) => {
    const max = Math.max(...array);
    if (max !== 100) {
      return (max / 100).toFixed(2);
    }
    return null;
  };

  render() {
    const {
      currentScreen,
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.state;

    const queryString = qs.stringify(
      {
        minprice: this.getMinValueForQuery(priceRange),
        maxprice: this.getMaxValueForQuery(priceRange),
        minaccessibility: this.getMinValueForQuery(accessibilityRange),
        maxaccessibility: this.getMaxValueForQuery(accessibilityRange),
        participants,
        type: activityType,
      },
      {
        skipNulls: true,
        addQueryPrefix: true,
      }
    );

    switch (currentScreen) {
      case 'main':
        return (
          <Main
            goToActivityScreen={this.goToActivityScreen}
            goToFilterScreen={this.goToFilterScreen}
          />
        );
      case 'activity':
        return (
          <Activity
            goToMainScreen={this.goToMainScreen}
            queryString={queryString}
          />
        );
      case 'filter':
        return (
          <Filter
            goToMainScreen={this.goToMainScreen}
            priceRange={priceRange}
            accessibilityRange={accessibilityRange}
            participants={participants}
            activityType={activityType}
            handlePriceRangeChange={this.handlePriceRangeChange}
            handleAccessibilityRangeChange={this.handleAccessibilityRangeChange}
            handleParticipantsChange={this.handleParticipantsChange}
            handleActivityTypeChange={this.handleActivityTypeChange}
            clearActivityType={this.clearActivityType}
          />
        );
      default:
        throw new Error('Unexpected screen name');
    }
  }
}

export default App;
