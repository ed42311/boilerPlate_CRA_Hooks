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
  border: 1px double black;
  border-radius: 20px;
`
export default withFirebase(SignOutButton);
