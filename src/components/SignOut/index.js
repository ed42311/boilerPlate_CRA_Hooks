import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import { DropdownItem } from 'reactstrap';

const SignOutButton = ({ firebase }) => (
  <SignOut type="button" onClick={firebase.doSignOut}>
    Sign Out
  </SignOut>

);

const SignOut = styled(DropdownItem)`
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
  font-size: small;
  position: inherit;
  margin-left: 1.5rem;
`
export default withFirebase(SignOutButton);
