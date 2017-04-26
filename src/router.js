import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Checkout from './components/Checkout';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="signupPage" component={Signup} title="Q-Less" />
          <Scene key="loginPage" component={Login} title="Q-Less" initial={true} />
          <Scene renderBackButton={() => (null) } key="landingPage" component={LandingPage} title="Q-Less" />
          <Scene
            backTitle="Connect"
            onBack={() => Actions.landingPage()}
            backButtonImage={null}
            key="dashboard"
            component={Dashboard}
            title="Q-Less"
            rightTitle="Order Cart"
            onRight={() => Actions.checkout()} />
          <Scene key="checkout" component={Checkout} title="Checkout" />
        </Scene>
      </Router>
    )
  }
}
