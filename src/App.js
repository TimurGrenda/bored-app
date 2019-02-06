import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { constructQueryStringFromFilters } from './utils/constructQueryStringFromFilters';
import { countFilters } from './utils/countFilters';
import Main from './screens/Main';
import Activity from './screens/Activity';
import Filter from './screens/Filter';

const initialFiltersStates = {
  priceRange: [0, 100],
  accessibilityRange: [0, 100],
  participants: null,
  activityType: null,
};

class App extends Component {
  state = {
    ...initialFiltersStates,
  };

  saveFilters = (newFiltersStates) => this.setState(newFiltersStates);

  render() {
    const {
      priceRange,
      accessibilityRange,
      participants,
      activityType,
    } = this.state;

    const queryString = constructQueryStringFromFilters(
      priceRange,
      accessibilityRange,
      participants,
      activityType
    );

    const filtersCount = countFilters(
      priceRange,
      accessibilityRange,
      participants,
      activityType
    );
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={'/'}
            render={() => <Main filtersCount={filtersCount} />}
          />
          <Route
            exact
            path={'/activity'}
            render={() => (
              <Activity queryString={queryString} filtersCount={filtersCount} />
            )}
          />
          <Route
            exact
            path={'/filter'}
            render={() => (
              <Filter
                priceRange={priceRange}
                accessibilityRange={accessibilityRange}
                participants={participants}
                activityType={activityType}
                saveFilters={this.saveFilters}
                initialFiltersStates={initialFiltersStates}
              />
            )}
          />
          <Route component={() => <h1>404</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
