import React, { Component } from 'react';
import qs from 'qs';
import Main from './screens/Main';
import Activity from './screens/Activity';
import Filter from './screens/Filter';

const initialFiltersStates = {
  savedPriceRange: [0, 100],
  savedAccessibilityRange: [0, 100],
  savedParticipants: null,
  savedActivityType: null,
};

class App extends Component {
  state = {
    currentScreen: 'filter',
    ...initialFiltersStates,
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

  saveFilters = ({
    priceRange,
    accessibilityRange,
    participants,
    activityType,
  }) => {
    this.setState({
      savedPriceRange: priceRange,
      savedAccessibilityRange: accessibilityRange,
      savedParticipants: participants,
      savedActivityType: activityType,
    });
  };

  /* Create new array so that check for prop equality fails in filter
  * and it will reinitialize state from props
  * (in case saved values were the initial values) */
  clearFilters = () => {
    this.setState({
      ...initialFiltersStates,
      savedPriceRange: initialFiltersStates.savedPriceRange.slice(),
      savedAccessibilityRange: initialFiltersStates.savedAccessibilityRange.slice(),
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
      savedPriceRange,
      savedAccessibilityRange,
      savedParticipants,
      savedActivityType,
    } = this.state;

    const queryString = qs.stringify(
      {
        minprice: this.getMinValueForQuery(savedPriceRange),
        maxprice: this.getMaxValueForQuery(savedPriceRange),
        minaccessibility: this.getMinValueForQuery(savedAccessibilityRange),
        maxaccessibility: this.getMaxValueForQuery(savedAccessibilityRange),
        participants: savedParticipants,
        type: savedActivityType,
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
            savedPriceRange={savedPriceRange}
            savedAccessibilityRange={savedAccessibilityRange}
            savedParticipants={savedParticipants}
            savedActivityType={savedActivityType}
            saveFilters={this.saveFilters}
            clearFilters={this.clearFilters}
          />
        );
      default:
        throw new Error('Unexpected screen name');
    }
  }
}

export default App;
