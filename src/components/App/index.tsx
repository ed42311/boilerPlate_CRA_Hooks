import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import styled from "styled-components";

import Navigation from '../Navigation';
import Other from '../Other';
import Home from '../Home';

import {HOME, OTHER} from '../../Constants/routes';

const App = () => (
  <Router>
    <ContentS>
      <Navigation />
      <Route exact path={HOME} component={Home} />
      <Route path={OTHER} component={Other} />
    </ContentS>
  </Router>
);

const ContentS = styled.div`
  padding: 1.75rem;
  width: 100%;
  height: 100%;
`

export default App;
