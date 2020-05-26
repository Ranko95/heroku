import React, { Component, Fragment } from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './pages/Homepage/Homepage';
import MainPage from './pages/MainPage/MainPage';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import Profile from './pages/Profile/Profile';
import Challenge from './pages/Challenge/Challenge';
import requireAuth from './utilities/Authenticate/Authenticate';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={requireAuth(Profile)} />
          <Route exact path="/challenge/:id" component={Challenge} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
