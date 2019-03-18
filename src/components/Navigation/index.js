import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../Constants/routes';
import { AuthUserContext } from '../Session';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Theta Flow</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ?
                  <NavigationAuth />
                  : <NavigationNonAuth />
              }
            </AuthUserContext.Consumer>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const NavigationAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <DreamOptionS tag={Link} to={ROUTES.NEW_DREAM}>New Dream</DreamOptionS>
    </NavItem>
    <NavItem>
      <DreamOptionS tag={Link} to={ROUTES.DREAM_ARCHIVE}>Dream Archive</DreamOptionS>
    </NavItem>
    <DropDownS nav inNavbar>
      <DropdownToggle nav caret>
        Options
      </DropdownToggle>
      <DropDownMenuS right>
        <DropdownItemS>
          <DreamOptionS tag={Link} to={ROUTES.ACCOUNT}>Account</DreamOptionS>
        </DropdownItemS>
        <DropdownItemS>
          <DreamOptionS tag={Link} to={ROUTES.HOME}>Home</DreamOptionS>
        </DropdownItemS>
        <DropdownItemS divider />
        <SignOutButton />
      </DropDownMenuS>
    </DropDownS>
  </Nav>
)

const NavigationNonAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <DreamOptionS
        id="test-nav-landing"
        tag={Link} to={ROUTES.LANDING}
      >Landing
      </DreamOptionS>
    </NavItem>
    <NavItem>
      <DreamOptionS
        id="test-nav-signin"
        tag={Link} to={ROUTES.SIGN_IN}
      >Sign in
    </DreamOptionS>
    </NavItem>
  </Nav>
);

const DropdownItemS = styled(DropdownItem)`
  &:hover{
    transition: .5s ease-in-out;
    background-color: transparent;
  }
`

const DropDownMenuS = styled(DropdownMenu)`
  z-index: 50px;
  border: none;
  background-color: transparent;
`

const DropDownS = styled(UncontrolledDropdown)`
  z-index: 50px;
  border: double;
  padding: 20px;
  margin-right: 30px;
  border-radius: 200px 200px 200px 200px;
  border-style: double;
  &:hover{
    transition: .5s ease-in-out;
    background-color: turquoise;
  }
`

const DreamOptionS = styled(NavLink)`
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
