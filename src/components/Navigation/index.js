import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {
  Collapse,
  Navbar,
  NavbarToggler,
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
      <NavStyleS>
        <NavbarS light expand="md">
        <div><ThetaFlowS href="/">THETA</ThetaFlowS></div>
        <NavDivUnderTitleS>
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
          </NavDivUnderTitleS>
        </NavbarS>
      </NavStyleS>
    );
  }
}

const NavigationAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <DreamOptionS tag={Link} to={ROUTES.NEW_DREAM}>New <br/> Dream</DreamOptionS>
    </NavItem>
    <NavItem>
      <ArchiveOptionS tag={Link} to={ROUTES.DREAM_ARCHIVE}>Archive</ArchiveOptionS>
    </NavItem>
    <DropDownS nav inNavbar>
      <DropdownToggle nav>
        <ESpanS>...</ESpanS>
      </DropdownToggle>
      <DropDownMenuS>
        <DropdownItemS>
          <DreamOptionS tag={Link} to={ROUTES.ACCOUNT}>Account</DreamOptionS>
        </DropdownItemS>
        <DropdownItemS/>
        <SignOutButton />
      </DropDownMenuS>
    </DropDownS>
  </Nav>
)

const NavigationNonAuth = () => (
  null
);

const NavStyleS = styled.div`
  display: grid;
  justify-content: center;
  font-size: small;
  text-align: center;
  padding-bottom: 4rem;
  padding-top: 2rem;
`
const NavbarS = styled(Navbar)`
      display: grid;
      font-weight: 600;
`

const ThetaFlowS = styled.div`
  font-family: serif;
  font-size: 3rem;
  color: gray;
  letter-spacing: 2rem;
`
const NavDivUnderTitleS = styled.div`
  margin-right: .6rem;
`
const DropdownItemS = styled(DropdownItem)`
  &:hover{
    transition: .5s ease-in-out;
    background-color: transparent;
  }
`

const DropDownMenuS = styled(DropdownMenu)`
  z-index: 50;
  border: none;
  background-color: transparent;
  left: -28px;
  font-size: small;
`
const ESpanS = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: xx-large;
  margin-top: -1.9rem;
`

const DropDownS = styled(UncontrolledDropdown)`
  z-index: 50;
  border: double;
  border-color: darkgoldenrod;
  padding: 20px;
  margin-right: 30px;
  border-radius: 200px;
  border-style: double;
  &:hover{
    transition: .5s ease-in-out;
    background-color: palevioletred;
  }
  width: 4.35rem;
  height: 4.35rem;

`
const DreamOptionS = styled(NavLink)`
  z-index: 50;
  &:hover{
    transition: .5s ease-in-out;
    background-color: goldenrod;
  }
  background-color: white;
  padding: 20px;
  margin-right: 30px;
  border-radius: 40px;
  border-style: double;
  border-color: darkcyan;
  width: 4.35rem;
  height: 4.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
`

const ArchiveOptionS = styled(NavLink)`
    z-index: 50;
  &:hover{
    transition: .5s ease-in-out;
    background-color: turquoise;
  }
  background-color: white;
  padding: 20px;
  margin-right: 30px;
  border-radius: 40px;
  border-style: double;
  border-color: hotpink;
  width: 4.35rem;
  height: 4.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;

`
