import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components'
import { Navbar, NavDropdown, NavItem } from 'react-bootstrap/';
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
  <AuthNavBar_S className="AuthNavBar">
    <NavBox sticky="top" fluid collapseOnSelect>

    <DreamOption_S>
      <Link id="test-nav-newdream" to={ROUTES.NEW_DREAM}>Dream</Link>
    </DreamOption_S>
    <Navbar.Collapse>
    <ArchivesOption_S>
      <Link id="test-nav-dreamarchive" to={ROUTES.DREAM_ARCHIVE}>Archives</Link>
    </ArchivesOption_S>

    <EllipsisOption_S>
      <NavDropdown expand='lg' title='...'>
      <NavItem>
        <NavLink tag={Link} id="test-nav-home" to={ROUTES.HOME}/>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} id="test-nav-account" to={ROUTES.ACCOUNT}/>
      </NavItem>
      </NavDropdown>
      <SignOutButton/>
    </EllipsisOption_S>

    </Navbar.Collapse>
    </NavBox>
  </AuthNavBar_S>
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

const DreamOption_S = styled.div`
  z-index: 50px;
  border: double;
  padding: 20px;
  margin-right: 30px;
  border-radius: 200px 200px 200px 200px;
  border-style: double;
  &:hover{
    transition: .5s ease-in-out;
    background-color: turquoise;;
  }
`
const ArchivesOption_S = styled.div`
  z-index: 50px;

  border: double;
  padding: 20px;
  margin-right: 30px;
  border-radius: 200px 200px 200px 200px;
  border-style: double;
  &:hover{
    transition: .5s ease-in-out;
    background-color: turquoise;;
  }
`
const EllipsisOption_S = styled.div`
  z-index: 50px;

  border: double;
  padding: 20px;
  border-radius: 200px 200px 200px 200px;
  border-style: double;
    &:hover{
    transition: .5s ease-in-out;
    background-color: turquoise;;
  }
`
const AuthNavBar_S = styled.div`
  display: inline-flex;
  margin: 10% 40% 5% 40%;

`
const NavBox = styled.nav`
  z-index: 50;
`

export default Navigation;
