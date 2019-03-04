import React, { Component } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import propTypes from 'prop-types';
import * as firebase from 'firebase';

import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Test from './components/Test';
import Authenticated from './components/Authenticated';
import NotAuthenticated from './components/NotAuthenticated';
import { HOME, TEST, AUTHENTICATED, NOT_AUTHENTICATED } from './Constants/Routes';
import Firebase from './components/Firebase/firebase';

class App extends Component {

  componentDidMount(){
    console.log(process.env)
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
         <NavigationBar/>
          <div>
            <Route exact path={HOME} component={Home}></Route>
            <Route path={TEST} component={Test}></Route>
            <Route path={AUTHENTICATED} component={Authenticated}></Route>
            <Route path={NOT_AUTHENTICATED} component={NotAuthenticated}></Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
