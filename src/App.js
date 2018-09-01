import React, { Component } from 'react';
import Activity from './screens/Activity';
import Main from './screens/Main';

class App extends Component {
  state = {
    currentScreen: 'main',
  };

  handleScreenChange = (screen) => {
    this.setState({
      currentScreen: screen,
    });
  };

  goToActivityPage = () => {
    this.handleScreenChange('activity');
  };

  render() {
    const { currentScreen } = this.state;
    switch (currentScreen) {
      case 'main':
        return <Main goToActivityPage={this.goToActivityPage} />;
      case 'activity':
        return <Activity />;
      default:
        return <Main goToActivityPage={this.goToActivityPage} />;
    }
  }
}

export default App;
