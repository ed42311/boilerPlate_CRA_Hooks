import React from 'react';
import styled from "styled-components";

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (

  <AuthUserContext.Consumer>
    {authUser => (
      <PageStyle>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </PageStyle>
    )}
  </AuthUserContext.Consumer>
);

const PageStyle = styled.div`
  margin-left: 25px;
  font-family: serif;
  color: gray;
  font-size: xx-large;
  font-weight: 900;
`

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
