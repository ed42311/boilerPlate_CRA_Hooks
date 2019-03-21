import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import NewOrEditDream from '../NewOrEditDream';
import ArchivePage from '../DreamArchive';

import * as ROUTES from '../../Constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.NEW_DREAM} component={NewOrEditDream} />
      <Route path={ROUTES.DREAM_ARCHIVE} component={ArchivePage} />
      <Route path={ROUTES.EDIT_DREAM} component={NewOrEditDream} />

    </div>
  </Router>
);

export default withAuthentication(App);
