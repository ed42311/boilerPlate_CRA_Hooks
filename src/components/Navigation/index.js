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
      <NavStyle>
        <Navbar color="light" light expand="md">
        <div><ThetaFlow href="/">Theta Flow</ThetaFlow></div>
        <div>
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
          </div>
        </Navbar>
      </NavStyle>
    );
  }
}

const NavigationAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <DreamOptionS tag={Link} to={ROUTES.NEW_DREAM}>New <br/> Dream</DreamOptionS>
    </NavItem>
    <NavItem>
      <DreamOptionS tag={Link} to={ROUTES.DREAM_ARCHIVE}>Archive</DreamOptionS>
    </NavItem>
    <DropDownS nav inNavbar>
      <DropToggleS nav>
        ...
      </DropToggleS>
      <DropDownMenuS>
        <DropdownItemS>
          <DreamOptionS tag={Link} to={ROUTES.ACCOUNT}>Account</DreamOptionS>
        </DropdownItemS>
        <DropdownItemS>
          <DreamOptionS tag={Link} to={ROUTES.HOME}>Home</DreamOptionS>
        </DropdownItemS>
        <DropdownItemS/>
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

const NavStyle = styled.div`
  display: inline-block;
  font-size: small;
`

const ThetaFlow = styled(NavbarBrand)`
  font-family: serif;
  font-size: large;
`

const DropdownItemS = styled(DropdownItem)`
  &:hover{
    transition: .5s ease-in-out;
    background-color: transparent;
    width: 4.35rem;
    height: 4.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`

const DropDownMenuS = styled(DropdownMenu)`
  z-index: 50;
  border: none;
  background-color: transparent;
  left: -28px;
  font-size: small;
`
const DropToggleS = styled(DropdownToggle)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 1.38rem;
  height: 3.4rem;
  font-size: xx-large;
  padding-top: 2.2rem;
  margin-top: -2.5rem;
`
const DropDownS = styled(UncontrolledDropdown)`
  z-index: 50;
  border: double;
  padding: 20px;
  margin-right: 30px;
  border-radius: 200px;
  border-style: double;
  &:hover{
    transition: .5s ease-in-out;
    background-color: turquoise;
  }
`

const DreamOptionS = styled(NavLink)`
  z-index: 50;
  &:hover{
    transition: .5s ease-in-out;
    background-color: turquoise;;
  }
  border: double;
  background-color: white;
  padding: 20px;
  margin-right: 30px;
  border-radius: 40px;
  border-style: double;
  width: 4.35rem;
  height: 4.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
`
