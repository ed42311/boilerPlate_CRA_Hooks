import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../Constants/routes';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = () => (
  <nav>
  <div className="AuthNavBar">
    <a>
      <Link id="test-nav-home" to={ROUTES.HOME}>Home</Link>
      <Link id="test-nav-account" to={ROUTES.ACCOUNT}>Account</Link>
    </a>
    <a>
      <Link id="test-nav-newdream" to={ROUTES.NEW_DREAM}>New</Link>
    </a>
    <a>
      <Link id="test-nav-dreamarchive" to={ROUTES.DREAM_ARCHIVE}>Archives</Link>
    </a>
    <a>
      <SignOutButton/>
    </a>
  </div>
  </nav>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link id="test-nav-landing" to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link id="test-nav-signin" to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
