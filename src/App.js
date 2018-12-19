import React, { Component } from 'react';
import qs from 'qs';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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

    return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={Main} />
          <Route
            exact
            path={'/activity'}
            render={() => <Activity queryString={queryString} />}
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
