import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>

);

const SignOut = styled.button`
  border: none;
`
export default withFirebase(SignOutButton);
