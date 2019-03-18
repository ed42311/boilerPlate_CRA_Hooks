import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import NewDreamPage from '../NewDream';
import ArchivePage from '../DreamArchive';
import EditDreamPage from '../EditDream';

import * as ROUTES from '../../Constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.NEW_DREAM} component={NewDreamPage} />
      <Route path={ROUTES.DREAM_ARCHIVE} component={ArchivePage} />
      <Route path={ROUTES.EDIT_DREAM} component={EditDreamPage} />

    </div>
  </Router>
);

export default withAuthentication(App);
