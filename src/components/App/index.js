import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import styled from "styled-components";

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
    <AppS>
      <Navigation />
      <ContentS>
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.NEW_DREAM} component={NewOrEditDream} />
        <Route path={ROUTES.DREAM_ARCHIVE} component={ArchivePage} />
        <Route path={ROUTES.EDIT_DREAM} component={NewOrEditDream} />
      </ContentS>
    </AppS>
  </Router>
);

const AppS = styled.div`
  height: 100%;
  background: rgba(200,200,200,0.3);
  overflow-x: hidden;
`
const ContentS = styled.div`
  padding: 1.75rem;
  width: 100%;
  height: 100%;

`
export default withAuthentication(App);
