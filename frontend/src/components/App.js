import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Register from './authentication/Register';
import Login from "./authentication/Login";
import PrivateRoute from "./common/PrivateRoute"

import { Provider } from 'react-redux';
import store from '../store';

import { loadUser } from "../actions/user";



const alertOptions = {
    timeout: 3000,
    position: 'top right'
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
      return (
          <Provider store={store} >
          <AlertProvider template = {AlertTemplate} {...alertOptions}>
            <Router>
            <Fragment>
                <Header />
                  <div className="container">
                    <Switch>
                      <PrivateRoute exact path="/" component={Dashboard}/>
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                    </Switch>                    
                  </div>            
            </Fragment>
            </Router>
          </AlertProvider>             
          </Provider>       

    );
  }
}

//export default App;

const container = document.getElementById("app");
render(<App />, container);