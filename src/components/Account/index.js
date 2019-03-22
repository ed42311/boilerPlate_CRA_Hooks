import React from 'react';
import styled from "styled-components";

import ColorBlob from '../ColorBlob';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (

  <AuthUserContext.Consumer>
    {authUser => (
      <PageStyle>
        <BlobInputContainerSS>
          <ColorBlob/>
        </BlobInputContainerSS>
        <h1>Account: {authUser.email}</h1>
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
const BlobInputContainerSS = styled.div`
  z-index: -1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  transform: scale(10);
`

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
