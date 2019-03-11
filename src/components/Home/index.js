import React from 'react';
import styled from "styled-components";

import { withAuthorization } from '../Session';

const HomePage = () => (
  <PageStyle>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </PageStyle>
);

const PageStyle = styled.div`
  margin-left: 25px;
`

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);